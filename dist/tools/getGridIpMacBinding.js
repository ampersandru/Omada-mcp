import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridIpMacBindingTool(server, client) {
    server.registerTool('getGridIpMacBinding', {
        description: 'Get IP-MAC binding entries for the site. Each binding enforces that a given MAC address must use a specific IP. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridIpMacBinding', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridIpMacBinding(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridIpMacBinding.js.map