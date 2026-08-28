import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMulticastRateLimitTool(server, client) {
    server.registerTool('getMulticastRateLimit', {
        description: 'Get multicast rate limit settings for a site, controlling multicast traffic rates on the wireless network.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getMulticastRateLimit', async ({ siteId, customHeaders }) => toToolResult(await client.getMulticastRateLimit(siteId, customHeaders))));
}
//# sourceMappingURL=getMulticastRateLimit.js.map