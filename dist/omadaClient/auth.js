import { logger } from '../utils/logger.js';
const TOKEN_EXPIRY_BUFFER_SECONDS = 30;
/**
 * Authentication state management for the Omada client.
 * Supports both OpenAPI OAuth2 (client credentials) and Web Session (Fusion Gateway / local login).
 */
export class AuthManager {
    http;
    authMode;
    clientId;
    clientSecret;
    username;
    password;
    omadacId;
    // OpenAPI Token state
    accessToken;
    refreshToken;
    tokenExpiresAt;
    // Web Session state
    csrfToken;
    cookies = new Map();
    authPromise;
    constructor(http, configOrClientId, clientSecret, omadacId) {
        this.http = http;
        if (typeof configOrClientId === 'string') {
            // Legacy signature: (http, clientId, clientSecret, omadacId)
            this.authMode = 'openapi';
            this.clientId = configOrClientId;
            this.clientSecret = clientSecret;
            this.omadacId = omadacId;
        }
        else if (configOrClientId) {
            const config = configOrClientId;
            this.clientId = config.clientId;
            this.clientSecret = config.clientSecret;
            this.username = config.username;
            this.password = config.password;
            this.omadacId = config.omadacId;
            if (config.authMode === 'web') {
                this.authMode = 'web';
            }
            else if (config.authMode === 'openapi') {
                this.authMode = 'openapi';
            }
            else {
                // 'auto'
                if (this.username && this.password) {
                    this.authMode = 'web';
                }
                else {
                    this.authMode = 'openapi';
                }
            }
        }
        else {
            this.authMode = 'openapi';
        }
    }
    /**
     * Return current authentication mode ('openapi' | 'web').
     */
    getAuthMode() {
        return this.authMode;
    }
    /**
     * Synchronously return the controller ID if known.
     */
    getOmadacIdSync() {
        return this.omadacId ?? '';
    }
    /**
     * Get the controller ID, auto-detecting it if not already known.
     */
    async getOmadacId() {
        if (this.omadacId) {
            return this.omadacId;
        }
        await this.ensureSession();
        return this.omadacId ?? '';
    }
    /**
     * Get the current access token (or CSRF token in web mode), refreshing if necessary.
     */
    async getAccessToken() {
        await this.ensureSession();
        if (this.authMode === 'web') {
            return this.csrfToken ?? '';
        }
        return this.accessToken ?? '';
    }
    /**
     * Get authentication headers needed for API requests.
     */
    async getAuthHeaders() {
        if (this.authMode === 'web') {
            await this.ensureSession();
            const headers = {
                'Csrf-Token': this.csrfToken ?? '',
                'Omada-Request-Source': 'web-local',
            };
            const cookieHeader = this.getCookieHeader();
            if (cookieHeader) {
                headers.Cookie = cookieHeader;
            }
            return headers;
        }
        const token = await this.getAccessToken();
        return {
            Authorization: `AccessToken=${token}`,
        };
    }
    /**
     * Clear the current authentication token and session state.
     */
    clearToken() {
        this.accessToken = undefined;
        this.refreshToken = undefined;
        this.tokenExpiresAt = undefined;
        this.csrfToken = undefined;
        this.cookies.clear();
        this.authPromise = undefined;
    }
    /**
     * Ensure a valid session or access token is available.
     */
    async ensureSession() {
        if (this.authPromise) {
            return await this.authPromise;
        }
        if (this.authMode === 'web') {
            if (this.csrfToken && this.omadacId) {
                return;
            }
        }
        else {
            if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
                return;
            }
        }
        this.authPromise = this.performAuthentication().finally(() => {
            this.authPromise = undefined;
        });
        await this.authPromise;
    }
    /**
     * Perform authentication according to active auth mode.
     */
    async performAuthentication() {
        if (this.authMode === 'web') {
            await this.authenticateWebSession();
        }
        else {
            await this.authenticateOpenApi();
        }
    }
    /**
     * Authenticate via OpenAPI client credentials or refresh token grant.
     */
    async authenticateOpenApi() {
        if (this.refreshToken) {
            try {
                await this.fetchOpenApiToken('refresh_token');
                return;
            }
            catch {
                this.clearToken();
            }
        }
        await this.fetchOpenApiToken('client_credentials');
    }
    /**
     * Fetch OAuth2 token from OpenAPI endpoint.
     */
    async fetchOpenApiToken(grantType) {
        if (!this.clientId || !this.clientSecret) {
            throw new Error('OMADA_CLIENT_ID and OMADA_CLIENT_SECRET are required for OpenAPI authentication');
        }
        const params = { grant_type: grantType };
        const body = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
        };
        if (grantType === 'client_credentials') {
            if (!this.omadacId) {
                throw new Error('OMADA_OMADAC_ID is required for OpenAPI authentication');
            }
            body.omadacId = this.omadacId;
        }
        else {
            if (!this.refreshToken) {
                throw new Error('No refresh token available to refresh the access token');
            }
            params.refresh_token = this.refreshToken;
        }
        try {
            const { data } = await this.http.post('/openapi/authorize/token', body, { params });
            if (data.errorCode !== 0) {
                logger.error('Omada authentication error', {
                    errorCode: data.errorCode,
                    message: data.msg,
                });
                throw new Error(data.msg ?? 'Omada authentication failed');
            }
            const token = data.result ?? {};
            this.setToken(token);
        }
        catch (error) {
            logger.error('Omada authentication failed', {
                grantType,
                baseUrl: this.http.defaults.baseURL,
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
    /**
     * Authenticate via Web Session login (Fusion Gateway / local login).
     */
    async authenticateWebSession() {
        if (!this.username || !this.password) {
            throw new Error('OMADA_USERNAME and OMADA_PASSWORD are required for web session authentication');
        }
        // If omadacId is not yet known, discover it via /api/info
        if (!this.omadacId) {
            this.omadacId = await this.discoverOmadacId();
        }
        const loginUrl = `/${encodeURIComponent(this.omadacId)}/api/v2/login`;
        const body = {
            username: this.username,
            password: this.password,
        };
        try {
            const response = await this.http.post(loginUrl, body);
            // Update cookies from response headers
            if (response.headers) {
                this.updateCookies(response.headers['set-cookie']);
            }
            const data = response.data;
            if (!data || data.errorCode !== 0) {
                const errorMsg = data?.msg ?? 'Omada web login failed';
                logger.error('Omada web login error', {
                    errorCode: data?.errorCode,
                    message: errorMsg,
                });
                throw new Error(`Omada web login failed: ${errorMsg}`);
            }
            const result = data.result;
            if (!result?.token) {
                throw new Error('Omada web login succeeded but no CSRF token was returned');
            }
            this.csrfToken = result.token;
            logger.info('Successfully authenticated Omada web session', {
                omadacId: this.omadacId,
            });
        }
        catch (error) {
            logger.error('Omada web login failed', {
                baseUrl: this.http.defaults.baseURL,
                omadacId: this.omadacId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
    /**
     * Auto-detect Omada Controller ID from /api/info endpoint.
     */
    async discoverOmadacId() {
        try {
            logger.info('Auto-detecting Omada Controller ID from /api/info...');
            const response = await this.http.get('/api/info');
            if (response.headers) {
                this.updateCookies(response.headers['set-cookie']);
            }
            const data = response.data;
            if (!data || data.errorCode !== 0 || !data.result?.omadacId) {
                throw new Error(data?.msg ?? 'Invalid response from /api/info');
            }
            const discoveredCid = data.result.omadacId;
            logger.info('Auto-detected Omada Controller ID', { omadacId: discoveredCid });
            return discoveredCid;
        }
        catch (error) {
            logger.error('Failed to auto-detect Omada Controller ID from /api/info', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw new Error(`Failed to auto-detect Omada Controller ID from /api/info: ${error instanceof Error ? error.message : String(error)}. You can explicitly configure OMADA_OMADAC_ID.`);
        }
    }
    /**
     * Update session cookie storage from Set-Cookie headers.
     */
    updateCookies(setCookieHeader) {
        if (!setCookieHeader)
            return;
        const cookieStrings = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        for (const cookieStr of cookieStrings) {
            const parts = cookieStr.split(';');
            const firstPart = parts[0]?.trim();
            if (firstPart) {
                const equalsIdx = firstPart.indexOf('=');
                if (equalsIdx !== -1) {
                    const name = firstPart.slice(0, equalsIdx).trim();
                    const value = firstPart.slice(equalsIdx + 1).trim();
                    if (name) {
                        this.cookies.set(name, value);
                    }
                }
            }
        }
    }
    /**
     * Format cookie map as a standard HTTP Cookie header value.
     */
    getCookieHeader() {
        if (this.cookies.size === 0) {
            return undefined;
        }
        return Array.from(this.cookies.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    }
    /**
     * Store the authentication token and calculate expiration time.
     */
    setToken(token) {
        this.accessToken = token.accessToken;
        this.refreshToken = token.refreshToken;
        const expiresInSeconds = Number.isFinite(token.expiresIn) ? token.expiresIn : 0;
        const expiresInMs = Math.max(expiresInSeconds - TOKEN_EXPIRY_BUFFER_SECONDS, 0) * 1000;
        this.tokenExpiresAt = Date.now() + expiresInMs;
    }
}
//# sourceMappingURL=auth.js.map