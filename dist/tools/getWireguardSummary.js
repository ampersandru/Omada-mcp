import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetWireguardSummaryTool(server, client) {
    server.registerTool('getWireguardSummary', {
        description: 'Get a summary of WireGuard VPN configurations for the site, including each WireGuard ID and name.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getWireguardSummary', async ({ siteId, customHeaders }) => toToolResult(await client.getWireguardSummary(siteId, customHeaders))));
}
//# sourceMappingURL=getWireguardSummary.js.map