import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAppControlCategoriesTool(server, client) {
    server.registerTool('getAppControlCategories', {
        description: 'Get application control categories (families) for a site, listing available app category definitions used in application control rules.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getAppControlCategories', async ({ siteId, customHeaders }) => toToolResult(await client.getAppControlCategories(siteId, customHeaders))));
}
//# sourceMappingURL=getAppControlCategories.js.map