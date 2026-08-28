import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteRememberSettingTool(server, client) {
    server.registerTool('getSiteRememberSetting', {
        description: 'Get the remember device setting for a site, which controls whether clients are remembered after disconnection.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteRememberSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteRememberSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteRememberSetting.js.map