import { customHeadersSchema, deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    gatewayMac: deviceMacSchema.describe('MAC address of the gateway (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find gateway MACs.'),
    customHeaders: customHeadersSchema,
})
    .required({ gatewayMac: true });
export function registerGetWanHealthDetailTool(server, client) {
    server.registerTool('getWanHealthDetail', {
        description: 'Deprecated alias of `getSitesHealthGatewaysWansDetails`. Get detailed WAN health information for a specific gateway, including per-WAN status and connectivity metrics. Requires `gatewayMac`.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getWanHealthDetail', async ({ gatewayMac, siteId, customHeaders }) => toToolResult(await client.getWanHealthDetail(gatewayMac, siteId, customHeaders))));
}
//# sourceMappingURL=getWanHealthDetail.js.map