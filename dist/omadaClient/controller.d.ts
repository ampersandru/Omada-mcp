import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
/**
 * Controller-level operations for the Omada API.
 * Covers global system settings, retention, ports, certificates, and related controller settings.
 */
export declare class ControllerOperations {
    private readonly request;
    private readonly buildPath;
    constructor(request: RequestHandler, buildPath: (path: string) => string);
    /**
     * Get data retention settings.
     * OperationId: getDataRetention
     */
    getDataRetention(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller port setting.
     * OperationId: getControllerPort
     */
    getControllerPort(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get portal port setting.
     * OperationId: getPortalPort
     */
    getPortalPort(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get certificate configuration.
     * OperationId: getCertificate
     */
    getCertificate(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get experience improvement setting.
     * OperationId: getExpImprove
     */
    getExperienceImprovement(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global dashboard overview (without client data).
     * OperationId: getGernalSettings_1
     */
    getGlobalDashboardOverview(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client history data enable setting.
     * OperationId: getClientHistoryDataEnable
     */
    getClientHistoryDataEnable(customHeaders?: CustomHeaders): Promise<unknown>;
}
