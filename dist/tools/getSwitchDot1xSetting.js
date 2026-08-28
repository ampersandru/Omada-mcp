import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSwitchDot1xSettingTool(server, client) {
    server.registerTool('getSwitchDot1xSetting', {
        description: 'Get the 802.1X switch port authentication setting. Controls port-based network access control on managed switches.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSwitchDot1xSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getSwitchDot1xSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getSwitchDot1xSetting.js.map