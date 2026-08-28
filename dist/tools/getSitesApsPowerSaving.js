import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerGetSitesApsPowerSavingTool(server, client) {
    server.registerTool('getSitesApsPowerSaving', {
        description: 'Get power saving config for an AP.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSitesApsPowerSaving', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getSitesApsPowerSaving(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getSitesApsPowerSaving.js.map