import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    deviceMac: deviceMacSchema.describe('MAC address of the device (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find device MACs.'),
})
    .required({ deviceMac: true });
export function registerGetFirmwareInfoTool(server, client) {
    server.registerTool('getFirmwareInfo', {
        description: 'Get the latest available firmware information for a device. Returns current firmware version, latest available version, and whether an upgrade is available. Use listDevices to get deviceMac values.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getFirmwareInfo', async ({ deviceMac, siteId, customHeaders }) => toToolResult(await client.getFirmwareInfo(deviceMac, siteId, customHeaders))));
}
//# sourceMappingURL=getFirmwareInfo.js.map