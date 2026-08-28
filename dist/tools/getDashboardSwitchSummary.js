import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardSwitchSummaryTool(server, client) {
    server.registerTool('getDashboardSwitchSummary', {
        description: 'Get switch summary for a site dashboard: total switch count, total ports, active ports, PoE budget used vs available, and aggregate bandwidth.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardSwitchSummary', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardSwitchSummary(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardSwitchSummary.js.map