import { z } from 'zod';
import { deviceMacSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
export function registerGetApOfdmaConfigTool(server, client) {
    const inputSchema = z.object({
        apMac: deviceMacSchema.describe('MAC address of the access point (e.g., AA-BB-CC-DD-EE-FF).'),
        ...siteInputSchema.shape,
    });
    server.registerTool('getApOfdmaConfig', {
        description: '[DEPRECATED] Use getSitesApsOfdma instead. Same endpoint, retained for backward compatibility. getSitesApsOfdma is the canonical tool name and should be preferred for consistency. Get OFDMA (Orthogonal Frequency Division Multiple Access) configuration for a specific access point.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getApOfdmaConfig', async ({ apMac, siteId, customHeaders }) => toToolResult(await client.getApOfdmaConfig(apMac, siteId, customHeaders))));
}
//# sourceMappingURL=getApOfdmaConfig.js.map