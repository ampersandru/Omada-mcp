import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridSessionLimitRuleTool(server, client) {
    server.registerTool('getGridSessionLimitRule', {
        description: 'Get per-rule session limit rules for the site gateway. Each rule limits concurrent sessions for matched traffic. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridSessionLimitRule', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridSessionLimitRule(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridSessionLimitRule.js.map