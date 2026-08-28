import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetUplinkWiredDetailTool(server, client) {
    server.registerTool('getUplinkWiredDetail', {
        description: "Get wired uplink detail for an access point. Returns the AP's Ethernet uplink port information including connected switch, port number, link speed, and PoE status. Useful for mapping physical network topology.",
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getUplinkWiredDetail', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getUplinkWiredDetail(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getUplinkWiredDetail.js.map