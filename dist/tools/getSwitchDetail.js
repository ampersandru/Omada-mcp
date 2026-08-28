import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    switchMac: deviceMacSchema.describe('MAC address of the switch (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find switch MACs.'),
})
    .required({ switchMac: true });
export function registerGetSwitchDetailTool(server, client) {
    server.registerTool('getSwitchDetail', {
        description: 'Fetch full configuration and status for a specific switch: model, firmware, CPU/memory, all port states, PoE usage, VLAN config, and STP status. Use listDevices to get the switchMac.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSwitchDetail', async ({ switchMac, siteId, customHeaders }) => toToolResult(await client.getSwitchDetail(switchMac, siteId, customHeaders))));
}
//# sourceMappingURL=getSwitchDetail.js.map