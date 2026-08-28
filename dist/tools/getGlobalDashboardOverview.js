import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetGlobalDashboardOverviewTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getGlobalDashboardOverview', {
        description: 'Get global controller dashboard overview without client data, showing device counts, site counts, and network health summary.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getGlobalDashboardOverview', async ({ customHeaders }) => toToolResult(await client.getGlobalDashboardOverview(customHeaders))));
}
//# sourceMappingURL=getGlobalDashboardOverview.js.map