import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetVrrpConfigTool(server, client) {
    server.registerTool('getVrrpConfig', {
        description: 'Get VRRP (Virtual Router Redundancy Protocol) configuration for OSW devices on the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getVrrpConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getVrrpConfig(siteId, customHeaders))));
}
//# sourceMappingURL=getVrrpConfig.js.map