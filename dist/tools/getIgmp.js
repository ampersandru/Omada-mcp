import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetIgmpTool(server, client) {
    server.registerTool('getIgmp', {
        description: 'Get IGMP (Internet Group Management Protocol) setting for the site. Shows IGMP snooping and proxy configuration for multicast traffic.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getIgmp', async ({ siteId, customHeaders }) => toToolResult(await client.getIgmp(siteId, customHeaders))));
}
//# sourceMappingURL=getIgmp.js.map