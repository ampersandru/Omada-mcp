import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMacAuthSettingTool(server, client) {
    server.registerTool('getMacAuthSetting', {
        description: 'Get the MAC authentication global setting. MAC auth allows or denies clients based on their MAC address without a password.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getMacAuthSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getMacAuthSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getMacAuthSetting.js.map