import { z } from 'zod';
import { deviceMacSchema } from '../server/common.js';
export const ipv4Schema = z
    .string()
    .trim()
    .regex(/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, 'Invalid IPv4 address.');
export const dhcpReservationPayloadSchema = z.object({
    netId: z.string().min(1, 'netId is required. Use getLanNetworkList to find the target LAN network id.'),
    mac: deviceMacSchema.describe('Client MAC address for the reservation.'),
    status: z.boolean().describe('Whether the DHCP reservation is enabled.'),
    ip: ipv4Schema.optional().describe('Reserved IPv4 address within the selected LAN network.'),
    description: z
        .string()
        .trim()
        .max(128, 'Description must be 128 characters or fewer.')
        .optional()
        .describe('Optional description for the DHCP reservation.'),
    confirmConflict: z
        .boolean()
        .optional()
        .default(false)
        .describe('Set to true only if you intentionally want Omada to proceed after an IP/IP-MAC conflict prompt.'),
    options: z.array(z.unknown()).optional().describe('Advanced DHCP options. Leave unset unless you know the exact Omada payload shape needed.'),
});
export async function getAllDhcpReservations(client, siteId, customHeaders) {
    const pageSize = 1000;
    const records = [];
    for (let page = 1;; page += 1) {
        const grid = await client.getDhcpReservationGrid(page, pageSize, siteId, customHeaders);
        const pageRecords = extractGridRecords(grid);
        records.push(...pageRecords);
        if (pageRecords.length < pageSize) {
            break;
        }
    }
    return records;
}
export function extractGridRecords(value) {
    if (Array.isArray(value)) {
        return value.filter((entry) => typeof entry === 'object' && entry !== null);
    }
    if (!value || typeof value !== 'object') {
        return [];
    }
    const data = value.data;
    return Array.isArray(data) ? data.filter((entry) => typeof entry === 'object' && entry !== null) : [];
}
export function findReservationByMac(value, mac) {
    const normalizedTarget = normalizeMac(mac);
    return extractGridRecords(value).find((entry) => normalizeMac(String(entry['mac'] ?? '')) === normalizedTarget);
}
export function findReservationByIp(value, ip, excludeMac) {
    const normalizedExcludeMac = excludeMac ? normalizeMac(excludeMac) : undefined;
    return extractGridRecords(value).find((entry) => {
        const recordIp = String(entry['ip'] ?? '');
        const recordMac = normalizeMac(String(entry['mac'] ?? ''));
        if (normalizedExcludeMac && recordMac === normalizedExcludeMac) {
            return false;
        }
        return recordIp === ip;
    });
}
export function findLanNetworkById(value, netId) {
    return value.find((entry) => typeof entry === 'object' && entry !== null && 'id' in entry && entry.id === netId);
}
export function buildEffectiveReservation(existing, updates) {
    return {
        mac: updates.mac ?? existing?.mac ?? '',
        netId: updates.netId ?? existing?.netId ?? '',
        status: updates.status ?? existing?.status ?? false,
        ip: updates.ip ?? existing?.ip,
        description: updates.description ?? existing?.description,
        confirmConflict: updates.confirmConflict ?? false,
        options: updates.options,
    };
}
export function validateReservationIpAgainstNetwork(ip, network) {
    if (!ip || !network.gatewaySubnet) {
        return;
    }
    if (!isIpv4InCidr(ip, network.gatewaySubnet)) {
        throw new Error(`IP ${ip} is outside the selected LAN network subnet ${network.gatewaySubnet}.`);
    }
    const gatewayIp = network.gatewaySubnet.split('/')[0];
    if (ip === gatewayIp) {
        throw new Error(`IP ${ip} matches the LAN gateway address for ${network.name ?? network.id}. Choose a different reservation address.`);
    }
}
function normalizeMac(mac) {
    return mac.replace(/[:-]/g, '').toUpperCase();
}
function ipv4ToInt(ip) {
    return (ip
        .split('.')
        .map((part) => Number(part))
        .reduce((acc, octet) => (acc << 8) + octet, 0) >>> 0);
}
function isIpv4InCidr(ip, cidr) {
    const [baseIp, maskBitsRaw] = cidr.split('/');
    const maskBits = Number(maskBitsRaw);
    if (!baseIp || Number.isNaN(maskBits) || maskBits < 0 || maskBits > 32) {
        return false;
    }
    const mask = maskBits === 0 ? 0 : (0xffffffff << (32 - maskBits)) >>> 0;
    return (ipv4ToInt(ip) & mask) === (ipv4ToInt(baseIp) & mask);
}
//# sourceMappingURL=dhcpReservationShared.js.map