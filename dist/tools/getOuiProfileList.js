import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerGetOuiProfileListTool(server, client) {
    server.registerTool('getOuiProfileList', {
        description: 'Get the OUI-based device profile list (paginated). OUI profiles associate device manufacturers with network policies based on the first 3 bytes of the MAC address.',
        inputSchema: { ...createPaginationSchema(), ...siteInputSchema.shape },
    }, wrapToolHandler('getOuiProfileList', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getOuiProfileList(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=getOuiProfileList.js.map