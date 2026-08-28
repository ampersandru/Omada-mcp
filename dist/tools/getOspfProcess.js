import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetOspfProcessTool(server, client) {
    server.registerTool('getOspfProcess', {
        description: 'Get OSPF process configuration for the site gateway.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getOspfProcess', async ({ siteId, customHeaders }) => toToolResult(await client.getOspfProcess(siteId, customHeaders))));
}
//# sourceMappingURL=getOspfProcess.js.map