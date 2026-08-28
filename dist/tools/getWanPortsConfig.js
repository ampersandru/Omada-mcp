import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetWanPortsConfigTool(server, client) {
    server.registerTool('getWanPortsConfig', {
        description: 'Get WAN port settings for the site gateway. Returns per-port WAN configuration including connection type, IP settings, and MTU.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getWanPortsConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getWanPortsConfig(siteId, customHeaders))));
}
//# sourceMappingURL=getWanPortsConfig.js.map