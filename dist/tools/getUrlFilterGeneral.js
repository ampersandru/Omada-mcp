import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetUrlFilterGeneralTool(server, client) {
    server.registerTool('getUrlFilterGeneral', {
        description: 'Get the URL filter global setting, including whether URL filtering is enabled and the default action for unmatched requests.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getUrlFilterGeneral', async ({ siteId, customHeaders }) => toToolResult(await client.getUrlFilterGeneral(siteId, customHeaders))));
}
//# sourceMappingURL=getUrlFilterGeneral.js.map