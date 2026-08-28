import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetControllerStatusTool(server, client) {
    server.registerTool('getControllerStatus', {
        description: 'Get the Omada controller health and status, including running state, uptime, and resource usage.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getControllerStatus', async ({ customHeaders }) => toToolResult(await client.getControllerStatus(customHeaders))));
}
//# sourceMappingURL=getControllerStatus.js.map