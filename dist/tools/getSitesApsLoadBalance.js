import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetSitesApsLoadBalanceTool(server, client) {
    server.registerTool('getSitesApsLoadBalance', {
        description: 'Get load balance config for an AP.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSitesApsLoadBalance', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getSitesApsLoadBalance(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getSitesApsLoadBalance.js.map