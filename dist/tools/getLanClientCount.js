import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetLanClientCountTool(server, client) {
    server.registerTool('getLanClientCount', {
        description: 'Get client distribution breakdown across LAN segments (wired, wireless, guest) for the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getLanClientCount', async ({ siteId, customHeaders }) => toToolResult(await client.getLanClientCount(siteId, customHeaders))));
}
//# sourceMappingURL=getLanClientCount.js.map