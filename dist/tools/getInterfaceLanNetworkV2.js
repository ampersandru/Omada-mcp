import { z } from 'zod';
import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
    type: z.number().int().min(0).max(1).optional().describe('Interface type filter: 0 = WAN, 1 = LAN. Omit to return all.'),
});
export function registerGetInterfaceLanNetworkV2Tool(server, client) {
    server.registerTool('getInterfaceLanNetworkV2', {
        description: 'Get interface-level LAN network bindings (v2 API). Returns richer per-interface VLAN and network data. Optionally filter by type (0=WAN, 1=LAN).',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getInterfaceLanNetworkV2', async ({ type, siteId, customHeaders }) => toToolResult(await client.getInterfaceLanNetworkV2(type, siteId, customHeaders))));
}
//# sourceMappingURL=getInterfaceLanNetworkV2.js.map