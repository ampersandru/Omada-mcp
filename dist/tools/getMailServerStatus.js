import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMailServerStatusTool(server, client) {
    server.registerTool('getMailServerStatus', {
        description: 'Get the mail server connection status for the controller.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getMailServerStatus', async ({ customHeaders }) => toToolResult(await client.getMailServerStatus(customHeaders))));
}
//# sourceMappingURL=getMailServerStatus.js.map