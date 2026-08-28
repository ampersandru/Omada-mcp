import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetAttackDefenseSettingTool(server, client) {
    server.registerTool('getAttackDefenseSetting', {
        description: 'Get the DDoS and attack defense configuration, including flood protection settings and thresholds.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getAttackDefenseSetting', async ({ siteId, customHeaders }) => toToolResult(await client.getAttackDefenseSetting(siteId, customHeaders))));
}
//# sourceMappingURL=getAttackDefenseSetting.js.map