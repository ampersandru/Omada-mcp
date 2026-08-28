import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerDisableClientRateLimitTool(server, client) {
    const inputSchema = siteInputSchema.extend({
        clientMac: z.string().min(1, 'clientMac (MAC address) is required'),
    });
    server.registerTool('disableClientRateLimit', {
        description: 'Disable rate limiting for a specific client, removing any bandwidth restrictions.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('disableClientRateLimit', async ({ clientMac, siteId, customHeaders }) => toToolResult(await client.disableClientRateLimit(clientMac, siteId, customHeaders))));
}
//# sourceMappingURL=disableClientRateLimit.js.map