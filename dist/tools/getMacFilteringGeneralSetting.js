import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMacFilteringGeneralSettingTool(server, client) {
    server.registerTool('getMacFilteringGeneralSetting', {
        description: 'Get the MAC filtering global setting. Returns whether MAC-based allow/deny filtering is enabled site-wide.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getMacFilteringGeneralSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getMacFilteringGeneralSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getMacFilteringGeneralSetting.js.map