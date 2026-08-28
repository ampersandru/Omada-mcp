import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = { ...createPaginationSchema(), customHeaders: customHeadersSchema };
export function registerGetFirmwareUpgradePlanTool(server, client) {
    server.registerTool('getFirmwareUpgradePlan', {
        description: 'Get the firmware upgrade plan list for devices managed by the controller.',
        inputSchema,
    }, wrapToolHandler('getFirmwareUpgradePlan', async ({ page, pageSize, customHeaders }) => toToolResult(await client.getFirmwareUpgradePlan(page ?? 1, pageSize ?? 10, customHeaders))));
}
//# sourceMappingURL=getFirmwareUpgradePlan.js.map