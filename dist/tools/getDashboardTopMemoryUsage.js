import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDashboardTopMemoryUsageTool(server, client) {
    server.registerTool('getDashboardTopMemoryUsage', {
        description: 'Get the top devices by memory usage for a site, useful for identifying memory-constrained devices.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDashboardTopMemoryUsage', async ({ siteId, customHeaders }) => toToolResult(await client.getDashboardTopMemoryUsage(siteId, customHeaders))));
}
//# sourceMappingURL=getDashboardTopMemoryUsage.js.map