import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetWanLanStatusTool(server, client) {
    server.registerTool('getWanLanStatus', {
        description: 'Get the WAN and LAN connectivity status for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getWanLanStatus', async ({ siteId, customHeaders }) => toToolResult(await client.getWanLanStatus(siteId, customHeaders))));
}
//# sourceMappingURL=getWanLanStatus.js.map