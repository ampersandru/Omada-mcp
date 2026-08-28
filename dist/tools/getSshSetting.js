import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSshSettingTool(server, client) {
    server.registerTool('getSshSetting', {
        description: 'Get SSH access settings for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSshSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getSshSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getSshSetting.js.map