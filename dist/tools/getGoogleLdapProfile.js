import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetGoogleLdapProfileTool(server, client) {
    server.registerTool('getGoogleLdapProfile', {
        description: 'Get the Google LDAP profile configuration for a site, including domain, binding credentials, and user/group base DN settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getGoogleLdapProfile', async ({ siteId, customHeaders }) => toToolResult(await client.getGoogleLdapProfile(siteId, customHeaders))));
}
//# sourceMappingURL=getGoogleLdapProfile.js.map