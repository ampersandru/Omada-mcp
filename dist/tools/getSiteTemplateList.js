import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetSiteTemplateListTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getSiteTemplateList', {
        description: 'Get the list of all site templates configured on the controller.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getSiteTemplateList', async ({ customHeaders }) => toToolResult(await client.getSiteTemplateList(customHeaders))));
}
//# sourceMappingURL=getSiteTemplateList.js.map