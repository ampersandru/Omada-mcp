import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerGetGridEapRuleTool(server, client) {
    server.registerTool('getGridEapRule', {
        description: 'Get the URL filter AP rules (paginated). Returns URL-based filtering rules applied to wireless clients via access points.',
        inputSchema: { ...createPaginationSchema(), ...siteInputSchema.shape },
    }, wrapToolHandler('getGridEapRule', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridEapRule(page ?? 1, pageSize ?? 10, siteId, customHeaders))));
}
//# sourceMappingURL=getGridEapRule.js.map