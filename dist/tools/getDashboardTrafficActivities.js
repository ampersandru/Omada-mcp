import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardTrafficActivitiesTool(server, client) {
    server.registerTool('getDashboardTrafficActivities', {
        description: 'Get traffic activity time-series data for a site, showing upload and download trends over time.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardTrafficActivities', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardTrafficActivities(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardTrafficActivities.js.map