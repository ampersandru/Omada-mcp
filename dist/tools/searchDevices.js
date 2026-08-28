import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerSearchDevicesTool(server, client) {
    const inputSchema = z.object({
        searchKey: z.string().min(1, 'searchKey is required'),
        customHeaders: customHeadersSchema,
    });
    server.registerTool('searchDevices', {
        description: 'Search for devices globally across all sites the user has access to. Returns devices matching the search key.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('searchDevices', async ({ searchKey, customHeaders }) => toToolResult(await client.searchDevices(searchKey, customHeaders))));
}
//# sourceMappingURL=searchDevices.js.map