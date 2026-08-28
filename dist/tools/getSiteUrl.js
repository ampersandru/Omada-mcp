import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteUrlTool(server, client) {
    server.registerTool('getSiteUrl', {
        description: 'Get the URL associated with a site for OpenAPI access.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteUrl', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteUrl(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteUrl.js.map