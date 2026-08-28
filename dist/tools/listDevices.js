import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListDevicesTool(server, client) {
    server.registerTool('listDevices', {
        description: 'List all provisioned (adopted) network devices in a site: gateways, switches, and access points. Returns MAC address, model, firmware version, IP, uptime, CPU/memory usage, and status for each device. Use MAC addresses from this response as input to getGatewayDetail, getSwitchDetail, getApDetail, etc.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listDevices', async ({ siteId, customHeaders }) => toToolResult(await client.listDevices(siteId, customHeaders))));
}
//# sourceMappingURL=listDevices.js.map