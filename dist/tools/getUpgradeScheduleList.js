import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetUpgradeScheduleListTool(server, client) {
    server.registerTool('getUpgradeScheduleList', {
        description: 'Get the list of firmware upgrade schedules configured for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getUpgradeScheduleList', async ({ siteId, customHeaders }) => toToolResult(await client.getUpgradeScheduleList(siteId, customHeaders))));
}
//# sourceMappingURL=getUpgradeScheduleList.js.map