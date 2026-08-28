import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAvailableRolesTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getAvailableRoles', {
        description: 'Get the list of roles available for assignment to users.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAvailableRoles', async ({ customHeaders }) => toToolResult(await client.getAvailableRoles(customHeaders))));
}
//# sourceMappingURL=getAvailableRoles.js.map