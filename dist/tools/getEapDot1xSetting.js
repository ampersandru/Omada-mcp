import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetEapDot1xSettingTool(server, client) {
    server.registerTool('getEapDot1xSetting', {
        description: 'Get the 802.1X EAP setting for access points, controlling port-based authentication on wireless clients.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getEapDot1xSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getEapDot1xSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getEapDot1xSetting.js.map