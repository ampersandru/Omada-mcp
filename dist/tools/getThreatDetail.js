import { z } from 'zod';
import { siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetThreatDetailTool(server, client) {
    const inputSchema = z.object({
        threatId: z.string().describe('The unique ID of the threat to retrieve details for.'),
        time: z.number().int().describe('Required timestamp (Unix epoch seconds, e.g. 1682000000) to scope the threat lookup.'),
        ...siteInputSchema.shape,
    });
    server.registerTool('getThreatDetail', {
        description: 'Get detailed information about a specific IPS threat event by its ID. Use this after listing threats to retrieve full details including attack vectors, source/destination, and remediation info.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getThreatDetail', async ({ threatId, time, siteId, customHeaders }) => toToolResult(await client.getThreatDetail(threatId, time, siteId, customHeaders))));
}
//# sourceMappingURL=getThreatDetail.js.map