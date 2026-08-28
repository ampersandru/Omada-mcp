import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetWanUsageStatsTool(server, client) {
    server.registerTool('getWanUsageStats', {
        description: '[DEPRECATED] Use getDashboardTrafficActivities instead. Same endpoint. Get WAN traffic usage statistics and activity data for the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getWanUsageStats', async ({ siteId, customHeaders }) => toToolResult(await client.getWanUsageStats(siteId, customHeaders))));
}
//# sourceMappingURL=getWanUsageStats.js.map