import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListMdnsProfileTool(server, client) {
    server.registerTool('listMdnsProfile', {
        description: 'List all Bonjour/mDNS service profiles configured on the site for cross-VLAN service discovery.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listMdnsProfile', async ({ siteId, customHeaders }) => toToolResult(await client.listMdnsProfile(siteId, customHeaders))));
}
//# sourceMappingURL=listMdnsProfile.js.map