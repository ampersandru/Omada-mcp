import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetMeshSettingTool(server, client) {
    server.registerTool('getMeshSetting', {
        description: 'Get the mesh networking configuration including mesh topology mode and uplink preferences.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getMeshSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getMeshSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getMeshSetting.js.map