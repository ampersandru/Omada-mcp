import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRetentionTool(server, client) {
    server.registerTool('getRetention', {
        description: 'Get the data retention configuration for the controller, including how long logs, statistics, and client records are kept.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getRetention', async ({ customHeaders }) => toToolResult(await client.getRetention(customHeaders))));
}
//# sourceMappingURL=getRetention.js.map