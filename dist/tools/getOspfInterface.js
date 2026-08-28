import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetOspfInterfaceTool(server, client) {
    server.registerTool('getOspfInterface', {
        description: 'Get OSPF interface configuration for the site gateway.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getOspfInterface', async ({ siteId, customHeaders }) => toToolResult(await client.getOspfInterface(siteId, customHeaders))));
}
//# sourceMappingURL=getOspfInterface.js.map