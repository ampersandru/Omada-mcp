import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLogSettingForGlobalTool(server, client) {
    server.registerTool('getLogSettingForGlobal', {
        description: 'Get global log notification settings (v1), including global alert recipients and notification rules.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getLogSettingForGlobal', async ({ customHeaders }) => toToolResult(await client.getLogSettingForGlobal(customHeaders))));
}
//# sourceMappingURL=getLogSettingForGlobal.js.map