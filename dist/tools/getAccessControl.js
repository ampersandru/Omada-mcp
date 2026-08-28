import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema.extend({
    customHeaders: customHeadersSchema,
});
export function registerGetAccessControlTool(server, client) {
    server.registerTool('getAccessControl', {
        description: 'Get portal access control configuration, including pre-auth access policies and free-auth client policies.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getAccessControl', async ({ siteId, customHeaders }) => toToolResult(await client.getAccessControl(siteId, customHeaders))));
}
//# sourceMappingURL=getAccessControl.js.map