import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetDnsProxyTool(server, client) {
    server.registerTool('getDnsProxy', {
        description: 'Get DNS proxy configuration for the site gateway. Returns DNS proxy enabled state and upstream DNS server settings.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getDnsProxy', async ({ siteId, customHeaders }) => toToolResult(await client.getDnsProxy(siteId, customHeaders))));
}
//# sourceMappingURL=getDnsProxy.js.map