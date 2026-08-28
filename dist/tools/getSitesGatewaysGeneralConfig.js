import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    gatewayMac: deviceMacSchema.describe('MAC address of the gateway (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find gateway MACs.'),
})
    .required({ gatewayMac: true });
export function registerGetSitesGatewaysGeneralConfigTool(server, client) {
    server.registerTool('getSitesGatewaysGeneralConfig', {
        description: 'Get gateway general config.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSitesGatewaysGeneralConfig', async ({ gatewayMac, siteId, customHeaders }) => toToolResult(await client.getSitesGatewaysGeneralConfig(gatewayMac, siteId, customHeaders))));
}
//# sourceMappingURL=getSitesGatewaysGeneralConfig.js.map