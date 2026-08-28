import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetNtpSettingTool(server, client) {
    server.registerTool('getNtpSetting', {
        description: 'Get NTP server configuration and synchronisation status for the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getNtpSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getNtpSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getNtpSetting.js.map