import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetIpMacBindingGeneralSettingTool(server, client) {
    server.registerTool('getIpMacBindingGeneralSetting', {
        description: 'Get the IP-MAC binding global toggle setting. Shows whether IP-MAC binding enforcement is enabled site-wide.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getIpMacBindingGeneralSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getIpMacBindingGeneralSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getIpMacBindingGeneralSetting.js.map