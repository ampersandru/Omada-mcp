import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteSpecificationTool(server, client) {
    server.registerTool('getSiteSpecification', {
        description: 'Get site specification including device limits, feature capabilities, and hardware constraints.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteSpecification', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteSpecification(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteSpecification.js.map