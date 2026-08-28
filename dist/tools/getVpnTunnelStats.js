import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerGetVpnTunnelStatsTool(server, client) {
    const inputSchema = {
        ...createPaginationSchema(),
        ...siteInputSchema.shape,
    };
    server.registerTool('getVpnTunnelStats', {
        description: 'Get VPN tunnel statistics for a site (paginated), including active tunnels, traffic, and connection status.',
        inputSchema,
    }, wrapToolHandler('getVpnTunnelStats', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getVpnTunnelStats(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=getVpnTunnelStats.js.map