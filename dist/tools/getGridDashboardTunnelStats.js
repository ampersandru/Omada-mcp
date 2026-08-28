import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    type: z.number().int().min(0).max(1).describe('VPN tunnel role to query: 0 = Server, 1 = Client.'),
});
export function registerGetGridDashboardTunnelStatsTool(server, client) {
    server.registerTool('getGridDashboardTunnelStats', {
        description: 'Get VPN tunnel statistics filtered by role. Returns connection counts, traffic volumes, and status for VPN tunnels. type must be 0 (Server) or 1 (Client). Use getVpnTunnelStats for a broader summary.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGridDashboardTunnelStats', async ({ siteId, type, customHeaders }) => toToolResult(await client.getGridDashboardTunnelStats(siteId, type, customHeaders))));
}
//# sourceMappingURL=getGridDashboardTunnelStats.js.map