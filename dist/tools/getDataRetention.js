import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDataRetentionTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getDataRetention', {
        description: 'Get the data retention settings for the controller, including how long logs and statistics are stored.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getDataRetention', async ({ customHeaders }) => toToolResult(await client.getDataRetention(customHeaders))));
}
//# sourceMappingURL=getDataRetention.js.map