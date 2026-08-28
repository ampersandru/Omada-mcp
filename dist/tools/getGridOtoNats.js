import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridOtoNatsTool(server, client) {
    server.registerTool('getGridOtoNats', {
        description: 'Get 1:1 NAT rules for the site gateway. Each rule maps a public IP directly to a private host IP. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridOtoNats', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridOtoNats(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridOtoNats.js.map