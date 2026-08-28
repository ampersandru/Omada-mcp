import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    type: z.number().int().min(0).max(1).describe('OpenVPN tunnel role to query: 0 = Server, 1 = Client.'),
});
export function registerGetGridDashboardOpenVpnTunnelStatsTool(server, client) {
    server.registerTool('getGridDashboardOpenVpnTunnelStats', {
        description: 'Get OpenVPN tunnel statistics for the site dashboard filtered by role. Returns connection counts, traffic volumes, and status for OpenVPN tunnels. type must be 0 (Server) or 1 (Client).',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridDashboardOpenVpnTunnelStats', async ({ siteId, type, customHeaders }) => toToolResult(await client.getGridDashboardOpenVpnTunnelStats(siteId, type, customHeaders))));
}
//# sourceMappingURL=getGridDashboardOpenVpnTunnelStats.js.map