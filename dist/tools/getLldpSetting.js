import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetLldpSettingTool(server, client) {
    server.registerTool('getLldpSetting', {
        description: 'Get LLDP (Link Layer Discovery Protocol) global setting for the site. Shows whether LLDP is enabled and which TLVs are advertised.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getLldpSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getLldpSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getLldpSetting.js.map