import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetBackupResultTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getBackupResult', {
        description: 'Get the result of the most recent controller backup operation.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getBackupResult', async ({ customHeaders }) => toToolResult(await client.getBackupResult(customHeaders))));
}
//# sourceMappingURL=getBackupResult.js.map