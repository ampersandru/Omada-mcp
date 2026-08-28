import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetIpsConfigTool(server, client) {
    server.registerTool('getIpsConfig', {
        description: 'Get the IPS (Intrusion Prevention System) global configuration, including enabled state and detection mode.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getIpsConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getIpsConfig(siteId, customHeaders))));
}
//# sourceMappingURL=getIpsConfig.js.map