import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetApGeneralConfigTool(server, client) {
    server.registerTool('getApGeneralConfig', {
        description: 'Get general configuration for an access point. Returns device name, LED settings, country/region, management VLAN, bandwidth limits, and other global AP parameters. Use getApDetail for runtime status; this returns stored configuration.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getApGeneralConfig', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getApGeneralConfig(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getApGeneralConfig.js.map