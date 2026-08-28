import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetUiInterfaceTool(server, client) {
    server.registerTool('getUiInterface', {
        description: 'Get the UI interface settings for the controller, including timeout and session options.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getUiInterface', async ({ customHeaders }) => toToolResult(await client.getUiInterface(customHeaders))));
}
//# sourceMappingURL=getUiInterface.js.map