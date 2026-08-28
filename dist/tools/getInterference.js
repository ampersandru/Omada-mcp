import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetInterferenceTool(server, client) {
    server.registerTool('getInterference', {
        description: 'Get top RF interference sources detected by APs. Identifies nearby networks or devices causing wireless interference on each channel. Useful for diagnosing poor WiFi performance caused by external RF environment.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getInterference', async ({ siteId, customHeaders }) => toToolResult(await client.getInterference(siteId, customHeaders))));
}
//# sourceMappingURL=getInterference.js.map