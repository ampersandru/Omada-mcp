import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAllCloudUsersTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getAllCloudUsers', {
        description: 'Get all cloud users configured on the controller, excluding the root account.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAllCloudUsers', async ({ customHeaders }) => toToolResult(await client.getAllCloudUsers(customHeaders))));
}
//# sourceMappingURL=getAllCloudUsers.js.map