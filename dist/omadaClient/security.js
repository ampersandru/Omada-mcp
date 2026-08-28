/**
 * Security-related operations for the Omada API.
 * Handles threat management and security features.
 */
export class SecurityOperations {
    request;
    buildPath;
    constructor(request, buildPath) {
        this.request = request;
        this.buildPath = buildPath;
    }
    /**
     * Get the global view threat management list.
     * operationId: getGlobalThreatList
     *
     * @param options - Threat list query options
     * @returns Paginated list of threat information
     */
    async getThreatList(options, customHeaders) {
        const params = {
            archived: options.archived,
            page: options.page,
            pageSize: options.pageSize,
            'filters.startTime': options.startTime,
            'filters.endTime': options.endTime,
        };
        if (options.siteList) {
            params.siteList = options.siteList;
        }
        if (options.severity !== undefined) {
            params['filters.severity'] = options.severity;
        }
        if (options.sortTime) {
            params['sorts.time'] = options.sortTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const path = this.buildPath('/security/threat-management');
        return await this.request.request({
            method: 'GET',
            url: path,
            params,
        }, true, customHeaders);
    }
    /**
     * Get top threats from the global view threat management.
     * OperationId: getTopThreatList
     */
    async getTopThreats(customHeaders) {
        const path = this.buildPath('/security/threat-management/top');
        const response = await this.request.get(path, undefined, customHeaders);
        return response.result ?? [];
    }
    /**
     * Get threat severity summary from the global view.
     * OperationId: getThreatSeverity
     */
    async getThreatSeverity(startTime, endTime, customHeaders) {
        const path = this.buildPath('/security/threat-management/severity');
        const response = await this.request.get(path, { startTime, endTime }, customHeaders);
        return response.result;
    }
    // Global Controller settings (issue #41)
    /**
     * Get controller status/health.
     * OperationId: getControllerStatus
     */
    async getControllerStatus(customHeaders) {
        const path = this.buildPath('/system/setting/controller-status');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global general settings.
     * OperationId: getGeneralSettings
     */
    async getGeneralSettings(customHeaders) {
        const path = this.buildPath('/global/controller/setting/general');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get data retention setting.
     * OperationId: getRetention
     */
    async getRetention(customHeaders) {
        const path = this.buildPath('/controller/setting/retention');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get client inactivity timeout.
     * OperationId: getClientActiveTimeout
     */
    async getClientActiveTimeout(customHeaders) {
        const path = this.buildPath('/controller/setting/active-timeout');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global syslog/remote logging config.
     * OperationId: getRemoteLogging
     */
    async getRemoteLogging(customHeaders) {
        const path = this.buildPath('/global/controller/setting/syslog');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global RADIUS server config.
     * OperationId: getRadiusServer
     */
    async getRadiusServer(customHeaders) {
        const path = this.buildPath('/global/controller/setting/network/radius-server');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get controller logging config.
     * OperationId: getLogging
     */
    async getLogging(customHeaders) {
        const path = this.buildPath('/system/setting/logging');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get UI interface settings.
     * OperationId: getUiInterface
     */
    async getUiInterface(customHeaders) {
        const path = this.buildPath('/controller/setting/ui-interface');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get device access management settings.
     * OperationId: getDeviceAccessManagement
     */
    async getDeviceAccessManagement(customHeaders) {
        const path = this.buildPath('/controller/setting/services/device-access');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get webhook notification settings.
     * OperationId: getWebhookForGlobal
     */
    async getWebhookForGlobal(customHeaders) {
        const path = this.buildPath('/webhook/settings');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get webhook dispatch logs (paginated, required filters).
     * OperationId: getWebhookLogsForGlobal
     * @param timeStart - Start of time range in epoch milliseconds (e.g. 1679297710438)
     * @param timeEnd - End of time range in epoch milliseconds (e.g. 1681889710438)
     */
    async getWebhookLogsForGlobal(page, pageSize, webhookId, timeStart, timeEnd, customHeaders) {
        const path = this.buildPath('/webhook/settings/dispatch-logs');
        const response = await this.request.get(path, { page, pageSize, 'filters.webhookId': webhookId, 'filters.timeStart': timeStart, 'filters.timeEnd': timeEnd }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get mail server status.
     * OperationId: getMailServerStatus
     */
    async getMailServerStatus(customHeaders) {
        const path = this.buildPath('/mail/status');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=security.js.map