import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetQosMarkingRuleTool(server, client) {
    server.registerTool('getQosMarkingRule', {
        description: '[DEPRECATED] Get gateway QoS marking (tag outbound traffic) settings. This is an alias for getQosPolicy — use getQosPolicy instead.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getQosMarkingRule', async ({ siteId, customHeaders }) => toToolResult(await client.getQosPolicy(siteId, customHeaders))));
}
//# sourceMappingURL=getQosMarkingRule.js.map