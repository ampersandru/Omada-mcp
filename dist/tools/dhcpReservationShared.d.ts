import { z } from 'zod';
import type { OmadaClient } from '../omadaClient/index.js';
export declare const ipv4Schema: z.ZodString;
export declare const dhcpReservationPayloadSchema: z.ZodObject<{
    netId: z.ZodString;
    mac: z.ZodString;
    status: z.ZodBoolean;
    ip: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    confirmConflict: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    options: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
}, "strip", z.ZodTypeAny, {
    mac: string;
    status: boolean;
    netId: string;
    confirmConflict: boolean;
    ip?: string | undefined;
    options?: unknown[] | undefined;
    description?: string | undefined;
}, {
    mac: string;
    status: boolean;
    netId: string;
    ip?: string | undefined;
    options?: unknown[] | undefined;
    description?: string | undefined;
    confirmConflict?: boolean | undefined;
}>;
export type DhcpReservationPayload = z.infer<typeof dhcpReservationPayloadSchema>;
export interface DhcpReservationRecord {
    mac?: string;
    ip?: string;
    netId?: string;
    description?: string;
    status?: boolean;
}
export interface LanNetworkRecord {
    id?: string;
    name?: string;
    gatewaySubnet?: string;
}
export declare function getAllDhcpReservations(client: OmadaClient, siteId?: string, customHeaders?: Record<string, string>): Promise<Record<string, unknown>[]>;
export declare function extractGridRecords(value: unknown): Record<string, unknown>[];
export declare function findReservationByMac(value: unknown, mac: string): DhcpReservationRecord | undefined;
export declare function findReservationByIp(value: unknown, ip: string, excludeMac?: string): DhcpReservationRecord | undefined;
export declare function findLanNetworkById(value: unknown[], netId: string): LanNetworkRecord | undefined;
export declare function buildEffectiveReservation(existing: DhcpReservationRecord | undefined, updates: Partial<DhcpReservationPayload>): DhcpReservationPayload;
export declare function validateReservationIpAgainstNetwork(ip: string | undefined, network: LanNetworkRecord): void;
