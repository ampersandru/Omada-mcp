import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardWifiSummaryTool(server, client) {
    server.registerTool('getDashboardWifiSummary', {
        description: 'Get WiFi summary for a site dashboard: total APs, connected AP count, wireless client count, channel utilization per band (2.4GHz/5GHz), and SSID count.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardWifiSummary', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardWifiSummary(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardWifiSummary.js.map