import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = z.object({
    page: z.number().int().min(1).default(1).describe('Page number (1-based).'),
    pageSize: z.number().int().min(1).max(1000).default(10).describe('Number of results per page (1–1000).'),
    ...siteInputSchema.shape,
});
export function registerGetUrlFilterRulesTool(server, client) {
    server.registerTool('getUrlFilterRules', {
        description: 'Get gateway URL filter rules for a site (paginated), listing URL-based allow/block rules applied on the gateway.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getUrlFilterRules', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getGridGatewayRule(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getUrlFilterRules.js.map