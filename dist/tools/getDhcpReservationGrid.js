import { customHeadersSchema, siteInputSchema, toToolResult, wrapToolHandler } from '../server/common.js';
import { createPaginationSchema } from '../utils/pagination-schema.js';
const inputSchema = siteInputSchema.extend({
    ...createPaginationSchema(),
    customHeaders: customHeadersSchema,
});
export function registerGetDhcpReservationGridTool(server, client) {
    server.registerTool('getDhcpReservationGrid', {
        description: 'Get DHCP reservations for the site. Each reservation maps a client MAC address to a fixed IP address. Paginated.',
        inputSchema: inputSchema.shape,
    }, wrapToolHandler('getDhcpReservationGrid', async ({ page, pageSize, siteId, customHeaders }) => toToolResult(await client.getDhcpReservationGrid(page, pageSize, siteId, customHeaders))));
}
//# sourceMappingURL=getDhcpReservationGrid.js.map