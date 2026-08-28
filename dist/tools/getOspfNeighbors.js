import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetOspfNeighborsTool(server, client) {
    server.registerTool('getOspfNeighbors', {
        description: 'Get OSPF neighbor devices for the site gateway.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getOspfNeighbors', async ({ siteId, customHeaders }) => toToolResult(await client.getOspfNeighbors(siteId, customHeaders))));
}
//# sourceMappingURL=getOspfNeighbors.js.map