import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetScheduleProfileTool(server, client) {
    server.registerTool('getScheduleProfile', {
        description: 'Get time range (schedule) profiles for a site, listing named time windows that can be applied to firewall rules and access control policies.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getScheduleProfile', async ({ siteId, customHeaders }) => toToolResult(await client.listTimeRangeProfiles(siteId, customHeaders))));
}
//# sourceMappingURL=getScheduleProfile.js.map