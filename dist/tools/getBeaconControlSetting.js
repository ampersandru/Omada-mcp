import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetBeaconControlSettingTool(server, client) {
    server.registerTool('getBeaconControlSetting', {
        description: 'Get the beacon control setting, which manages 802.11 beacon transmission parameters on access points.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getBeaconControlSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getBeaconControlSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getBeaconControlSetting.js.map