import type { CustomHeaders, PaginatedResult } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
export interface SiteThreatListOptions {
    page: number;
    pageSize: number;
    startTime?: number;
    endTime?: number;
    searchKey?: string;
}
/**
 * Insight operations for the Omada API.
 * Covers site-level threat management, WIDS, rogue APs, and VPN stats.
 */
export declare class InsightOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * List site-level threat management events.
     * OperationId: getSiteThreatManagementList
     */
    listSiteThreatManagement(options: SiteThreatListOptions, siteId?: string, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * Get WIDS (Wireless Intrusion Detection System) information for a site.
     * OperationId: getWids
     */
    getWids(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WIDS blacklist for a site.
     * OperationId: getWidsBlacklist
     */
    getWidsBlacklist(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get rogue APs detected in a site.
     * OperationId: getRogueAps
     */
    getRogueAps(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get VPN tunnel statistics for a site.
     * OperationId: getVpnTunnelStats
     */
    getVpnTunnelStats(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPsec VPN statistics for a site.
     * OperationId: getIpsecVpnStats
     */
    getIpsecVpnStats(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get insight client list for a site.
     * OperationId: getInsightClients
     */
    listInsightClients(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * Get routing table for a site.
     * OperationId: getGridRouting
     */
    getRoutingTable(type: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get threat detail by ID for a site.
     * OperationId: getThreatDetail
     *
     * @param threatId - The ID of the threat to retrieve
     * @param time - Unix timestamp in seconds to scope the threat lookup. Defaults to current time if not provided.
     * @param siteId - Optional site ID (uses default if not provided)
     */
    getThreatDetail(threatId: string, time?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
