import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAdvancedVpnSettingTool(server, client) {
    server.registerTool('getAdvancedVpnSetting', {
        description: 'Get advanced VPN configuration settings for a site, including general VPN parameters and default settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getAdvancedVpnSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getVpnSettings(siteId, customHeaders))));
}
//# sourceMappingURL=getAdvancedVpnSetting.js.map