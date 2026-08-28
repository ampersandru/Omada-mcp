import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetWidsBlacklistTool(server, client) {
    server.registerTool('getWidsBlacklist', {
        description: 'Get the WIPS (Wireless Intrusion Prevention System) rogue AP blacklist for a site. Returns the list of access points that have been manually blacklisted.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getWidsBlacklist', async ({ siteId, customHeaders }) => toToolResult(await client.getWidsBlacklist(siteId, customHeaders))));
}
//# sourceMappingURL=getWidsBlacklist.js.map