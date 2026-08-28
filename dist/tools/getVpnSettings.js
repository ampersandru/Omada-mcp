import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetVpnSettingsTool(server, client) {
    server.registerTool('getVpnSettings', {
        description: 'Get VPN configuration settings for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getVpnSettings', async ({ siteId, customHeaders }) => toToolResult(await client.getVpnSettings(siteId, customHeaders))));
}
//# sourceMappingURL=getVpnSettings.js.map