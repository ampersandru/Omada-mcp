import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetSitesApsAvailableChannelTool(server, client) {
    server.registerTool('getSitesApsAvailableChannel', {
        description: 'Get available channels for an AP.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSitesApsAvailableChannel', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getSitesApsAvailableChannel(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getSitesApsAvailableChannel.js.map