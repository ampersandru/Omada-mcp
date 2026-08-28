import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListRadiusProfilesTool(server, client) {
    server.registerTool('listRadiusProfiles', {
        description: 'List RADIUS authentication profiles configured for a site: server IP, port, and profile name. Used by SSIDs for WPA-Enterprise / 802.1X authentication.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listRadiusProfiles', async ({ siteId, customHeaders }) => toToolResult(await client.listRadiusProfiles(siteId, customHeaders))));
}
//# sourceMappingURL=listRadiusProfiles.js.map