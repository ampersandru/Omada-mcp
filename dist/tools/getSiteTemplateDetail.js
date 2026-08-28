import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteTemplateDetailTool(server, client) {
    const inputSchema = z.object({
        siteTemplateId: z.string().min(1).describe('The ID of the site template to retrieve.'),
        customHeaders: customHeadersSchema,
    });
    server.registerTool('getSiteTemplateDetail', {
        description: 'Get detailed information about a specific site template by its ID.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSiteTemplateDetail', async ({ siteTemplateId, customHeaders }) => toToolResult(await client.getSiteTemplateDetail(siteTemplateId, customHeaders))));
}
//# sourceMappingURL=getSiteTemplateDetail.js.map