import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRestoreResultTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getRestoreResult', {
        description: 'Get the result of the most recent controller restore operation.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getRestoreResult', async ({ customHeaders }) => toToolResult(await client.getRestoreResult(customHeaders))));
}
//# sourceMappingURL=getRestoreResult.js.map