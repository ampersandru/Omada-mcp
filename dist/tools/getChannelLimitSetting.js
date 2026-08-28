import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetChannelLimitSettingTool(server, client) {
    server.registerTool('getChannelLimitSetting', {
        description: '[DEPRECATED] Get the channel limit setting that restricts which channels access points are allowed to use on the site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getChannelLimitSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getChannelLimitSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getChannelLimitSetting.js.map