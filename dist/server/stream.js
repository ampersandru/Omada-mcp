import { randomUUID } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { OmadaClient } from '../omadaClient/index.js';
import { registerAllTools } from '../tools/index.js';
import { logger } from '../utils/logger.js';
import { createServer } from './common.js';
function respondWithJson(res, statusCode, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
}
async function connectSession(state) {
    if (state.connected || state.closed) {
        return;
    }
    if (typeof state.server.connect === 'function') {
        await state.server.connect(state.transport);
        state.connected = true;
    }
}
async function closeTransport(state, sessionId) {
    if (state.closed) {
        return;
    }
    state.closed = true;
    state.connected = false;
    try {
        if (typeof state.server.close === 'function') {
            await state.server.close();
        }
    }
    catch (error) {
        logger.error('Failed to close Streamable HTTP server', { error, sessionId });
    }
    try {
        if (typeof state.transport.close === 'function') {
            await state.transport.close();
        }
    }
    catch (error) {
        logger.error('Failed to close Streamable HTTP transport', { error, sessionId });
    }
}
function getSessionIdFromHeaders(req) {
    const header = req.headers['mcp-session-id'];
    if (Array.isArray(header)) {
        return header[0];
    }
    return header;
}
/**
 * Creates a Streamable HTTP transport
 * This implements the MCP protocol version 2025-03-26
 */
export function createStreamTransport(client, config, hooks) {
    const mcpServer = createServer();
    registerAllTools(mcpServer, client, config.toolCategories);
    logger.info('Starting Streamable HTTP transport; Mcp-Session-Id headers are optional in client-credentials mode');
    logger.warn('HTTP transport is running in explicitly unsafe mode. The supported production baseline remains stdio only.');
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        allowedOrigins: config.httpAllowedOrigins,
        enableDnsRebindingProtection: true,
        onsessioninitialized: (sessionId) => {
            logger.info('Session initialized', { sessionId });
            hooks?.onSessionInitialized?.(sessionId);
        },
        onsessionclosed: (sessionId) => {
            logger.info('Session closed', { sessionId });
            hooks?.onSessionClosed?.(sessionId);
        },
    });
    transport.onerror = (error) => {
        logger.error('Streamable HTTP transport error', {
            error,
            message: error.message,
        });
    };
    return {
        transport,
        server: mcpServer,
        connected: false,
        closed: false,
        lastAccessed: Date.now(),
    };
}
/**
 * Handles incoming Streamable HTTP requests (GET, POST, DELETE) using persistent session state.
 * For new sessions, resolves Omada credentials from env config (wins) and request headers (fallback).
 * Existing sessions reuse the OmadaClient that was created when the session was initialized.
 */
export async function handleStreamRequest(config, omadaConfig, req, res, parsedBody = undefined, sessions) {
    const originHeader = req.headers.origin;
    const hostHeader = req.headers.host;
    const headerSessionId = getSessionIdFromHeaders(req);
    logger.info('Streamable HTTP request received', {
        method: req.method,
        url: req.url,
        sessionId: headerSessionId ?? undefined,
        origin: originHeader ?? '(not set)',
        host: hostHeader ?? '(not set)',
    });
    let state = headerSessionId ? sessions.get(headerSessionId) : undefined;
    if (headerSessionId && !state) {
        logger.warn('Stream session not found', { sessionId: headerSessionId, method: req.method, url: req.url });
        respondWithJson(res, 404, { error: 'Stream session not found', jsonrpc: '2.0', id: null });
        return;
    }
    const isNewSession = !state;
    if (!state) {
        const client = new OmadaClient(omadaConfig);
        if (typeof client.init === 'function') {
            try {
                await client.init();
            }
            catch (error) {
                logger.warn('Failed to init OmadaClient in stream session', { error });
            }
        }
        let pendingState;
        const lifecycleHooks = {
            onSessionInitialized: (sessionId) => {
                sessions.set(sessionId, pendingState);
                logger.debug('Registered Streamable HTTP session', { sessionId });
            },
            onSessionClosed: (sessionId) => {
                sessions.delete(sessionId);
                void closeTransport(pendingState, sessionId);
            },
        };
        pendingState = createStreamTransport(client, config, lifecycleHooks);
        state = pendingState;
        await connectSession(state);
    }
    state.lastAccessed = Date.now();
    try {
        await state.transport.handleRequest(req, res, parsedBody);
        logger.debug('Streamable HTTP request handled', {
            method: req.method,
            sessionId: headerSessionId ?? (isNewSession ? '(new-session)' : undefined),
        });
    }
    catch (error) {
        logger.error('Failed to handle Streamable HTTP request', {
            error,
            method: req.method,
            url: req.url,
            origin: originHeader ?? '(not set)',
            host: hostHeader ?? '(not set)',
            allowedOrigins: config.httpAllowedOrigins,
        });
        throw error;
    }
}
export async function closeAllStreamSessions(sessions) {
    for (const [sessionId, state] of sessions.entries()) {
        await closeTransport(state, sessionId);
        sessions.delete(sessionId);
        logger.info('Closed Streamable HTTP session', { sessionId });
    }
}
//# sourceMappingURL=stream.js.map