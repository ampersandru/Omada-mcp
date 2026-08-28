import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetQosProfileTool(server, client) {
    server.registerTool('getQosProfile', {
        description: 'Get rate limit profiles for a site, listing bandwidth limit configurations that can be applied to clients.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getQosProfile', async ({ siteId, customHeaders }) => toToolResult(await client.getRateLimitProfiles(siteId, customHeaders))));
}
//# sourceMappingURL=getQosProfile.js.map