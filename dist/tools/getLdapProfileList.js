import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLdapProfileListTool(server, client) {
    server.registerTool('getLdapProfileList', {
        description: 'List all LDAP authentication profiles configured on the site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getLdapProfileList', async ({ siteId, customHeaders }) => toToolResult(await client.getLdapProfileList(siteId, customHeaders))));
}
//# sourceMappingURL=getLdapProfileList.js.map