import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerGetGridSignatureTool(server, client) {
    server.registerTool('getGridSignature', {
        description: 'Get the IPS signature list (paginated). Returns known attack signatures used by the Intrusion Prevention System for traffic inspection.',
        inputSchema: { ...createPaginationSchema(), ...siteInputSchema.shape },
    }, wrapToolHandler('getGridSignature', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridSignature(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=getGridSignature.js.map