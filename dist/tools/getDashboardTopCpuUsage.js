import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardTopCpuUsageTool(server, client) {
    server.registerTool('getDashboardTopCpuUsage', {
        description: 'Get the top devices by CPU usage for a site, useful for identifying overloaded devices.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardTopCpuUsage', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardTopCpuUsage(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardTopCpuUsage.js.map