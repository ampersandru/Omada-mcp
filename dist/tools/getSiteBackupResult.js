import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteBackupResultTool(server, client) {
    server.registerTool('getSiteBackupResult', {
        description: 'Get the result of the most recent backup operation for a specific site.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getSiteBackupResult', async ({ siteId, customHeaders }) => toToolResult(await client.getSiteBackupResult(siteId, customHeaders))));
}
//# sourceMappingURL=getSiteBackupResult.js.map