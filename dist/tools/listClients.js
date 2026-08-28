import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListClientsTool(server, client) {
    server.registerTool('listClients', {
        description: 'List all network clients (wired and wireless) connected to a site. Returns client details including MAC address, IP, hostname, connected device, SSID (for wireless), signal strength, download/upload traffic, and online status. Use this to audit connected devices or find a specific client by name or MAC.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listClients', async ({ siteId, customHeaders }) => toToolResult(await client.listClients(siteId, customHeaders))));
}
//# sourceMappingURL=listClients.js.map