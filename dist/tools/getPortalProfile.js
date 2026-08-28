import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetPortalProfileTool(server, client) {
    server.registerTool('getPortalProfile', {
        description: 'Get portal (captive portal) profiles for a site, listing configured hotspot portals with authentication methods and customization settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getPortalProfile', async ({ siteId, customHeaders }) => toToolResult(await client.getPortalProfile(siteId, customHeaders))));
}
//# sourceMappingURL=getPortalProfile.js.map