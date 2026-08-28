import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListClientToSiteVpnClientsTool(server, client) {
    server.registerTool('listClientToSiteVpnClients', {
        description: 'List all client-to-site VPN client configurations on the site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listClientToSiteVpnClients', async ({ siteId, customHeaders }) => toToolResult(await client.listClientToSiteVpnClients(siteId, customHeaders))));
}
//# sourceMappingURL=listClientToSiteVpnClients.js.map