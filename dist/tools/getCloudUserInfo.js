import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetCloudUserInfoTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getCloudUserInfo', {
        description: 'Get cloud user account information for the currently authenticated cloud user.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getCloudUserInfo', async ({ customHeaders }) => toToolResult(await client.getCloudUserInfo(customHeaders))));
}
//# sourceMappingURL=getCloudUserInfo.js.map