import { z } from 'zod';
import type { OmadaClient } from '../omadaClient/index.js';
export declare const aclIdSchema: z.ZodString;
export declare const gatewayAclConfigModeSchema: z.ZodObject<{
    mode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
}, "strip", z.ZodTypeAny, {
    mode: 0 | 1;
}, {
    mode: number;
}>;
export declare const gatewayAclPayloadSchema: z.ZodObject<{
    description: z.ZodString;
    status: z.ZodBoolean;
    policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
    protocols: z.ZodArray<z.ZodNumber, "many">;
    sourceIds: z.ZodArray<z.ZodString, "many">;
    destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    syslog: z.ZodBoolean;
    sourceType: z.ZodNumber;
    destinationType: z.ZodNumber;
    direction: z.ZodObject<{
        lanToWan: z.ZodOptional<z.ZodBoolean>;
        lanToLan: z.ZodOptional<z.ZodBoolean>;
        wanInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        vpnInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        lanToWan?: boolean | undefined;
        lanToLan?: boolean | undefined;
        wanInIds?: string[] | undefined;
        vpnInIds?: string[] | undefined;
    }, {
        lanToWan?: boolean | undefined;
        lanToLan?: boolean | undefined;
        wanInIds?: string[] | undefined;
        vpnInIds?: string[] | undefined;
    }>;
    stateMode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
    states: z.ZodOptional<z.ZodObject<{
        stateNew: z.ZodOptional<z.ZodBoolean>;
        established: z.ZodOptional<z.ZodBoolean>;
        related: z.ZodOptional<z.ZodBoolean>;
        invalid: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        stateNew?: boolean | undefined;
        established?: boolean | undefined;
        related?: boolean | undefined;
        invalid?: boolean | undefined;
    }, {
        stateNew?: boolean | undefined;
        established?: boolean | undefined;
        related?: boolean | undefined;
        invalid?: boolean | undefined;
    }>>;
    timeRangeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: boolean;
    description: string;
    policy: 0 | 1;
    protocols: number[];
    sourceIds: string[];
    syslog: boolean;
    sourceType: number;
    destinationType: number;
    direction: {
        lanToWan?: boolean | undefined;
        lanToLan?: boolean | undefined;
        wanInIds?: string[] | undefined;
        vpnInIds?: string[] | undefined;
    };
    stateMode: 0 | 1;
    destinationIds?: string[] | undefined;
    states?: {
        stateNew?: boolean | undefined;
        established?: boolean | undefined;
        related?: boolean | undefined;
        invalid?: boolean | undefined;
    } | undefined;
    timeRangeId?: string | undefined;
}, {
    status: boolean;
    description: string;
    policy: number;
    protocols: number[];
    sourceIds: string[];
    syslog: boolean;
    sourceType: number;
    destinationType: number;
    direction: {
        lanToWan?: boolean | undefined;
        lanToLan?: boolean | undefined;
        wanInIds?: string[] | undefined;
        vpnInIds?: string[] | undefined;
    };
    stateMode: number;
    destinationIds?: string[] | undefined;
    states?: {
        stateNew?: boolean | undefined;
        established?: boolean | undefined;
        related?: boolean | undefined;
        invalid?: boolean | undefined;
    } | undefined;
    timeRangeId?: string | undefined;
}>;
export declare const eapAclPayloadSchema: z.ZodObject<{
    description: z.ZodString;
    status: z.ZodBoolean;
    policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
    protocols: z.ZodArray<z.ZodNumber, "many">;
    sourceIds: z.ZodArray<z.ZodString, "many">;
    destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sourceType: z.ZodNumber;
    destinationType: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: boolean;
    description: string;
    policy: 0 | 1;
    protocols: number[];
    sourceIds: string[];
    sourceType: number;
    destinationType: number;
    destinationIds?: string[] | undefined;
}, {
    status: boolean;
    description: string;
    policy: number;
    protocols: number[];
    sourceIds: string[];
    sourceType: number;
    destinationType: number;
    destinationIds?: string[] | undefined;
}>;
export declare const createGatewayAclInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    payload: z.ZodObject<{
        description: z.ZodString;
        status: z.ZodBoolean;
        policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        protocols: z.ZodArray<z.ZodNumber, "many">;
        sourceIds: z.ZodArray<z.ZodString, "many">;
        destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        syslog: z.ZodBoolean;
        sourceType: z.ZodNumber;
        destinationType: z.ZodNumber;
        direction: z.ZodObject<{
            lanToWan: z.ZodOptional<z.ZodBoolean>;
            lanToLan: z.ZodOptional<z.ZodBoolean>;
            wanInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            vpnInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        }, {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        }>;
        stateMode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        states: z.ZodOptional<z.ZodObject<{
            stateNew: z.ZodOptional<z.ZodBoolean>;
            established: z.ZodOptional<z.ZodBoolean>;
            related: z.ZodOptional<z.ZodBoolean>;
            invalid: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        }, {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        }>>;
        timeRangeId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: 0 | 1;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    }, {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: number;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: 0 | 1;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    payload: {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: number;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const updateGatewayAclInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    aclId: z.ZodString;
    payload: z.ZodObject<{
        description: z.ZodString;
        status: z.ZodBoolean;
        policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        protocols: z.ZodArray<z.ZodNumber, "many">;
        sourceIds: z.ZodArray<z.ZodString, "many">;
        destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        syslog: z.ZodBoolean;
        sourceType: z.ZodNumber;
        destinationType: z.ZodNumber;
        direction: z.ZodObject<{
            lanToWan: z.ZodOptional<z.ZodBoolean>;
            lanToLan: z.ZodOptional<z.ZodBoolean>;
            wanInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            vpnInIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        }, {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        }>;
        stateMode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        states: z.ZodOptional<z.ZodObject<{
            stateNew: z.ZodOptional<z.ZodBoolean>;
            established: z.ZodOptional<z.ZodBoolean>;
            related: z.ZodOptional<z.ZodBoolean>;
            invalid: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        }, {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        }>>;
        timeRangeId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: 0 | 1;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    }, {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: number;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: 0 | 1;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    };
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    payload: {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        syslog: boolean;
        sourceType: number;
        destinationType: number;
        direction: {
            lanToWan?: boolean | undefined;
            lanToLan?: boolean | undefined;
            wanInIds?: string[] | undefined;
            vpnInIds?: string[] | undefined;
        };
        stateMode: number;
        destinationIds?: string[] | undefined;
        states?: {
            stateNew?: boolean | undefined;
            established?: boolean | undefined;
            related?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined;
        timeRangeId?: string | undefined;
    };
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const createEapAclInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    payload: z.ZodObject<{
        description: z.ZodString;
        status: z.ZodBoolean;
        policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        protocols: z.ZodArray<z.ZodNumber, "many">;
        sourceIds: z.ZodArray<z.ZodString, "many">;
        destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        sourceType: z.ZodNumber;
        destinationType: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    }, {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    payload: {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const updateEapAclInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    aclId: z.ZodString;
    payload: z.ZodObject<{
        description: z.ZodString;
        status: z.ZodBoolean;
        policy: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
        protocols: z.ZodArray<z.ZodNumber, "many">;
        sourceIds: z.ZodArray<z.ZodString, "many">;
        destinationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        sourceType: z.ZodNumber;
        destinationType: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    }, {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        status: boolean;
        description: string;
        policy: 0 | 1;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    };
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    payload: {
        status: boolean;
        description: string;
        policy: number;
        protocols: number[];
        sourceIds: string[];
        sourceType: number;
        destinationType: number;
        destinationIds?: string[] | undefined;
    };
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const deleteAclInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    aclId: z.ZodString;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    aclId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const setAclConfigTypeInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    mode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    mode: 0 | 1;
    dryRun: boolean;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    mode: number;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
interface AclRecord {
    id?: string;
    aclId?: string;
    description?: string;
}
export declare function getAclRecordId(record: Record<string, unknown>): string;
export declare function findAclById(value: unknown, aclId: string): AclRecord | undefined;
export declare function findCreatedAclByDescription(before: unknown, after: unknown, description: string): Record<string, unknown> | undefined;
export declare function validateEapAclPayloadReferences(client: OmadaClient, payload: z.infer<typeof eapAclPayloadSchema>, siteId?: string, customHeaders?: Record<string, string>): Promise<void>;
export {};
