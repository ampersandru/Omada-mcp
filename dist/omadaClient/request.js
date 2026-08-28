import axios from 'axios';
import { logger } from '../utils/logger.js';
const DEFAULT_PAGE_SIZE = 200;
const MIN_REQUEST_INTERVAL_MS = 125;
const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);
const RETRYABLE_ERROR_CODES = new Set([-1005]);
/**
 * HTTP request handler for Omada API calls with authentication and retry logic.
 */
export class RequestHandler {
    http;
    auth;
    nextAllowedRequestAt = 0;
    constructor(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    /**
     * Make a GET request to the Omada API.
     */
    async get(path, params, customHeaders) {
        return await this.request({ method: 'GET', url: path, params }, true, customHeaders);
    }
    /**
     * Make a PATCH request to the Omada API.
     */
    async patch(path, data, customHeaders) {
        return await this.request({ method: 'PATCH', url: path, data }, true, customHeaders);
    }
    /**
     * Make a PUT request to the Omada API.
     */
    async put(path, data, customHeaders) {
        return await this.request({ method: 'PUT', url: path, data }, true, customHeaders);
    }
    /**
     * Make a POST request to the Omada API.
     */
    async post(path, data, customHeaders) {
        return await this.request({ method: 'POST', url: path, data }, true, customHeaders);
    }
    /**
     * Make a DELETE request to the Omada API.
     */
    async delete(path, customHeaders) {
        return await this.request({ method: 'DELETE', url: path }, true, customHeaders);
    }
    /**
     * Make an arbitrary HTTP request to the Omada API.
     */
    async request(config, retry = true, customHeaders) {
        await this.waitForRateWindow();
        const authHeaders = typeof this.auth.getAuthHeaders === 'function'
            ? await this.auth.getAuthHeaders()
            : { Authorization: `AccessToken=${await this.auth.getAccessToken()}` };
        const requestConfig = {
            ...config,
            headers: {
                ...(config.headers ?? {}),
                ...(customHeaders ?? {}),
                ...authHeaders,
            },
        };
        const method = (requestConfig.method ?? 'GET').toUpperCase();
        const url = requestConfig.url ?? 'unknown-url';
        logger.info('Omada request', {
            method,
            url,
            params: requestConfig.params,
            siteId: requestConfig.params?.siteId ?? undefined,
        });
        logger.debug('Omada request details', {
            method,
            url,
            headers: this.sanitizeHeaders(requestConfig.headers),
            params: requestConfig.params ?? null,
            data: this.sanitizePayload(requestConfig.data),
        });
        try {
            const response = await this.http.request(requestConfig);
            if (response.headers && typeof this.auth.updateCookies === 'function') {
                this.auth.updateCookies(response.headers['set-cookie']);
            }
            logger.info('Omada response', {
                method,
                url,
                status: response.status,
            });
            logger.debug('Omada response payload', {
                method,
                url,
                status: response.status,
                headers: this.sanitizeHeaders(response.headers),
                data: this.sanitizePayload(response.data),
            });
            // Check if the response data indicates an authentication error
            const errorCode = response.data?.errorCode;
            const errorMsg = response.data?.msg;
            if (retry && (this.isAuthErrorCode(errorCode) || this.isTokenExpiredMessage(errorMsg))) {
                logger.warn('Omada authentication error in response, retrying with fresh token', {
                    method,
                    url,
                    errorCode,
                    message: errorMsg,
                });
                this.auth.clearToken();
                return this.request(config, false, customHeaders);
            }
            return response.data;
        }
        catch (error) {
            logger.error('Omada request failed', {
                method,
                url,
                message: error instanceof Error ? error.message : String(error),
            });
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.headers && typeof this.auth.updateCookies === 'function') {
                    this.auth.updateCookies(error.response.headers['set-cookie']);
                }
                logger.debug('Omada error response payload', {
                    method,
                    url,
                    status: error.response.status,
                    headers: this.sanitizeHeaders(error.response.headers),
                    data: this.sanitizePayload(error.response.data),
                });
            }
            if (!retry || !axios.isAxiosError(error)) {
                throw error;
            }
            const status = error.response?.status;
            const errorCode = error.response?.data?.errorCode;
            if (status === 401 || status === 403 || this.isAuthErrorCode(errorCode)) {
                this.auth.clearToken();
                return this.request(config, false, customHeaders);
            }
            if (retry &&
                ((status !== undefined && RETRYABLE_STATUS_CODES.has(status)) || (errorCode !== undefined && RETRYABLE_ERROR_CODES.has(errorCode)))) {
                await this.sleep(this.getRetryDelayMs(status));
                return this.request(config, false, customHeaders);
            }
            throw error;
        }
    }
    /**
     * Fetch all pages of a paginated API endpoint.
     */
    async fetchPaginated(path, params = {}, customHeaders) {
        const records = [];
        let page = 1;
        let totalRows;
        // Fetch sequential pages because OpenAPI requires explicit pagination parameters.
        do {
            const response = await this.get(path, {
                ...params,
                page,
                pageSize: DEFAULT_PAGE_SIZE,
            }, customHeaders);
            const result = this.ensureSuccess(response);
            const pageData = result.data ?? [];
            totalRows = result.totalRows ?? totalRows;
            records.push(...pageData);
            page += 1;
            if (pageData.length === 0) {
                break;
            }
        } while (!totalRows || records.length < totalRows);
        return records;
    }
    /**
     * Ensure an Omada API response indicates success.
     * @throws {Error} If the response contains an error code
     */
    ensureSuccess(response) {
        if (response.errorCode !== 0) {
            logger.error('Omada API error', {
                errorCode: response.errorCode,
                message: response.msg,
            });
            throw new Error(response.msg ?? 'Omada API request failed');
        }
        return (response.result ?? {});
    }
    /**
     * Check if an error code indicates an authentication error.
     */
    isAuthErrorCode(errorCode) {
        if (errorCode === undefined) {
            return false;
        }
        return [-44106, -44111, -44112, -44113, -44114, -44116, -30109, -39001, -39002].includes(errorCode);
    }
    /**
     * Check if an error message indicates token expiration.
     */
    isTokenExpiredMessage(message) {
        if (!message) {
            return false;
        }
        const lowerMsg = message.toLowerCase();
        return (lowerMsg.includes('access token has expired') ||
            lowerMsg.includes('token has expired') ||
            lowerMsg.includes('token expired') ||
            lowerMsg.includes('re-initiate the refreshtoken') ||
            lowerMsg.includes('invalid token') ||
            lowerMsg.includes('token is invalid') ||
            lowerMsg.includes('session timeout') ||
            lowerMsg.includes('session has expired'));
    }
    async waitForRateWindow() {
        const now = Date.now();
        if (now < this.nextAllowedRequestAt) {
            await this.sleep(this.nextAllowedRequestAt - now);
        }
        this.nextAllowedRequestAt = Date.now() + MIN_REQUEST_INTERVAL_MS;
    }
    getRetryDelayMs(status) {
        if (status === 429) {
            return 1000;
        }
        return 500;
    }
    async sleep(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * Sanitize HTTP headers for logging, masking sensitive values.
     */
    sanitizeHeaders(headers) {
        if (!headers) {
            return undefined;
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(headers)) {
            sanitized[key] = this.isSensitiveKey(key) ? this.maskValue(value) : value;
        }
        return sanitized;
    }
    /**
     * Sanitize a payload for logging, masking sensitive values.
     */
    sanitizePayload(payload) {
        if (!payload || typeof payload !== 'object') {
            return payload;
        }
        if (Array.isArray(payload)) {
            return payload.map((item) => this.sanitizePayload(item));
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(payload)) {
            sanitized[key] = this.isSensitiveKey(key) ? this.maskValue(value) : this.sanitizePayload(value);
        }
        return sanitized;
    }
    /**
     * Check if a key name indicates sensitive data.
     */
    isSensitiveKey(key) {
        const normalized = key.toLowerCase();
        return (normalized.includes('authorization') ||
            normalized.includes('token') ||
            normalized.includes('secret') ||
            normalized.includes('password') ||
            normalized.includes('client_id') ||
            normalized.includes('cookie') ||
            normalized.includes('csrf'));
    }
    /**
     * Mask a sensitive value for logging.
     */
    maskValue(value) {
        if (typeof value === 'string') {
            if (value.length <= 8) {
                return '********';
            }
            return `${value.slice(0, 4)}…${value.slice(-4)}`;
        }
        if (Array.isArray(value)) {
            return value.map(() => '********');
        }
        if (typeof value === 'object' && value !== null) {
            return '[masked-object]';
        }
        return '********';
    }
}
//# sourceMappingURL=request.js.map