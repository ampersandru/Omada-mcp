import { deviceIdSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDeviceTool(server, client) {
    server.registerTool('getDevice', {
        description: '[DEPRECATED] Use listDevices instead. Filters the site device list in-process. No dedicated per-device detail endpoint exists in the spec. Fetch detailed information for a specific Omada device.',
        inputSchema: deviceIdSchema.shape,
    }, wrapToolHandler('getDevice', async ({ deviceId, siteId, customHeaders }) => toToolResult(await client.getDevice(deviceId, siteId, customHeaders))));
}
//# sourceMappingURL=getDevice.js.map