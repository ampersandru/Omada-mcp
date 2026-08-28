import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDeviceTagListTool(server, client) {
    server.registerTool('getDeviceTagList', {
        description: 'Get the list of device tags defined in a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDeviceTagList', async ({ siteId, customHeaders }) => toToolResult(await client.getDeviceTagList(siteId, customHeaders))));
}
//# sourceMappingURL=getDeviceTagList.js.map