import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLogSettingForSiteTool(server, client) {
    server.registerTool('getLogSettingForSite', {
        description: 'Get site-level log notification settings (v1), including alert recipients and notification rules.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getLogSettingForSite', async ({ siteId, customHeaders }) => toToolResult(await client.getLogSettingForSite(siteId, customHeaders))));
}
//# sourceMappingURL=getLogSettingForSite.js.map