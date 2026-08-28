import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetRadioFrequencyPlanningConfigTool(server, client) {
    server.registerTool('getRadioFrequencyPlanningConfig', {
        description: 'Get the RF planning configuration for the site, including frequency band assignments and channel planning settings.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getRadioFrequencyPlanningConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getRadioFrequencyPlanningConfig(siteId, customHeaders))));
}
//# sourceMappingURL=getRadioFrequencyPlanningConfig.js.map