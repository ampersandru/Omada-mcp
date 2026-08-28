import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Schedule operations for the Omada API.
 * Covers upgrade, reboot, PoE, and port schedules.
 */
export declare class ScheduleOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * Get upgrade schedule list for a site.
     * OperationId: getUpgradeScheduleList
     */
    getUpgradeScheduleList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get reboot schedule list for a site template.
     * OperationId: getRebootScheduleList_1
     */
    getRebootScheduleList(siteTemplateId: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get PoE schedule list for a site.
     * OperationId: getPoeScheduleList
     */
    getPoeScheduleList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get port schedule list for a site.
     * OperationId: getPortScheduleList
     */
    getPortScheduleList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get port schedule ports for a site.
     * OperationId: getPortSchedulePorts
     */
    getPortSchedulePorts(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
