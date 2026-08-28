import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMacFilterDetailTool(server, client) {
    server.registerTool('getMacFilterDetail', {
        description: 'Get the MAC filtering global settings for a site, including whether MAC filtering is enabled and the default action for unmatched clients.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getMacFilterDetail', async ({ siteId, customHeaders }) => toToolResult(await client.getMacFilteringGeneralSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getMacFilterDetail.js.map