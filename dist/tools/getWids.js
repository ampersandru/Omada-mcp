import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetWidsTool(server, client) {
    server.registerTool('getWids', {
        description: 'Get Wireless Intrusion Detection System (WIDS) information for a site, including detected attacks and rogue devices.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getWids', async ({ siteId, customHeaders }) => toToolResult(await client.getWids(siteId, customHeaders))));
}
//# sourceMappingURL=getWids.js.map