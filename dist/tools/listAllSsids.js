import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListAllSsidsTool(server, client) {
    server.registerTool('listAllSsids', {
        description: 'List all wireless SSIDs across all WLAN groups in a site: SSID name, WLAN group, security mode (WPA2/WPA3), band steering, guest network flag, and enabled state.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listAllSsids', async ({ siteId, customHeaders }) => toToolResult(await client.listAllSsids(siteId, customHeaders))));
}
//# sourceMappingURL=listAllSsids.js.map