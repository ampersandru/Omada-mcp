import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = { ...createPaginationSchema(), customHeaders: customHeadersSchema };
export function registerListUpgradeFirmwaresTool(server, client) {
    server.registerTool('listUpgradeFirmwares', {
        description: 'List uploaded firmware files available for manual upgrade.',
        inputSchema,
    }, wrapToolHandler('listUpgradeFirmwares', async ({ page, pageSize, customHeaders }) => toToolResult(await client.listUpgradeFirmwares(page ?? 1, pageSize ?? 10, customHeaders))));
}
//# sourceMappingURL=listUpgradeFirmwares.js.map