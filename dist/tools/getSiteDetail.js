import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteDetailTool(server, client) {
    server.registerTool('getSiteDetail', {
        description: 'Get detailed information about a site, including name, region, timezone, and configuration settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteDetail', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteDetail(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteDetail.js.map