import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetIptvSettingTool(server, client) {
    server.registerTool('getIptvSetting', {
        description: 'Get IPTV service configuration for the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getIptvSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getIptvSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getIptvSetting.js.map