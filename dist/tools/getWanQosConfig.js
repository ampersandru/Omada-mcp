import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetWanQosConfigTool(server, client) {
    server.registerTool('getWanQosConfig', {
        description: 'Get QoS configuration for gateway WAN ports on the site.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getWanQosConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getWanQosConfig(siteId, customHeaders))));
}
//# sourceMappingURL=getWanQosConfig.js.map