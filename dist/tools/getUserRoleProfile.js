import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = z.object({
    customHeaders: customHeadersSchema.describe('Optional HTTP headers to include in the Omada API request (e.g. {"X-Custom-Header": "value"}). Rarely needed.'),
});
export function registerGetUserRoleProfileTool(server, client) {
    server.registerTool('getUserRoleProfile', {
        description: 'Get user role profiles from the controller, listing defined roles with associated permissions for administrator accounts.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getUserRoleProfile', async ({ customHeaders }) => toToolResult(await client.getUserRoleProfile(customHeaders))));
}
//# sourceMappingURL=getUserRoleProfile.js.map