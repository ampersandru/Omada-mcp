import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetClientHistoryDataEnableTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getClientHistoryDataEnable', {
        description: 'Get the client history data collection enable/disable setting for the controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getClientHistoryDataEnable', async ({ customHeaders }) => toToolResult(await client.getClientHistoryDataEnable(customHeaders))));
}
//# sourceMappingURL=getClientHistoryDataEnable.js.map