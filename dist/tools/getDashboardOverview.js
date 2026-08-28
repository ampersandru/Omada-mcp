import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardOverviewTool(server, client) {
    server.registerTool('getDashboardOverview', {
        description: "Get the site overview topology: device counts (gateways, switches, APs), client counts (wired, wireless, guest), connectivity graph, and overall health status. Good first call to understand what's in the network.",
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardOverview', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardOverview(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardOverview.js.map