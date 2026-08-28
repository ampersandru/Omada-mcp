import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    switchMac: deviceMacSchema.describe('MAC address of the switch (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find switch MACs.'),
})
    .required({ switchMac: true });
export function registerListSitesCableTestSwitchesIncrementResultsTool(server, client) {
    server.registerTool('listSitesCableTestSwitchesIncrementResults', {
        description: 'Get cable test incremental results for a switch.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('listSitesCableTestSwitchesIncrementResults', async ({ switchMac, siteId, customHeaders }) => toToolResult(await client.listSitesCableTestSwitchesIncrementResults(switchMac, siteId, customHeaders))));
}
//# sourceMappingURL=listSitesCableTestSwitchesIncrementResults.js.map