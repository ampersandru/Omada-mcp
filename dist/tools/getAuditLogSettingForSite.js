import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAuditLogSettingForSiteTool(server, client) {
    server.registerTool('getAuditLogSettingForSite', {
        description: 'Get site-level audit log notification settings, including audit event recipients and filter rules.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getAuditLogSettingForSite', async ({ siteId, customHeaders }) => toToolResult(await client.getAuditLogSettingForSite(siteId, customHeaders))));
}
//# sourceMappingURL=getAuditLogSettingForSite.js.map