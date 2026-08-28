import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetControllerPortTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getControllerPort', {
        description: 'Get the controller port configuration used for device adoption and communication.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getControllerPort', async ({ customHeaders }) => toToolResult(await client.getControllerPort(customHeaders))));
}
//# sourceMappingURL=getControllerPort.js.map