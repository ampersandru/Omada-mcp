import type { CustomHeaders, PaginatedResult } from '../types/index.js';
import type { GetThreatListOptions, ThreatInfo } from '../types/threatInfo.js';
import type { RequestHandler } from './request.js';
/**
 * Security-related operations for the Omada API.
 * Handles threat management and security features.
 */
export declare class SecurityOperations {
    private readonly request;
    private readonly buildPath;
    constructor(request: RequestHandler, buildPath: (path: string) => string);
    /**
     * Get the global view threat management list.
     * operationId: getGlobalThreatList
     *
     * @param options - Threat list query options
     * @returns Paginated list of threat information
     */
    getThreatList(options: GetThreatListOptions, customHeaders?: CustomHeaders): Promise<PaginatedResult<ThreatInfo>>;
    /**
     * Get top threats from the global view threat management.
     * OperationId: getTopThreatList
     */
    getTopThreats(customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get threat severity summary from the global view.
     * OperationId: getThreatSeverity
     */
    getThreatSeverity(startTime: number, endTime: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller status/health.
     * OperationId: getControllerStatus
     */
    getControllerStatus(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global general settings.
     * OperationId: getGeneralSettings
     */
    getGeneralSettings(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get data retention setting.
     * OperationId: getRetention
     */
    getRetention(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client inactivity timeout.
     * OperationId: getClientActiveTimeout
     */
    getClientActiveTimeout(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global syslog/remote logging config.
     * OperationId: getRemoteLogging
     */
    getRemoteLogging(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global RADIUS server config.
     * OperationId: getRadiusServer
     */
    getRadiusServer(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller logging config.
     * OperationId: getLogging
     */
    getLogging(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get UI interface settings.
     * OperationId: getUiInterface
     */
    getUiInterface(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get device access management settings.
     * OperationId: getDeviceAccessManagement
     */
    getDeviceAccessManagement(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get webhook notification settings.
     * OperationId: getWebhookForGlobal
     */
    getWebhookForGlobal(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get webhook dispatch logs (paginated, required filters).
     * OperationId: getWebhookLogsForGlobal
     * @param timeStart - Start of time range in epoch milliseconds (e.g. 1679297710438)
     * @param timeEnd - End of time range in epoch milliseconds (e.g. 1681889710438)
     */
    getWebhookLogsForGlobal(page: number, pageSize: number, webhookId: string, timeStart: number, timeEnd: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get mail server status.
     * OperationId: getMailServerStatus
     */
    getMailServerStatus(customHeaders?: CustomHeaders): Promise<unknown>;
}
