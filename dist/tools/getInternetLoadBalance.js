import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetInternetLoadBalanceTool(server, client) {
    server.registerTool('getInternetLoadBalance', {
        description: 'Get WAN load balancing configuration for the site gateway. Returns load balancing mode (failover/load balance) and WAN port weights.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getInternetLoadBalance', async ({ siteId, customHeaders }) => toToolResult(await client.getInternetLoadBalance(siteId, customHeaders))));
}
//# sourceMappingURL=getInternetLoadBalance.js.map