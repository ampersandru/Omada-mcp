import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetDisableNatListTool(server, client) {
    server.registerTool('getDisableNatList', {
        description: 'Get the list of wired networks with NAT disabled for the site gateway.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getDisableNatList', async ({ siteId, page, pageSize, customHeaders }) => toToolResult(await client.getDisableNatList(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=getDisableNatList.js.map