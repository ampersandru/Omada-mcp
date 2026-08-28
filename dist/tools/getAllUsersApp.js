import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAllUsersAppTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getAllUsersApp', {
        description: 'Get all users (both cloud and local) in a grid/app view format.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAllUsersApp', async ({ customHeaders }) => toToolResult(await client.getAllUsersApp(customHeaders))));
}
//# sourceMappingURL=getAllUsersApp.js.map