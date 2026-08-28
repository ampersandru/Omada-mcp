import type { OmadaAuthMode } from './types/index.js';
export type ToolPermission = 'read' | 'write';
export type CapabilityProfile = 'safe-read' | 'ops-write' | 'admin' | 'compatibility';
/** All known atomic category names */
export declare const ALL_CATEGORIES: readonly ["dashboard", "client-insights", "insights", "clients", "devices-general", "devices-ap", "devices-switch", "devices-gateway", "wireless-ssid", "wireless-radio", "wireless-auth", "network-wan", "network-sim-lte", "network-lan", "network-routing", "network-nat", "network-services", "firewall-acl", "firewall-traffic", "firewall-ids", "security-threat", "security-wids", "vpn", "profiles", "schedules", "auth-profiles", "logs", "controller", "sites", "maintenance", "account-users", "account-sso", "account-cloud", "hotspot-portal", "hotspot-vouchers", "hotspot-users", "voip", "olt", "msp"];
export type ToolCategory = (typeof ALL_CATEGORIES)[number];
/** Categories declared in ALL_CATEGORIES but with no tool implementations yet (reserved for future phases). */
export declare const FUTURE_CATEGORIES: Set<"dashboard" | "client-insights" | "insights" | "clients" | "devices-general" | "devices-ap" | "devices-switch" | "devices-gateway" | "wireless-ssid" | "wireless-radio" | "wireless-auth" | "network-wan" | "network-sim-lte" | "network-lan" | "network-routing" | "network-nat" | "network-services" | "firewall-acl" | "firewall-traffic" | "firewall-ids" | "security-threat" | "security-wids" | "vpn" | "profiles" | "schedules" | "auth-profiles" | "logs" | "controller" | "sites" | "maintenance" | "account-users" | "account-sso" | "account-cloud" | "hotspot-portal" | "hotspot-vouchers" | "hotspot-users" | "voip" | "olt" | "msp">;
/** Group aliases that expand to multiple categories */
export declare const CATEGORY_GROUP_ALIASES: Record<string, ToolCategory[]>;
export interface ActiveCategoryEntry {
    category: ToolCategory;
    permissions: Set<ToolPermission>;
}
export interface ParseToolCategoriesResult {
    categories: Map<ToolCategory, Set<ToolPermission>>;
    warnings: string[];
}
/**
 * Parse OMADA_TOOL_CATEGORIES string into a map of category → allowed permissions.
 *
 * Syntax: comma-separated tokens, each token is `<name>[:<suffix>]`
 *   - suffix `:r`  → read only
 *   - suffix `:w`  → write only
 *   - suffix `:rw` → read and write
 *   - no suffix    → read and write (`:rw`)
 *
 * Group aliases (e.g. `all`, `devices-all`) are expanded before the suffix is applied.
 * Unknown category names produce a warning and are skipped.
 * Future (unimplemented) categories produce a warning and are skipped.
 *
 * Returns a ParseToolCategoriesResult with categories map and buffered warnings.
 */
export declare function parseToolCategories(raw: string): ParseToolCategoriesResult;
/** Default value for OMADA_TOOL_CATEGORIES */
export declare const DEFAULT_TOOL_CATEGORIES = "dashboard:r,client-insights:r,clients:r,devices-all:r";
export declare const DEFAULT_CAPABILITY_PROFILE: CapabilityProfile;
export declare const CAPABILITY_PROFILE_DEFAULTS: Record<CapabilityProfile, string>;
/**
 * The resolved Omada connection parameters required to build an OmadaClient.
 */
export interface OmadaConnectionConfig {
    baseUrl: string;
    authMode?: OmadaAuthMode;
    clientId?: string;
    clientSecret?: string;
    username?: string;
    password?: string;
    omadacId?: string;
    siteId?: string;
    strictSsl: boolean;
    requestTimeout?: number;
}
export interface EnvironmentConfig {
    capabilityProfile: CapabilityProfile;
    toolCategories: Map<ToolCategory, Set<ToolPermission>>;
    startupWarnings: string[];
    baseUrl: string;
    authMode: OmadaAuthMode;
    clientId?: string;
    clientSecret?: string;
    username?: string;
    password?: string;
    omadacId?: string;
    siteId?: string;
    strictSsl: boolean;
    requestTimeout?: number;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    logFormat: 'plain' | 'json' | 'gcp-json';
    useHttp: boolean;
    unsafeEnableHttp: boolean;
    httpPort?: number;
    httpTransport: 'stream';
    httpBindAddr?: string;
    httpPath?: string;
    httpEnableHealthcheck: boolean;
    httpHealthcheckPath?: string;
    httpAllowCors: boolean;
    httpAllowedOrigins?: string[];
    httpNgrokEnabled: boolean;
    httpNgrokAuthToken?: string;
}
export declare function loadConfigFromEnv(env?: NodeJS.ProcessEnv): EnvironmentConfig;
