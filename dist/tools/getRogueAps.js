import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRogueApsTool(server, client) {
    server.registerTool('getRogueAps', {
        description: 'Get the list of rogue (unauthorized) access points detected by WIDS in a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getRogueAps', async ({ siteId, customHeaders }) => toToolResult(await client.getRogueAps(siteId, customHeaders))));
}
//# sourceMappingURL=getRogueAps.js.map