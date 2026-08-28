import type { AxiosInstance } from 'axios';
import type { OmadaAuthMode } from '../types/index.js';
export interface AuthManagerConfig {
    authMode?: OmadaAuthMode;
    clientId?: string;
    clientSecret?: string;
    username?: string;
    password?: string;
    omadacId?: string;
}
/**
 * Authentication state management for the Omada client.
 * Supports both OpenAPI OAuth2 (client credentials) and Web Session (Fusion Gateway / local login).
 */
export declare class AuthManager {
    private readonly http;
    private authMode;
    private clientId?;
    private clientSecret?;
    private username?;
    private password?;
    private omadacId?;
    private accessToken?;
    private refreshToken?;
    private tokenExpiresAt?;
    private csrfToken?;
    private readonly cookies;
    private authPromise?;
    constructor(http: AxiosInstance, configOrClientId?: string | AuthManagerConfig, clientSecret?: string, omadacId?: string);
    /**
     * Return current authentication mode ('openapi' | 'web').
     */
    getAuthMode(): 'openapi' | 'web';
    /**
     * Synchronously return the controller ID if known.
     */
    getOmadacIdSync(): string;
    /**
     * Get the controller ID, auto-detecting it if not already known.
     */
    getOmadacId(): Promise<string>;
    /**
     * Get the current access token (or CSRF token in web mode), refreshing if necessary.
     */
    getAccessToken(): Promise<string>;
    /**
     * Get authentication headers needed for API requests.
     */
    getAuthHeaders(): Promise<Record<string, string>>;
    /**
     * Clear the current authentication token and session state.
     */
    clearToken(): void;
    /**
     * Ensure a valid session or access token is available.
     */
    ensureSession(): Promise<void>;
    /**
     * Perform authentication according to active auth mode.
     */
    private performAuthentication;
    /**
     * Authenticate via OpenAPI client credentials or refresh token grant.
     */
    private authenticateOpenApi;
    /**
     * Fetch OAuth2 token from OpenAPI endpoint.
     */
    private fetchOpenApiToken;
    /**
     * Authenticate via Web Session login (Fusion Gateway / local login).
     */
    private authenticateWebSession;
    /**
     * Auto-detect Omada Controller ID from /api/info endpoint.
     */
    private discoverOmadacId;
    /**
     * Update session cookie storage from Set-Cookie headers.
     */
    updateCookies(setCookieHeader?: string | string[]): void;
    /**
     * Format cookie map as a standard HTTP Cookie header value.
     */
    getCookieHeader(): string | undefined;
    /**
     * Store the authentication token and calculate expiration time.
     */
    private setToken;
}
