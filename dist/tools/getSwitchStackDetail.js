import { stackIdSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSwitchStackDetailTool(server, client) {
    server.registerTool('getSwitchStackDetail', {
        description: 'Fetch detailed information for a specific switch stack.',
        inputSchema: stackIdSchema.shape,
    }, wrapToolHandler('getSwitchStackDetail', async ({ stackId, siteId, customHeaders }) => toToolResult(await client.getSwitchStackDetail(stackId, siteId, customHeaders))));
}
//# sourceMappingURL=getSwitchStackDetail.js.map