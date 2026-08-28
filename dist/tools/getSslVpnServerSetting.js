import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSslVpnServerSettingTool(server, client) {
    server.registerTool('getSslVpnServerSetting', {
        description: 'Get the SSL VPN server configuration, including port, protocol, and authentication settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSslVpnServerSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getSslVpnServerSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getSslVpnServerSetting.js.map