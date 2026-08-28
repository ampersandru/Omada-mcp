import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRoutingTableTool(server, client) {
    const inputSchema = z.object({
        type: z
            .enum(['static', 'policy', 'ospf'])
            .describe('Routing table type: "static" for static routes, "policy" for policy-based routes, "ospf" for OSPF-learned routes.'),
        ...siteInputSchema.shape,
    });
    server.registerTool('getRoutingTable', {
        description: 'Get the live routing table for a site filtered by type. Use type="static" for manually configured static routes, type="policy" for policy-based routing entries, or type="ospf" for dynamically learned OSPF routes.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getRoutingTable', async ({ type, siteId, customHeaders }) => toToolResult(await client.getRoutingTable(type, siteId, customHeaders))));
}
//# sourceMappingURL=getRoutingTable.js.map