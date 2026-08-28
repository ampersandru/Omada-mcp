import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDeviceAccessManagementTool(server, client) {
    server.registerTool('getDeviceAccessManagement', {
        description: 'Get the device access management settings, controlling which devices can be managed.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getDeviceAccessManagement', async ({ customHeaders }) => toToolResult(await client.getDeviceAccessManagement(customHeaders))));
}
//# sourceMappingURL=getDeviceAccessManagement.js.map