import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetPastClientNumTool(server, client) {
    const inputSchema = z.object({
        start: z.number().int().describe('Start of the time range as Unix epoch seconds.'),
        end: z.number().int().describe('End of the time range as Unix epoch seconds.'),
        ...siteInputSchema.shape,
    });
    server.registerTool('getPastClientNum', {
        description: 'Get historical client count trend over a time range. Returns a time-series of client counts to show how connected devices changed over the specified period. Requires start and end as Unix epoch seconds.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getPastClientNum', async ({ start, end, siteId, customHeaders }) => toToolResult(await client.getPastClientNum(start, end, siteId, customHeaders))));
}
//# sourceMappingURL=getPastClientNum.js.map