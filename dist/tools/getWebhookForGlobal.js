import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetWebhookForGlobalTool(server, client) {
    server.registerTool('getWebhookForGlobal', {
        description: 'Get the global webhook notification settings, including webhook URL and enabled event types.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getWebhookForGlobal', async ({ customHeaders }) => toToolResult(await client.getWebhookForGlobal(customHeaders))));
}
//# sourceMappingURL=getWebhookForGlobal.js.map