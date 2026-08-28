import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDot1xConfigTool(server, client) {
    server.registerTool('getDot1xConfig', {
        description: 'Get the 802.1X (dot1x) authentication configuration for a site, including enabled state, authentication mode, and RADIUS server settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDot1xConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getSwitchDot1xSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getDot1xConfig.js.map