import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerListWireguardPeersTool(server, client) {
    server.registerTool('listWireguardPeers', {
        description: 'List WireGuard peers (paginated). Returns peer configurations including public keys, allowed IPs, and endpoint addresses.',
        inputSchema: { ...createPaginationSchema(), ...siteInputSchema.shape },
    }, wrapToolHandler('listWireguardPeers', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.listWireguardPeers(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=listWireguardPeers.js.map