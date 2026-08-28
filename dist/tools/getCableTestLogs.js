import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    switchMac: deviceMacSchema.describe('MAC address of the switch (e.g. "AA-BB-CC-DD-EE-FF"). Use listDevices to find switch MACs.'),
})
    .required({ switchMac: true });
export function registerGetCableTestLogsTool(server, client) {
    server.registerTool('getCableTestLogs', {
        description: 'Get cable test logs for a switch. Returns history of cable diagnostics including per-port test results, cable length estimates, and fault detection. Useful for diagnosing physical layer connectivity issues.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getCableTestLogs', async ({ switchMac, siteId, customHeaders }) => toToolResult(await client.getCableTestLogs(switchMac, siteId, customHeaders))));
}
//# sourceMappingURL=getCableTestLogs.js.map