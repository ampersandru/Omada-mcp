import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListSiteToSiteVpnsTool(server, client) {
    server.registerTool('listSiteToSiteVpns', {
        description: 'List site-to-site VPN configurations: tunnel name, remote IP, status, protocol (IPsec/OpenVPN/WireGuard), and local/remote subnets.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listSiteToSiteVpns', async ({ siteId, customHeaders }) => toToolResult(await client.listSiteToSiteVpns(siteId, customHeaders))));
}
//# sourceMappingURL=listSiteToSiteVpns.js.map