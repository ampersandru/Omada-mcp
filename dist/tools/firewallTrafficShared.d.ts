import { z } from 'zod';
import type { OmadaClient } from '../omadaClient/index.js';
export declare const appControlCreatePayloadSchema: z.ZodEffects<z.ZodObject<{
    ruleName: z.ZodString;
    schedule: z.ZodString;
    qos: z.ZodBoolean;
    qosClass: z.ZodOptional<z.ZodNumber>;
    applications: z.ZodArray<z.ZodNumber, "many">;
    selectType: z.ZodEnum<["include", "exclude", "all"]>;
}, "strip", z.ZodTypeAny, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    selectType: "all" | "include" | "exclude";
    qosClass?: number | undefined;
}, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    selectType: "all" | "include" | "exclude";
    qosClass?: number | undefined;
}>, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    selectType: "all" | "include" | "exclude";
    qosClass?: number | undefined;
}, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    selectType: "all" | "include" | "exclude";
    qosClass?: number | undefined;
}>;
export declare const setAppControlRuleInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    ruleId: z.ZodOptional<z.ZodString>;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: Record<string, unknown>;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    ruleId?: string | undefined;
}, {
    payload: Record<string, unknown>;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
    ruleId?: string | undefined;
}>;
export declare const appControlUpdatePayloadSchema: z.ZodEffects<z.ZodObject<{
    ruleName: z.ZodString;
    schedule: z.ZodString;
    qos: z.ZodBoolean;
    qosClass: z.ZodOptional<z.ZodNumber>;
    applications: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    qosClass?: number | undefined;
}, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    qosClass?: number | undefined;
}>, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    qosClass?: number | undefined;
}, {
    ruleName: string;
    schedule: string;
    qos: boolean;
    applications: number[];
    qosClass?: number | undefined;
}>;
export declare const deleteAppControlRuleInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    ruleId: z.ZodString;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    ruleId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    ruleId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const bandwidthControlRulePayloadSchema: z.ZodObject<{
    name: z.ZodString;
    status: z.ZodBoolean;
    sourceType: z.ZodOptional<z.ZodNumber>;
    sourceIds: z.ZodArray<z.ZodString, "many">;
    wanPortIds: z.ZodArray<z.ZodString, "many">;
    upstreamBandwidth: z.ZodNumber;
    upstreamBandwidthUnit: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
    downstreamBandwidth: z.ZodNumber;
    downstreamBandwidthUnit: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
    mode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: boolean;
    mode: 0 | 1;
    sourceIds: string[];
    wanPortIds: string[];
    upstreamBandwidth: number;
    upstreamBandwidthUnit: 1 | 2;
    downstreamBandwidth: number;
    downstreamBandwidthUnit: 1 | 2;
    sourceType?: number | undefined;
}, {
    name: string;
    status: boolean;
    mode: number;
    sourceIds: string[];
    wanPortIds: string[];
    upstreamBandwidth: number;
    upstreamBandwidthUnit: number;
    downstreamBandwidth: number;
    downstreamBandwidthUnit: number;
    sourceType?: number | undefined;
}>;
export declare const setBandwidthControlRuleInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    ruleId: z.ZodOptional<z.ZodString>;
    payload: z.ZodObject<{
        name: z.ZodString;
        status: z.ZodBoolean;
        sourceType: z.ZodOptional<z.ZodNumber>;
        sourceIds: z.ZodArray<z.ZodString, "many">;
        wanPortIds: z.ZodArray<z.ZodString, "many">;
        upstreamBandwidth: z.ZodNumber;
        upstreamBandwidthUnit: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
        downstreamBandwidth: z.ZodNumber;
        downstreamBandwidthUnit: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
        mode: z.ZodEffects<z.ZodNumber, 0 | 1, number>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        status: boolean;
        mode: 0 | 1;
        sourceIds: string[];
        wanPortIds: string[];
        upstreamBandwidth: number;
        upstreamBandwidthUnit: 1 | 2;
        downstreamBandwidth: number;
        downstreamBandwidthUnit: 1 | 2;
        sourceType?: number | undefined;
    }, {
        name: string;
        status: boolean;
        mode: number;
        sourceIds: string[];
        wanPortIds: string[];
        upstreamBandwidth: number;
        upstreamBandwidthUnit: number;
        downstreamBandwidth: number;
        downstreamBandwidthUnit: number;
        sourceType?: number | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        name: string;
        status: boolean;
        mode: 0 | 1;
        sourceIds: string[];
        wanPortIds: string[];
        upstreamBandwidth: number;
        upstreamBandwidthUnit: 1 | 2;
        downstreamBandwidth: number;
        downstreamBandwidthUnit: 1 | 2;
        sourceType?: number | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    ruleId?: string | undefined;
}, {
    payload: {
        name: string;
        status: boolean;
        mode: number;
        sourceIds: string[];
        wanPortIds: string[];
        upstreamBandwidth: number;
        upstreamBandwidthUnit: number;
        downstreamBandwidth: number;
        downstreamBandwidthUnit: number;
        sourceType?: number | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
    ruleId?: string | undefined;
}>;
export declare const deleteBandwidthControlRuleInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    ruleId: z.ZodString;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    ruleId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    ruleId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
export declare const accessControlPayloadSchema: z.ZodEffects<z.ZodObject<{
    preAuthAccessEnable: z.ZodBoolean;
    preAuthAccessPolicies: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        idInt: z.ZodOptional<z.ZodNumber>;
        type: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
        ip: z.ZodOptional<z.ZodString>;
        subnetMask: z.ZodOptional<z.ZodNumber>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: 1 | 2;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }, {
        type: number;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }>, {
        type: 1 | 2;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }, {
        type: number;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }>, "many">>;
    freeAuthClientEnable: z.ZodBoolean;
    freeAuthClientPolicies: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        idInt: z.ZodOptional<z.ZodNumber>;
        type: z.ZodEffects<z.ZodNumber, 4 | 3, number>;
        clientIp: z.ZodOptional<z.ZodString>;
        clientMac: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: 4 | 3;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }, {
        type: number;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }>, {
        type: 4 | 3;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }, {
        type: number;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    preAuthAccessEnable: boolean;
    freeAuthClientEnable: boolean;
    preAuthAccessPolicies?: {
        type: 1 | 2;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }[] | undefined;
    freeAuthClientPolicies?: {
        type: 4 | 3;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }[] | undefined;
}, {
    preAuthAccessEnable: boolean;
    freeAuthClientEnable: boolean;
    preAuthAccessPolicies?: {
        type: number;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }[] | undefined;
    freeAuthClientPolicies?: {
        type: number;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }[] | undefined;
}>, {
    preAuthAccessEnable: boolean;
    freeAuthClientEnable: boolean;
    preAuthAccessPolicies?: {
        type: 1 | 2;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }[] | undefined;
    freeAuthClientPolicies?: {
        type: 4 | 3;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }[] | undefined;
}, {
    preAuthAccessEnable: boolean;
    freeAuthClientEnable: boolean;
    preAuthAccessPolicies?: {
        type: number;
        ip?: string | undefined;
        url?: string | undefined;
        idInt?: number | undefined;
        subnetMask?: number | undefined;
    }[] | undefined;
    freeAuthClientPolicies?: {
        type: number;
        clientMac?: string | undefined;
        idInt?: number | undefined;
        clientIp?: string | undefined;
    }[] | undefined;
}>;
export declare const setAccessControlInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    payload: z.ZodEffects<z.ZodObject<{
        preAuthAccessEnable: z.ZodBoolean;
        preAuthAccessPolicies: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            idInt: z.ZodOptional<z.ZodNumber>;
            type: z.ZodEffects<z.ZodNumber, 1 | 2, number>;
            ip: z.ZodOptional<z.ZodString>;
            subnetMask: z.ZodOptional<z.ZodNumber>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: 1 | 2;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }, {
            type: number;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }>, {
            type: 1 | 2;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }, {
            type: number;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }>, "many">>;
        freeAuthClientEnable: z.ZodBoolean;
        freeAuthClientPolicies: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
            idInt: z.ZodOptional<z.ZodNumber>;
            type: z.ZodEffects<z.ZodNumber, 4 | 3, number>;
            clientIp: z.ZodOptional<z.ZodString>;
            clientMac: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: 4 | 3;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }, {
            type: number;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }>, {
            type: 4 | 3;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }, {
            type: number;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: 1 | 2;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: 4 | 3;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    }, {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: number;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: number;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    }>, {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: 1 | 2;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: 4 | 3;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    }, {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: number;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: number;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    }>;
    dryRun: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    dryRun: boolean;
    payload: {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: 1 | 2;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: 4 | 3;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    payload: {
        preAuthAccessEnable: boolean;
        freeAuthClientEnable: boolean;
        preAuthAccessPolicies?: {
            type: number;
            ip?: string | undefined;
            url?: string | undefined;
            idInt?: number | undefined;
            subnetMask?: number | undefined;
        }[] | undefined;
        freeAuthClientPolicies?: {
            type: number;
            clientMac?: string | undefined;
            idInt?: number | undefined;
            clientIp?: string | undefined;
        }[] | undefined;
    };
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
    dryRun?: boolean | undefined;
}>;
interface GridRecord {
    id?: string | number;
    ruleId?: string | number;
    aclId?: string | number;
}
export declare function extractGridRecords(value: unknown): Record<string, unknown>[];
export declare function findGridRecordById(value: unknown, targetId: string): GridRecord | undefined;
export declare function parseAppControlPayload(client: OmadaClient, ruleId: string | undefined, payload: unknown, siteId?: string, customHeaders?: Record<string, string>): Promise<Record<string, unknown>>;
export declare function validateBandwidthControlPayloadReferences(client: OmadaClient, payload: z.infer<typeof bandwidthControlRulePayloadSchema>, siteId?: string, customHeaders?: Record<string, string>): Promise<void>;
export {};
