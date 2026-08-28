import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLogSettingForSiteV2Tool(server, client) {
    server.registerTool('getLogSettingForSiteV2', {
        description: 'Get site-level log notification settings (v2), with extended notification configuration options.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getLogSettingForSiteV2', async ({ siteId, customHeaders }) => toToolResult(await client.getLogSettingForSiteV2(siteId, customHeaders))));
}
//# sourceMappingURL=getLogSettingForSiteV2.js.map