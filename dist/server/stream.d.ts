import type { IncomingMessage, ServerResponse } from 'node:http';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { EnvironmentConfig, OmadaConnectionConfig } from '../config.js';
import { OmadaClient } from '../omadaClient/index.js';
import { createServer } from './common.js';
export interface StreamTransportState {
    transport: StreamableHTTPServerTransport;
    server: ReturnType<typeof createServer>;
    connected: boolean;
    closed: boolean;
    lastAccessed: number;
}
type StreamSessionMap = Map<string, StreamTransportState>;
interface StreamLifecycleHooks {
    onSessionInitialized?: (sessionId: string) => void;
    onSessionClosed?: (sessionId: string) => void;
}
/**
 * Creates a Streamable HTTP transport
 * This implements the MCP protocol version 2025-03-26
 */
export declare function createStreamTransport(client: OmadaClient, config: EnvironmentConfig, hooks?: StreamLifecycleHooks): StreamTransportState;
/**
 * Handles incoming Streamable HTTP requests (GET, POST, DELETE) using persistent session state.
 * For new sessions, resolves Omada credentials from env config (wins) and request headers (fallback).
 * Existing sessions reuse the OmadaClient that was created when the session was initialized.
 */
export declare function handleStreamRequest(config: EnvironmentConfig, omadaConfig: OmadaConnectionConfig, req: IncomingMessage, res: ServerResponse, parsedBody: unknown | undefined, sessions: StreamSessionMap): Promise<void>;
export declare function closeAllStreamSessions(sessions: StreamSessionMap): Promise<void>;
export {};
