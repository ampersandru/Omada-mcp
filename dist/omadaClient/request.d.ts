import { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { CustomHeaders, OmadaApiResponse } from '../types/index.js';
import type { AuthManager } from './auth.js';
/**
 * HTTP request handler for Omada API calls with authentication and retry logic.
 */
export declare class RequestHandler {
    private readonly http;
    private readonly auth;
    private nextAllowedRequestAt;
    constructor(http: AxiosInstance, auth: AuthManager);
    /**
     * Make a GET request to the Omada API.
     */
    get<T>(path: string, params?: Record<string, unknown>, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Make a PATCH request to the Omada API.
     */
    patch<T>(path: string, data?: unknown, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Make a PUT request to the Omada API.
     */
    put<T>(path: string, data?: unknown, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Make a POST request to the Omada API.
     */
    post<T>(path: string, data?: unknown, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Make a DELETE request to the Omada API.
     */
    delete<T>(path: string, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Make an arbitrary HTTP request to the Omada API.
     */
    request<T>(config: AxiosRequestConfig, retry?: boolean, customHeaders?: CustomHeaders): Promise<T>;
    /**
     * Fetch all pages of a paginated API endpoint.
     */
    fetchPaginated<T>(path: string, params?: Record<string, unknown>, customHeaders?: CustomHeaders): Promise<T[]>;
    /**
     * Ensure an Omada API response indicates success.
     * @throws {Error} If the response contains an error code
     */
    ensureSuccess<T>(response: OmadaApiResponse<T>): T;
    /**
     * Check if an error code indicates an authentication error.
     */
    private isAuthErrorCode;
    /**
     * Check if an error message indicates token expiration.
     */
    private isTokenExpiredMessage;
    private waitForRateWindow;
    private getRetryDelayMs;
    private sleep;
    /**
     * Sanitize HTTP headers for logging, masking sensitive values.
     */
    private sanitizeHeaders;
    /**
     * Sanitize a payload for logging, masking sensitive values.
     */
    private sanitizePayload;
    /**
     * Check if a key name indicates sensitive data.
     */
    private isSensitiveKey;
    /**
     * Mask a sensitive value for logging.
     */
    private maskValue;
}
