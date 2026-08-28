import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRadiusServerTool(server, client) {
    server.registerTool('getRadiusServer', {
        description: 'Get the global RADIUS server configuration for the controller.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getRadiusServer', async ({ customHeaders }) => toToolResult(await client.getRadiusServer(customHeaders))));
}
//# sourceMappingURL=getRadiusServer.js.map