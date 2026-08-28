import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListMostActiveClientsTool(server, client) {
    server.registerTool('listMostActiveClients', {
        description: 'Get the most active clients in a site, sorted by total traffic. Returns client name, MAC address, type, model, wireless status, and total traffic. This is a dashboard endpoint that provides a quick overview of top clients by traffic usage.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listMostActiveClients', async ({ siteId, customHeaders }) => toToolResult(await client.listMostActiveClients(siteId, customHeaders))));
}
//# sourceMappingURL=listMostActiveClients.js.map