import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetPortSchedulePortsTool(server, client) {
    server.registerTool('getPortSchedulePorts', {
        description: 'Get the list of ports with port schedule assignments for a site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getPortSchedulePorts', async ({ siteId, customHeaders }) => toToolResult(await client.getPortSchedulePorts(siteId, customHeaders))));
}
//# sourceMappingURL=getPortSchedulePorts.js.map