import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetClientActiveTimeoutTool(server, client) {
    server.registerTool('getClientActiveTimeout', {
        description: 'Get the client inactivity timeout setting. Clients are marked inactive after this period of no traffic.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getClientActiveTimeout', async ({ customHeaders }) => toToolResult(await client.getClientActiveTimeout(customHeaders))));
}
//# sourceMappingURL=getClientActiveTimeout.js.map