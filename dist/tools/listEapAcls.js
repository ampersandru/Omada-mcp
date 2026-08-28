import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListEapAclsTool(server, client) {
    server.registerTool('listEapAcls', {
        description: 'List EAP (access point) ACL rules for a site: wireless client access control rules. Returns rule name, action (allow/deny), SSID scope, source/destination, protocol, and enabled state.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listEapAcls', async ({ siteId, customHeaders }) => toToolResult(await client.listEapAcls(siteId, customHeaders))));
}
//# sourceMappingURL=listEapAcls.js.map