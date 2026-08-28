import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListSitesTool(server, client) {
    const inputSchema = z.object({
        customHeaders: customHeadersSchema,
    });
    server.registerTool('listSites', {
        description: 'List all sites configured on the Omada controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('listSites', async ({ customHeaders }) => toToolResult(await client.listSites(customHeaders))));
}
//# sourceMappingURL=listSites.js.map