import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'node:http';
import type { EnvironmentConfig, OmadaConnectionConfig } from '../config.js';
declare function getRequestUrl(req: IncomingMessage, fallbackPort: number): URL | undefined;
declare function sendJson(res: ServerResponse, statusCode: number, body: unknown): void;
declare function sanitizeHeaders(headers: IncomingHttpHeaders): Record<string, unknown>;
declare function sanitizeHeaderValue(key: string, value: string): string;
declare function sanitizePayload(payload: unknown): unknown;
declare function isSensitiveKey(key: string): boolean;
declare function isLikelySensitiveString(value: string): boolean;
declare function maskValue(value: unknown): unknown;
declare function createShutdownHandler(signal: NodeJS.Signals, closeHttp: () => Promise<void>, closeSessions: () => Promise<void>): Promise<void>;
/**
 * Starts the HTTP server with the Streamable HTTP transport.
 * Omada credentials are resolved per-connection/session from env vars (always win)
 * and request headers (x-omada-client-id, x-omada-client-secret, x-omada-omadac-id).
 */
export declare function startHttpServer(config: EnvironmentConfig, preconfiguredOmadaConfig?: OmadaConnectionConfig): Promise<void>;
export { getRequestUrl, sendJson, sanitizeHeaders, sanitizeHeaderValue, sanitizePayload, isSensitiveKey, isLikelySensitiveString, maskValue, createShutdownHandler, };
