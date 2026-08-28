import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLanProfileListTool(server, client) {
    server.registerTool('getLanProfileList', {
        description: 'Get the list of LAN profiles configured in a site. LAN profiles define network settings that can be applied to switch ports.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getLanProfileList', async ({ siteId, customHeaders }) => toToolResult(await client.getLanProfileList(siteId, customHeaders))));
}
//# sourceMappingURL=getLanProfileList.js.map