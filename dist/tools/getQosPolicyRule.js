import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetQosPolicyRuleTool(server, client) {
    server.registerTool('getQosPolicyRule', {
        description: '[DEPRECATED] Get gateway QoS policy settings. This is an alias for getQosPolicy — use getQosPolicy instead.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getQosPolicyRule', async ({ siteId, customHeaders }) => toToolResult(await client.getQosPolicy(siteId, customHeaders))));
}
//# sourceMappingURL=getQosPolicyRule.js.map