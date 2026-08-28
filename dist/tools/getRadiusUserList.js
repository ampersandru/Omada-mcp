import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
export function registerGetRadiusUserListTool(server, client) {
    const inputSchema = z.object({
        ...createPaginationSchema(),
        sortUsername: z
            .enum(['asc', 'desc'])
            .optional()
            .describe('Sort direction for username field. Values: "asc" (ascending) or "desc" (descending).'),
        ...siteInputSchema.shape,
    });
    server.registerTool('getRadiusUserList', {
        description: 'List local RADIUS server users (paginated). Returns users configured in the built-in RADIUS server on the site, including username and access permissions.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getRadiusUserList', async ({ page, pageSize, sortUsername, siteId, customHeaders }) => toToolResult(await client.getRadiusUserList(page ?? 1, pageSize ?? 10, sortUsername, siteId, customHeaders))));
}
//# sourceMappingURL=getRadiusUserList.js.map