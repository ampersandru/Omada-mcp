import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteDeviceAccountTool(server, client) {
    server.registerTool('getSiteDeviceAccount', {
        description: 'Get the device account settings for a site, including shared credentials used for device access.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteDeviceAccount', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteDeviceAccount(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteDeviceAccount.js.map