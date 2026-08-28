import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAppGroupProfileTool(server, client) {
    server.registerTool('getAppGroupProfile', {
        description: '[DEPRECATED] Get MAC group profiles for a site. This is an alias for getGroupPolicyDetail with groupType="2" — use getGroupPolicyDetail instead.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getAppGroupProfile', async ({ siteId, customHeaders }) => toToolResult(await client.getGroupProfilesByType('2', siteId, customHeaders))));
}
//# sourceMappingURL=getAppGroupProfile.js.map