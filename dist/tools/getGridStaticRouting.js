import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridStaticRoutingTool(server, client) {
    server.registerTool('getGridStaticRouting', {
        description: 'Get static routing rules for the site gateway with explicit pagination. Returns the list of manually configured static routes.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridStaticRouting', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridStaticRouting(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridStaticRouting.js.map