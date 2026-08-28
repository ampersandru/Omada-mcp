import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetTrafficStatsTool(server, client) {
    server.registerTool('getTrafficStats', {
        description: '[DEPRECATED] Use getDashboardTrafficActivities instead. Same GET .../dashboard/traffic-activities endpoint. Get traffic activity statistics for a site, including upload/download throughput data from the dashboard traffic activities endpoint.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getTrafficStats', async ({ siteId, customHeaders }) => toToolResult(await client.getWanUsageStats(siteId, customHeaders))));
}
//# sourceMappingURL=getTrafficStats.js.map