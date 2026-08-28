import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetApplicationControlStatusTool(server, client) {
    server.registerTool('getApplicationControlStatus', {
        description: 'Get application control (DPI) status and configuration for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getApplicationControlStatus', async ({ siteId, customHeaders }) => toToolResult(await client.getApplicationControlStatus(siteId, customHeaders))));
}
//# sourceMappingURL=getApplicationControlStatus.js.map