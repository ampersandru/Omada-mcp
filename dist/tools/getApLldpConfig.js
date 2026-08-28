import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetApLldpConfigTool(server, client) {
    server.registerTool('getApLldpConfig', {
        description: 'Get LLDP (Link Layer Discovery Protocol) configuration for an access point. Returns enabled state and advertised TLVs. LLDP allows network devices to advertise identity and capabilities to neighbours.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getApLldpConfig', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getApLldpConfig(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getApLldpConfig.js.map