import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetDdnsGridTool(server, client) {
    server.registerTool('getDdnsGrid', {
        description: 'Get DDNS (Dynamic DNS) entries for the site gateway. Each entry maps a hostname to the current WAN IP via a DDNS provider. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getDdnsGrid', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getDdnsGrid(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getDdnsGrid.js.map