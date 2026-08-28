/**
 * Log operations for the Omada API.
 * Covers site events, alerts, and audit logs.
 */
export class LogOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * List site event logs.
     * OperationId: getSiteEvents
     */
    async listSiteEvents(options, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/logs/events`);
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List site alert logs.
     * OperationId: getSiteAlerts
     */
    async listSiteAlerts(options, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/logs/alerts`);
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List site audit logs.
     * OperationId: getSiteAuditLogs
     */
    async listSiteAuditLogs(options, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/audit-logs`);
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List global event logs (all sites).
     * OperationId: getEvents
     */
    async listGlobalEvents(options, customHeaders) {
        const path = this.buildPath('/logs/events');
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List global alert logs (all sites).
     * OperationId: getAlerts
     */
    async listGlobalAlerts(options, customHeaders) {
        const path = this.buildPath('/logs/alerts');
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List global audit logs (all sites).
     * OperationId: getAuditLogs
     */
    async listGlobalAuditLogs(options, customHeaders) {
        const path = this.buildPath('/audit-logs');
        const params = {
            page: options.page,
            pageSize: options.pageSize,
        };
        if (options.startTime !== undefined) {
            params['filters.startTime'] = options.startTime;
        }
        if (options.endTime !== undefined) {
            params['filters.endTime'] = options.endTime;
        }
        if (options.searchKey) {
            params.searchKey = options.searchKey;
        }
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // Logs, Events & Alerts tools (issue #42)
    /**
     * Get site log notification settings (v1).
     * OperationId: getLogSettingForSite
     */
    async getLogSettingForSite(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/site/log-notification`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site log notification settings (v2).
     * OperationId: getLogSettingForSiteV2
     */
    async getLogSettingForSiteV2(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/site/log-notification`, 'v2');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site audit notification settings.
     * OperationId: getAuditLogSettingForSite
     */
    async getAuditLogSettingForSite(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/site/audit-notification`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global log notification settings (v1).
     * OperationId: getLogSettingForGlobal
     */
    async getLogSettingForGlobal(customHeaders) {
        const path = this.buildPath('/log-notification');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global log notification settings (v2).
     * OperationId: getLogSettingForGlobalV2
     */
    async getLogSettingForGlobalV2(customHeaders) {
        const path = this.buildPath('/log-notification', 'v2');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global audit notification settings.
     * OperationId: getAuditLogSettingForGlobal
     */
    async getAuditLogSettingForGlobal(customHeaders) {
        const path = this.buildPath('/audit-notification');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global audit logs (paginated, optional filters).
     * OperationId: getAuditLogsForGlobal
     */
    async getAuditLogsForGlobal(page, pageSize, options, customHeaders) {
        const path = this.buildPath('/audit-logs');
        const params = { page, pageSize };
        if (options?.sortTime !== undefined)
            params['sorts.time'] = options.sortTime;
        if (options?.filterResult !== undefined)
            params['filters.result'] = options.filterResult;
        if (options?.filterLevel !== undefined)
            params['filters.level'] = options.filterLevel;
        if (options?.filterAuditTypes !== undefined)
            params['filters.auditTypes'] = options.filterAuditTypes;
        if (options?.filterTimes !== undefined)
            params['filters.times'] = options.filterTimes;
        if (options?.searchKey !== undefined)
            params.searchKey = options.searchKey;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=log.js.map