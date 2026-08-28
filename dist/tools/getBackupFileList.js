import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetBackupFileListTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getBackupFileList', {
        description: 'Get the list of available controller backup files.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getBackupFileList', async ({ customHeaders }) => toToolResult(await client.getBackupFileList(customHeaders))));
}
//# sourceMappingURL=getBackupFileList.js.map