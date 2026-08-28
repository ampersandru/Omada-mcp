/**
 * Controller-level operations for the Omada API.
 * Covers global system settings, retention, ports, certificates, and related controller settings.
 */
export class ControllerOperations {
    request;
    buildPath;
    constructor(request, buildPath) {
        this.request = request;
        this.buildPath = buildPath;
    }
    /**
     * Get data retention settings.
     * OperationId: getDataRetention
     */
    async getDataRetention(customHeaders) {
        const path = this.buildPath('/retention');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get controller port setting.
     * OperationId: getControllerPort
     */
    async getControllerPort(customHeaders) {
        const path = this.buildPath('/system/setting/controller-port');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get portal port setting.
     * OperationId: getPortalPort
     */
    async getPortalPort(customHeaders) {
        const path = this.buildPath('/system/setting/portal-port');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get certificate configuration.
     * OperationId: getCertificate
     */
    async getCertificate(customHeaders) {
        const path = this.buildPath('/system/setting/certificate');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get experience improvement setting.
     * OperationId: getExpImprove
     */
    async getExperienceImprovement(customHeaders) {
        const path = this.buildPath('/global/controller/setting/exp-improve');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global dashboard overview (without client data).
     * OperationId: getGernalSettings_1
     */
    async getGlobalDashboardOverview(customHeaders) {
        const path = this.buildPath('/dashboard/overview-without-client');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get client history data enable setting.
     * OperationId: getClientHistoryDataEnable
     */
    async getClientHistoryDataEnable(customHeaders) {
        const path = this.buildPath('/controller/client/history-enable');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=controller.js.map