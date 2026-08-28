import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAllLocalUsersTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getAllLocalUsers', {
        description: 'Get all local users configured on the controller, excluding the root account.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAllLocalUsers', async ({ customHeaders }) => toToolResult(await client.getAllLocalUsers(customHeaders))));
}
//# sourceMappingURL=getAllLocalUsers.js.map