import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridPolicyRoutingTool(server, client) {
    server.registerTool('getGridPolicyRouting', {
        description: 'Get policy routing rules for the site gateway. Policy routes direct traffic based on source IP, destination IP, or protocol. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridPolicyRouting', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridPolicyRouting(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridPolicyRouting.js.map