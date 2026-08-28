import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetLoggingTool(server, client) {
    server.registerTool('getLogging', {
        description: 'Get the controller logging configuration, including log levels and storage settings.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getLogging', async ({ customHeaders }) => toToolResult(await client.getLogging(customHeaders))));
}
//# sourceMappingURL=getLogging.js.map