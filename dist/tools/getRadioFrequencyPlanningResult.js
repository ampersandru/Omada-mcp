import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRadioFrequencyPlanningResultTool(server, client) {
    server.registerTool('getRadioFrequencyPlanningResult', {
        description: 'Get the RF planning result for the site. Returns computed channel/power assignments based on the current RF environment.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getRadioFrequencyPlanningResult', async ({ siteId, customHeaders }) => toToolResult(await client.getRadioFrequencyPlanningResult(siteId, customHeaders))));
}
//# sourceMappingURL=getRadioFrequencyPlanningResult.js.map