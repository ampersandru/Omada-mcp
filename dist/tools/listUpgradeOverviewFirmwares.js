import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = { ...createPaginationSchema(), customHeaders: customHeadersSchema };
export function registerListUpgradeOverviewFirmwaresTool(server, client) {
    server.registerTool('listUpgradeOverviewFirmwares', {
        description: 'List firmware pool entries in the upgrade overview.',
        inputSchema,
    }, wrapToolHandler('listUpgradeOverviewFirmwares', async ({ page, pageSize, customHeaders }) => toToolResult(await client.listUpgradeOverviewFirmwares(page ?? 1, pageSize ?? 10, customHeaders))));
}
//# sourceMappingURL=listUpgradeOverviewFirmwares.js.map