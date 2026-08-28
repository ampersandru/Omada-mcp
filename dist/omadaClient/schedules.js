/**
 * Schedule operations for the Omada API.
 * Covers upgrade, reboot, PoE, and port schedules.
 */
export class ScheduleOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * Get upgrade schedule list for a site.
     * OperationId: getUpgradeScheduleList
     */
    async getUpgradeScheduleList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/upgrade-schedules`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get reboot schedule list for a site template.
     * OperationId: getRebootScheduleList_1
     */
    async getRebootScheduleList(siteTemplateId, customHeaders) {
        const path = this.buildPath(`/sitetemplates/${encodeURIComponent(siteTemplateId)}/reboot-schedules`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get PoE schedule list for a site.
     * OperationId: getPoeScheduleList
     */
    async getPoeScheduleList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/poe-schedules`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get port schedule list for a site.
     * OperationId: getPortScheduleList
     */
    async getPortScheduleList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/port-schedules`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get port schedule ports for a site.
     * OperationId: getPortSchedulePorts
     */
    async getPortSchedulePorts(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/port-status-ports`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=schedules.js.map