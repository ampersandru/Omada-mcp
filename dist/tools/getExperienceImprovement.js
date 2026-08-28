import { z } from 'zod';
import { customHeadersSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetExperienceImprovementTool(server, client) {
    const inputSchema = z.object({ customHeaders: customHeadersSchema });
    server.registerTool('getExperienceImprovement', {
        description: 'Get the experience improvement program setting for the controller (telemetry/diagnostics participation).',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getExperienceImprovement', async ({ customHeaders }) => toToolResult(await client.getExperienceImprovement(customHeaders))));
}
//# sourceMappingURL=getExperienceImprovement.js.map