import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetPortalPortTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getPortalPort', {
        description: 'Get the portal port configuration for the controller web interface.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getPortalPort', async ({ customHeaders }) => toToolResult(await client.getPortalPort(customHeaders))));
}
//# sourceMappingURL=getPortalPort.js.map