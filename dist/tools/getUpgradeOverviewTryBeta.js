import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = { customHeaders: customHeadersSchema };
export function registerGetUpgradeOverviewTryBetaTool(server, client) {
    server.registerTool('getUpgradeOverviewTryBeta', {
        description: 'Get the try-beta firmware switch status for the controller.',
        inputSchema,
    }, wrapToolHandler('getUpgradeOverviewTryBeta', async ({ customHeaders }) => toToolResult(await client.getUpgradeOverviewTryBeta(customHeaders))));
}
//# sourceMappingURL=getUpgradeOverviewTryBeta.js.map