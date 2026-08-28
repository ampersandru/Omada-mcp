import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetGridDashboardIpsecTunnelStatsTool(server, client) {
    server.registerTool('getGridDashboardIpsecTunnelStats', {
        description: 'Get IPsec tunnel statistics for the site dashboard. Returns connection counts, traffic volumes, and tunnel health for all IPsec VPN tunnels.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getGridDashboardIpsecTunnelStats', async ({ siteId, customHeaders }) => toToolResult(await client.getGridDashboardIpsecTunnelStats(siteId, customHeaders))));
}
//# sourceMappingURL=getGridDashboardIpsecTunnelStats.js.map