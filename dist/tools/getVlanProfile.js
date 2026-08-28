import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetVlanProfileTool(server, client) {
    server.registerTool('getVlanProfile', {
        description: 'Get LAN/VLAN profiles for a site, listing named VLAN configurations that can be applied to switch ports and wireless networks.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getVlanProfile', async ({ siteId, customHeaders }) => toToolResult(await client.getLanProfileList(siteId, customHeaders))));
}
//# sourceMappingURL=getVlanProfile.js.map