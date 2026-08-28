import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = { customHeaders: customHeadersSchema };
export function registerGetSyslogConfigTool(server, client) {
    server.registerTool('getSyslogConfig', {
        description: '[DEPRECATED] Alias for `getRemoteLogging`. Get global controller syslog/remote logging configuration. This is a controller-level setting and does not require a site ID. Prefer using the `getRemoteLogging` tool.',
        inputSchema,
    }, wrapToolHandler('getSyslogConfig', async ({ customHeaders }) => toToolResult(await client.getRemoteLogging(customHeaders))));
}
//# sourceMappingURL=getSyslogConfig.js.map