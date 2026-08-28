import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListOsgAclsTool(server, client) {
    server.registerTool('listOsgAcls', {
        description: 'List gateway (OSG) ACL rules for a site: firewall rules controlling traffic between WAN, LAN, and guest networks. Returns rule name, action (allow/deny), source/destination, protocol, and enabled state.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listOsgAcls', async ({ siteId, customHeaders }) => toToolResult(await client.listOsgAcls(siteId, customHeaders))));
}
//# sourceMappingURL=listOsgAcls.js.map