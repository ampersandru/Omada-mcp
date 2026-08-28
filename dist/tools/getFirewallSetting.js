import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetFirewallSettingTool(server, client) {
    server.registerTool('getFirewallSetting', {
        description: 'Get the site-global firewall settings returned by the official Omada firewall endpoint.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getFirewallSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getFirewallSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getFirewallSetting.js.map