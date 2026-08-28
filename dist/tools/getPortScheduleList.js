import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetPortScheduleListTool(server, client) {
    server.registerTool('getPortScheduleList', {
        description: 'Get the list of port schedules configured for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getPortScheduleList', async ({ siteId, customHeaders }) => toToolResult(await client.getPortScheduleList(siteId, customHeaders))));
}
//# sourceMappingURL=getPortScheduleList.js.map