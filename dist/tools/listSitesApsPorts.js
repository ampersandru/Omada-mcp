import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    apMac: deviceMacSchema.describe('MAC address of the access point (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find AP MACs.'),
})
    .required({ apMac: true });
export function registerListSitesApsPortsTool(server, client) {
    server.registerTool('listSitesApsPorts', {
        description: 'List ports on an AP.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('listSitesApsPorts', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.listSitesApsPorts(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=listSitesApsPorts.js.map