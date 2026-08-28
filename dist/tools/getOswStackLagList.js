import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    stackId: siteInputSchema.shape.siteId.unwrap().describe('Stack ID of the switch stack. Use getSwitchStackDetail to find the stackId.'),
})
    .required({ stackId: true });
export function registerGetOswStackLagListTool(server, client) {
    server.registerTool('getOswStackLagList', {
        description: 'Get Link Aggregation Group (LAG) list for a switch stack. Returns configured LAG/trunk groups including member ports, load balancing mode, and status. Use getSwitchStackDetail to get the stackId.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getOswStackLagList', async ({ stackId, siteId, customHeaders }) => toToolResult(await client.getOswStackLagList(stackId, siteId, customHeaders))));
}
//# sourceMappingURL=getOswStackLagList.js.map