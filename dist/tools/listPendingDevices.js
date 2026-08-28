import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListPendingDevicesTool(server, client) {
    server.registerTool('listPendingDevices', {
        description: 'List devices discovered on the network but not yet adopted into this site. Returns device type, MAC, IP, and model. These are devices waiting to be provisioned.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listPendingDevices', async ({ siteId, customHeaders }) => toToolResult(await client.listPendingDevices(siteId, customHeaders))));
}
//# sourceMappingURL=listPendingDevices.js.map