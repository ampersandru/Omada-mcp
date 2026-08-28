import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = { customHeaders: customHeadersSchema };
export function registerGetUpgradeOverviewCriticalTool(server, client) {
    server.registerTool('getUpgradeOverviewCritical', {
        description: 'Get the number of critical firmware upgrades available across managed devices.',
        inputSchema,
    }, wrapToolHandler('getUpgradeOverviewCritical', async ({ customHeaders }) => toToolResult(await client.getUpgradeOverviewCritical(customHeaders))));
}
//# sourceMappingURL=getUpgradeOverviewCritical.js.map