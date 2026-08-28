import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetTopThreatsTool(server, client) {
    const inputSchema = z.object({
        customHeaders: customHeadersSchema,
    });
    server.registerTool('getTopThreats', {
        description: 'Get the top threats from the global threat management view across all sites.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getTopThreats', async ({ customHeaders }) => toToolResult(await client.getTopThreats(customHeaders))));
}
//# sourceMappingURL=getTopThreats.js.map