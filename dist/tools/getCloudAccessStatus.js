import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetCloudAccessStatusTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getCloudAccessStatus', {
        description: 'Get the current cloud access status for the controller, including connection state and cloud ID.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getCloudAccessStatus', async ({ customHeaders }) => toToolResult(await client.getCloudAccessStatus(customHeaders))));
}
//# sourceMappingURL=getCloudAccessStatus.js.map