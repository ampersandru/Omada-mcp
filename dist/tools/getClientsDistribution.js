import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetClientsDistributionTool(server, client) {
    server.registerTool('getClientsDistribution', {
        description: 'Get client count distribution by connection type and band (wired, 2.4GHz, 5GHz, 6GHz). Useful for understanding the network composition at a glance.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getClientsDistribution', async ({ siteId, customHeaders }) => toToolResult(await client.getClientsDistribution(siteId, customHeaders))));
}
//# sourceMappingURL=getClientsDistribution.js.map