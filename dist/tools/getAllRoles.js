import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAllRolesTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getAllRoles', {
        description: '[DEPRECATED] Use getUserRoleProfile instead. Same GET /roles endpoint. Get all user roles configured on the controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAllRoles', async ({ customHeaders }) => toToolResult(await client.getAllRoles(customHeaders))));
}
//# sourceMappingURL=getAllRoles.js.map