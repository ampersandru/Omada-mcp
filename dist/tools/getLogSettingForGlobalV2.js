import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLogSettingForGlobalV2Tool(server, client) {
    server.registerTool('getLogSettingForGlobalV2', {
        description: 'Get global log notification settings (v2), with extended notification configuration options.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getLogSettingForGlobalV2', async ({ customHeaders }) => toToolResult(await client.getLogSettingForGlobalV2(customHeaders))));
}
//# sourceMappingURL=getLogSettingForGlobalV2.js.map