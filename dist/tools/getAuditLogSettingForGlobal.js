import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAuditLogSettingForGlobalTool(server, client) {
    server.registerTool('getAuditLogSettingForGlobal', {
        description: 'Get global audit log notification settings for the controller.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getAuditLogSettingForGlobal', async ({ customHeaders }) => toToolResult(await client.getAuditLogSettingForGlobal(customHeaders))));
}
//# sourceMappingURL=getAuditLogSettingForGlobal.js.map