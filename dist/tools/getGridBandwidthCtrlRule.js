import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetGridBandwidthCtrlRuleTool(server, client) {
    server.registerTool('getGridBandwidthCtrlRule', {
        description: 'Get bandwidth control rules for the site gateway. Each rule defines upload/download limits for matched traffic. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridBandwidthCtrlRule', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridBandwidthCtrlRule(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getGridBandwidthCtrlRule.js.map