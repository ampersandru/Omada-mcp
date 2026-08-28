import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetStaticRoutingInterfaceListTool(server, client) {
    server.registerTool('getStaticRoutingInterfaceList', {
        description: 'Get the list of available interfaces for static routing. Use this to discover valid next-hop interface names when configuring static routes.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getStaticRoutingInterfaceList', async ({ siteId, customHeaders }) => toToolResult(await client.getStaticRoutingInterfaceList(siteId, customHeaders))));
}
//# sourceMappingURL=getStaticRoutingInterfaceList.js.map