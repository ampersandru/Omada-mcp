import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetInternetInfoTool(server, client) {
    server.registerTool('getInternetInfo', {
        description: 'Get internet configuration information for a site, including WAN settings and connectivity details.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getInternetInfo', async ({ siteId, customHeaders }) => toToolResult(await client.getInternetInfo(siteId, customHeaders))));
}
//# sourceMappingURL=getInternetInfo.js.map