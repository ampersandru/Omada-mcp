import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardMostActiveEapsTool(server, client) {
    server.registerTool('getDashboardMostActiveEaps', {
        description: 'Get the most active access points (EAPs) in a site, sorted by traffic volume.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardMostActiveEaps', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardMostActiveEaps(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardMostActiveEaps.js.map