import type { CustomHeaders, PaginatedResult } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
export interface LogQueryOptions {
    page: number;
    pageSize: number;
    startTime?: number;
    endTime?: number;
    searchKey?: string;
}
/**
 * Log operations for the Omada API.
 * Covers site events, alerts, and audit logs.
 */
export declare class LogOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string, version?: string) => string);
    /**
     * List site event logs.
     * OperationId: getSiteEvents
     */
    listSiteEvents(options: LogQueryOptions, siteId?: string, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * List site alert logs.
     * OperationId: getSiteAlerts
     */
    listSiteAlerts(options: LogQueryOptions, siteId?: string, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * List site audit logs.
     * OperationId: getSiteAuditLogs
     */
    listSiteAuditLogs(options: LogQueryOptions, siteId?: string, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * List global event logs (all sites).
     * OperationId: getEvents
     */
    listGlobalEvents(options: LogQueryOptions, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * List global alert logs (all sites).
     * OperationId: getAlerts
     */
    listGlobalAlerts(options: LogQueryOptions, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * List global audit logs (all sites).
     * OperationId: getAuditLogs
     */
    listGlobalAuditLogs(options: LogQueryOptions, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * Get site log notification settings (v1).
     * OperationId: getLogSettingForSite
     */
    getLogSettingForSite(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site log notification settings (v2).
     * OperationId: getLogSettingForSiteV2
     */
    getLogSettingForSiteV2(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site audit notification settings.
     * OperationId: getAuditLogSettingForSite
     */
    getAuditLogSettingForSite(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global log notification settings (v1).
     * OperationId: getLogSettingForGlobal
     */
    getLogSettingForGlobal(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global log notification settings (v2).
     * OperationId: getLogSettingForGlobalV2
     */
    getLogSettingForGlobalV2(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global audit notification settings.
     * OperationId: getAuditLogSettingForGlobal
     */
    getAuditLogSettingForGlobal(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global audit logs (paginated, optional filters).
     * OperationId: getAuditLogsForGlobal
     */
    getAuditLogsForGlobal(page: number, pageSize: number, options?: {
        sortTime?: string;
        filterResult?: number;
        filterLevel?: string;
        filterAuditTypes?: string;
        filterTimes?: string;
        searchKey?: string;
    }, customHeaders?: CustomHeaders): Promise<unknown>;
}
