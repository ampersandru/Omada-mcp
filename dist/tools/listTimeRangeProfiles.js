import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerListTimeRangeProfilesTool(server, client) {
    server.registerTool('listTimeRangeProfiles', {
        description: 'List time range profiles configured for a site. These are named schedules (e.g. "Business Hours", "Weekends") used by ACL rules, port schedules, and other time-based policies.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('listTimeRangeProfiles', async ({ siteId, customHeaders }) => toToolResult(await client.listTimeRangeProfiles(siteId, customHeaders))));
}
//# sourceMappingURL=listTimeRangeProfiles.js.map