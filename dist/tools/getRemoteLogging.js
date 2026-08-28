import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRemoteLoggingTool(server, client) {
    server.registerTool('getRemoteLogging', {
        description: 'Get the global syslog/remote logging configuration, including syslog server address and log level.',
        inputSchema: z.object({ customHeaders: customHeadersSchema }).shape,
    }, wrapToolHandler('getRemoteLogging', async ({ customHeaders }) => toToolResult(await client.getRemoteLogging(customHeaders))));
}
//# sourceMappingURL=getRemoteLogging.js.map