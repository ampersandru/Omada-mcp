import { z } from 'zod';
import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
const inputSchema = siteInputSchema
    .extend({
    portUuid: z.string().min(1).describe('UUID of the WAN port to retrieve band scan results for.'),
    customHeaders: customHeadersSchema,
})
    .required({ portUuid: true });
export function registerGetIspBandScanTool(server, client) {
    server.registerTool('getIspBandScan', {
        description: 'Get ISP band scan results for a specific WAN port. Returns available frequency bands detected by the ISP scan.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getIspBandScan', async ({ portUuid, siteId, customHeaders }) => toToolResult(await client.getIspBandScan(portUuid, siteId, customHeaders))));
}
//# sourceMappingURL=getIspBandScan.js.map