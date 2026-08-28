import { clientIdSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetClientTool(server, client) {
    server.registerTool('getClient', {
        description: '[DEPRECATED] Use listClients instead. When you have a client MAC, getClientDetail is also available. This tool filters the site client list in-process to emulate a per-client lookup. Fetch details for a specific Omada client.',
        inputSchema: clientIdSchema.shape,
    }, wrapToolHandler('getClient', async ({ clientId, siteId, customHeaders }) => toToolResult(await client.getClient(clientId, siteId, customHeaders))));
}
//# sourceMappingURL=getClient.js.map