import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRemoteBindingStatusTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getRemoteBindingStatus', {
        description: 'Get the remote binding status between the controller and cloud service.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getRemoteBindingStatus', async ({ customHeaders }) => toToolResult(await client.getRemoteBindingStatus(customHeaders))));
}
//# sourceMappingURL=getRemoteBindingStatus.js.map