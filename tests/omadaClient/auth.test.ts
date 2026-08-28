import type { AxiosInstance } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthManager } from '../../src/omadaClient/auth.js';
import type { OmadaApiResponse, TokenResult } from '../../src/types/index.js';
import * as loggerModule from '../../src/utils/logger.js';

describe('AuthManager', () => {
    let authManager: AuthManager;
    let mockHttp: AxiosInstance;
    const clientId = 'test-client-id';
    const clientSecret = 'test-client-secret';
    const omadacId = 'test-omadac-id';

    beforeEach(() => {
        mockHttp = {
            defaults: { baseURL: 'https://test.example.com' },
            post: vi.fn(),
        } as unknown as AxiosInstance;

        authManager = new AuthManager(mockHttp, clientId, clientSecret, omadacId);

        // Mock logger to avoid console output during tests
        vi.spyOn(loggerModule.logger, 'error').mockImplementation(() => {
            // Mock implementation
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getAccessToken', () => {
        it('should authenticate and return access token on first call', async () => {
            const mockToken: TokenResult = {
                accessToken: 'test-access-token',
                refreshToken: 'test-refresh-token',
                expiresIn: 3600,
                tokenType: 'Bearer',
            };

            const mockResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: mockToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

            const token = await authManager.getAccessToken();

            expect(token).toBe('test-access-token');
            expect(mockHttp.post).toHaveBeenCalledWith(
                '/openapi/authorize/token',
                {
                    client_id: clientId,
                    client_secret: clientSecret,
                    omadacId: omadacId,
                },
                { params: { grant_type: 'client_credentials' } }
            );
        });

        it('should return cached token if still valid', async () => {
            const mockToken: TokenResult = {
                accessToken: 'cached-token',
                refreshToken: 'cached-refresh',
                expiresIn: 3600,
                tokenType: 'Bearer',
            };

            const mockResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: mockToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

            // First call to set token
            const token1 = await authManager.getAccessToken();
            expect(token1).toBe('cached-token');

            // Second call should use cached token
            const token2 = await authManager.getAccessToken();
            expect(token2).toBe('cached-token');
            expect(mockHttp.post).toHaveBeenCalledTimes(1); // Only called once
        });

        it('should refresh token when expired', async () => {
            const initialToken: TokenResult = {
                accessToken: 'initial-token',
                refreshToken: 'initial-refresh',
                expiresIn: 1, // Very short expiry
                tokenType: 'Bearer',
            };

            const refreshedToken: TokenResult = {
                accessToken: 'refreshed-token',
                refreshToken: 'refreshed-refresh',
                expiresIn: 3600,
                tokenType: 'Bearer',
            };

            const initialResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: initialToken,
            };

            const refreshResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: refreshedToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>)
                .mockResolvedValueOnce({ data: initialResponse })
                .mockResolvedValueOnce({ data: refreshResponse });

            // First call
            await authManager.getAccessToken();

            // Wait for token to expire
            await new Promise((resolve) => setTimeout(resolve, 50));

            // Second call should refresh
            const token = await authManager.getAccessToken();

            expect(token).toBe('refreshed-token');
            expect(mockHttp.post).toHaveBeenCalledTimes(2);
            expect(mockHttp.post).toHaveBeenNthCalledWith(
                2,
                '/openapi/authorize/token',
                {
                    client_id: clientId,
                    client_secret: clientSecret,
                },
                { params: { grant_type: 'refresh_token', refresh_token: 'initial-refresh' } }
            );
        });

        it('should re-authenticate with client credentials if refresh fails', async () => {
            const initialToken: TokenResult = {
                accessToken: 'initial-token',
                refreshToken: 'initial-refresh',
                expiresIn: 1,
                tokenType: 'Bearer',
            };

            const newToken: TokenResult = {
                accessToken: 'new-token',
                refreshToken: 'new-refresh',
                expiresIn: 3600,
                tokenType: 'Bearer',
            };

            const initialResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: initialToken,
            };

            const newResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: newToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>)
                .mockResolvedValueOnce({ data: initialResponse })
                .mockRejectedValueOnce(new Error('Refresh failed'))
                .mockResolvedValueOnce({ data: newResponse });

            // First call
            await authManager.getAccessToken();

            // Wait for token to expire
            await new Promise((resolve) => setTimeout(resolve, 50));

            // Second call should try refresh, fail, then use client_credentials
            const token = await authManager.getAccessToken();

            expect(token).toBe('new-token');
            expect(mockHttp.post).toHaveBeenCalledTimes(3);
        });

        it('should throw error if authentication fails', async () => {
            const errorResponse: OmadaApiResponse<TokenResult> = {
                errorCode: -1,
                msg: 'Authentication failed',
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: errorResponse });

            await expect(authManager.getAccessToken()).rejects.toThrow('Authentication failed');
            expect(loggerModule.logger.error).toHaveBeenCalledWith(
                'Omada authentication error',
                expect.objectContaining({
                    errorCode: -1,
                    message: 'Authentication failed',
                })
            );
        });

        it('should throw error if HTTP request fails', async () => {
            (mockHttp.post as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

            await expect(authManager.getAccessToken()).rejects.toThrow('Network error');
            expect(loggerModule.logger.error).toHaveBeenCalledWith(
                'Omada authentication failed',
                expect.objectContaining({
                    grantType: 'client_credentials',
                    error: 'Network error',
                })
            );
        });

        it('should handle missing result in response', async () => {
            const mockResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

            const token = await authManager.getAccessToken();

            // Should return empty string when token is undefined
            expect(token).toBe('');
        });

        it('should handle zero or negative expiresIn', async () => {
            const mockToken: TokenResult = {
                accessToken: 'test-token',
                refreshToken: 'test-refresh',
                expiresIn: 0,
                tokenType: 'Bearer',
            };

            const mockResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: mockToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

            const token = await authManager.getAccessToken();

            expect(token).toBe('test-token');
        });
    });

    describe('clearToken', () => {
        it('should clear all token state', async () => {
            const mockToken: TokenResult = {
                accessToken: 'test-token',
                refreshToken: 'test-refresh',
                expiresIn: 3600,
                tokenType: 'Bearer',
            };

            const mockResponse: OmadaApiResponse<TokenResult> = {
                errorCode: 0,
                msg: 'Success',
                result: mockToken,
            };

            (mockHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

            // Set a token
            await authManager.getAccessToken();
            expect(mockHttp.post).toHaveBeenCalledTimes(1);

            // Clear it
            authManager.clearToken();

            // Next call should re-authenticate
            await authManager.getAccessToken();
            expect(mockHttp.post).toHaveBeenCalledTimes(2);
        });
    });

    describe('Web Session Authentication (Fusion Gateway / Local Login)', () => {
        let webHttp: AxiosInstance;
        let webAuthManager: AuthManager;
        const username = 'admin';
        const password = 'secretpassword';

        beforeEach(() => {
            webHttp = {
                defaults: { baseURL: 'https://192.168.1.1' },
                get: vi.fn(),
                post: vi.fn(),
            } as unknown as AxiosInstance;

            webAuthManager = new AuthManager(webHttp, {
                username,
                password,
                omadacId: 'fusion-cid-123',
            });
        });

        it('should perform web login and return CSRF token as access token', async () => {
            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: { token: 'csrf-token-xyz' },
                },
                headers: {
                    'set-cookie': ['TP_SESSIONID=session123; Path=/; HttpOnly'],
                },
            });

            const token = await webAuthManager.getAccessToken();

            expect(token).toBe('csrf-token-xyz');
            expect(webHttp.post).toHaveBeenCalledWith('/fusion-cid-123/api/v2/login', {
                username,
                password,
            });
        });

        it('should return correct auth headers with CSRF token, web-local source, and cookies', async () => {
            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: { token: 'csrf-token-xyz' },
                },
                headers: {
                    'set-cookie': ['TP_SESSIONID=session123; Path=/; HttpOnly', 'AUTHTOKEN=token456; Path=/'],
                },
            });

            const headers = await webAuthManager.getAuthHeaders();

            expect(headers['Csrf-Token']).toBe('csrf-token-xyz');
            expect(headers['Omada-Request-Source']).toBe('web-local');
            expect(headers.Cookie).toContain('TP_SESSIONID=session123');
            expect(headers.Cookie).toContain('AUTHTOKEN=token456');
            expect(headers.Authorization).toBeUndefined();
        });

        it('should auto-detect omadacId from /api/info if not provided', async () => {
            const autoCidAuth = new AuthManager(webHttp, {
                username,
                password,
            });

            (webHttp.get as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: {
                        omadacId: 'auto-detected-cid',
                        controllerVersion: '5.14.0',
                    },
                },
            });

            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: { token: 'csrf-token-auto' },
                },
            });

            const cid = await autoCidAuth.getOmadacId();
            expect(cid).toBe('auto-detected-cid');
            expect(webHttp.get).toHaveBeenCalledWith('/api/info');

            const token = await autoCidAuth.getAccessToken();
            expect(token).toBe('csrf-token-auto');
            expect(webHttp.post).toHaveBeenCalledWith('/auto-detected-cid/api/v2/login', {
                username,
                password,
            });
        });

        it('should throw error if web login fails', async () => {
            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: -30109,
                    msg: 'Invalid username or password',
                },
            });

            await expect(webAuthManager.getAccessToken()).rejects.toThrow('Invalid username or password');
        });

        it('should throw error if /api/info auto-detection fails', async () => {
            const autoCidAuth = new AuthManager(webHttp, {
                username,
                password,
            });

            (webHttp.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Connection refused'));

            await expect(autoCidAuth.getOmadacId()).rejects.toThrow('Failed to auto-detect Omada Controller ID');
        });

        it('should clear web session and cookies on clearToken', async () => {
            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: { token: 'csrf-token-1' },
                },
                headers: {
                    'set-cookie': ['TP_SESSIONID=session1; Path=/'],
                },
            });

            await webAuthManager.getAccessToken();
            expect(webHttp.post).toHaveBeenCalledTimes(1);

            webAuthManager.clearToken();

            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: { token: 'csrf-token-2' },
                },
                headers: {
                    'set-cookie': ['TP_SESSIONID=session2; Path=/'],
                },
            });

            const token2 = await webAuthManager.getAccessToken();
            expect(token2).toBe('csrf-token-2');
            expect(webHttp.post).toHaveBeenCalledTimes(2);
        });

        it('should throw if credentials are missing during web session login', async () => {
            const noCredsAuth = new AuthManager(webHttp, {
                authMode: 'web',
            });
            await expect(noCredsAuth.getAccessToken()).rejects.toThrow('OMADA_USERNAME and OMADA_PASSWORD are required');
        });

        it('should throw if web login succeeds but returns no CSRF token', async () => {
            (webHttp.post as ReturnType<typeof vi.fn>).mockResolvedValue({
                data: {
                    errorCode: 0,
                    msg: 'Success',
                    result: {},
                },
            });

            await expect(webAuthManager.getAccessToken()).rejects.toThrow('no CSRF token was returned');
        });

        it('should expose helper getters getAuthMode, getOmadacIdSync, getCookieHeader', () => {
            expect(webAuthManager.getAuthMode()).toBe('web');
            expect(webAuthManager.getOmadacIdSync()).toBe('fusion-cid-123');
            expect(webAuthManager.getCookieHeader()).toBeUndefined();

            webAuthManager.updateCookies('SINGLE_COOKIE=val; Path=/');
            expect(webAuthManager.getCookieHeader()).toBe('SINGLE_COOKIE=val');
            webAuthManager.updateCookies(undefined);
            expect(webAuthManager.getCookieHeader()).toBe('SINGLE_COOKIE=val');
        });
    });

    describe('OpenAPI auth edge cases', () => {
        it('should throw if clientId or clientSecret are missing', async () => {
            const noCredsAuth = new AuthManager(mockHttp, {
                authMode: 'openapi',
            });
            await expect(noCredsAuth.getAccessToken()).rejects.toThrow('OMADA_CLIENT_ID and OMADA_CLIENT_SECRET are required');
        });

        it('should throw if omadacId is missing in client_credentials grant', async () => {
            const noCidAuth = new AuthManager(mockHttp, {
                authMode: 'openapi',
                clientId: 'cid',
                clientSecret: 'secret',
            });
            await expect(noCidAuth.getAccessToken()).rejects.toThrow('OMADA_OMADAC_ID is required for OpenAPI authentication');
        });
    });
});
