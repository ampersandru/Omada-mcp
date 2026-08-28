import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetGeneralSettingsTool(server, client) {
    server.registerTool('getGeneralSettings', {
        description: 'Get the global general settings for the Omada controller, including controller name, language, and discovery options.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getGeneralSettings', async ({ customHeaders }) => toToolResult(await client.getGeneralSettings(customHeaders))));
}
//# sourceMappingURL=getGeneralSettings.js.map