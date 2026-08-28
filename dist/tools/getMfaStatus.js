import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMfaStatusTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getMfaStatus', {
        description: 'Get the global multi-factor authentication (MFA) status for the controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getMfaStatus', async ({ customHeaders }) => toToolResult(await client.getMfaStatus(customHeaders))));
}
//# sourceMappingURL=getMfaStatus.js.map