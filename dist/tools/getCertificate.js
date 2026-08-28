import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetCertificateTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getCertificate', {
        description: 'Get the SSL/TLS certificate configuration for the controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getCertificate', async ({ customHeaders }) => toToolResult(await client.getCertificate(customHeaders))));
}
//# sourceMappingURL=getCertificate.js.map