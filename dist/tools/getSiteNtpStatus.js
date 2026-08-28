import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteNtpStatusTool(server, client) {
    server.registerTool('getSiteNtpStatus', {
        description: 'Get NTP server status and configuration for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteNtpStatus', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteNtpStatus(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteNtpStatus.js.map