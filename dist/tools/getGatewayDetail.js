import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    gatewayMac: deviceMacSchema.describe('MAC address of the gateway (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find the gateway MAC.'),
})
    .required({ gatewayMac: true });
export function registerGetGatewayDetailTool(server, client) {
    server.registerTool('getGatewayDetail', {
        description: 'Fetch full configuration and status for a specific gateway: model, firmware, CPU/memory, WAN/LAN ports, routing mode, and feature flags. Use listDevices to get the gatewayMac.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGatewayDetail', async ({ gatewayMac, siteId, customHeaders }) => toToolResult(await client.getGatewayDetail(gatewayMac, siteId, customHeaders))));
}
//# sourceMappingURL=getGatewayDetail.js.map