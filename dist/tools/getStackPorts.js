import { stackIdSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetStackPortsTool(server, client) {
    server.registerTool('getStackPorts', {
        description: 'Get all port information for a switch stack.',
        inputSchema: stackIdSchema.shape,
    }, wrapToolHandler('getStackPorts', async ({ stackId, siteId, customHeaders }) => toToolResult(await client.getStackPorts(stackId, siteId, customHeaders))));
}
//# sourceMappingURL=getStackPorts.js.map