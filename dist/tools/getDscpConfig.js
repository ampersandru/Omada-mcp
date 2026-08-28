import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetDscpConfigTool(server, client) {
    server.registerTool('getDscpConfig', {
        description: '[DEPRECATED] Get DSCP/QoS tag outbound traffic configuration. This is an alias for getQosPolicy — use getQosPolicy instead.',
        inputSchema: siteInputSchema.shape,
    }, wrapToolHandler('getDscpConfig', async ({ siteId, customHeaders }) => toToolResult(await client.getQosPolicy(siteId, customHeaders))));
}
//# sourceMappingURL=getDscpConfig.js.map