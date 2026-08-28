import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    gatewayMac: deviceMacSchema.describe('MAC address of the gateway (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find the gateway MAC.'),
})
    .required({ gatewayMac: true });
export function registerGetGatewayLanStatusTool(server, client) {
    server.registerTool('getGatewayLanStatus', {
        description: 'Get LAN port status for a specific gateway: port link state, speed, duplex, connected device, and VLAN assignment. Use listDevices to get the gatewayMac.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGatewayLanStatus', async ({ gatewayMac, siteId, customHeaders }) => toToolResult(await client.getGatewayLanStatus(gatewayMac, siteId, customHeaders))));
}
//# sourceMappingURL=getGatewayLanStatus.js.map