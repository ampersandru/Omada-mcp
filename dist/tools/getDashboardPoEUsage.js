import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardPoEUsageTool(server, client) {
    server.registerTool('getDashboardPoEUsage', {
        description: 'Get PoE (Power over Ethernet) usage statistics for a site, showing power consumption per switch.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardPoEUsage', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardPoEUsage(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardPoEUsage.js.map