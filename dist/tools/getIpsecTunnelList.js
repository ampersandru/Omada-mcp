import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetIpsecTunnelListTool(server, client) {
    server.registerTool('getIpsecTunnelList', {
        description: 'List all site-to-site VPN (IPsec) tunnels for a site, including tunnel name, remote IP, status, and protocol details.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getIpsecTunnelList', async ({ siteId, customHeaders }) => toToolResult(await client.listSiteToSiteVpns(siteId, customHeaders))));
}
//# sourceMappingURL=getIpsecTunnelList.js.map