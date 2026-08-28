/**
 * Site-related operations for the Omada API.
 */
export class SiteOperations {
    request;
    buildPath;
    defaultSiteId;
    constructor(request, buildPath, defaultSiteId) {
        this.request = request;
        this.buildPath = buildPath;
        this.defaultSiteId = defaultSiteId;
    }
    getDefaultSiteId() {
        return this.defaultSiteId;
    }
    setDefaultSiteId(siteId) {
        this.defaultSiteId = siteId;
    }
    /**
     * List all sites accessible to the authenticated user.
     */
    async listSites(customHeaders) {
        return await this.request.fetchPaginated(this.buildPath('/sites'), {}, customHeaders);
    }
    /**
     * Resolve a site ID from the parameter or default configuration.
     * Maps 'Default' / 'default' to configured/discovered hex site ID if available.
     * @throws {Error} If no site ID is available
     */
    resolveSiteId(siteId) {
        if (siteId && siteId.toLowerCase() !== 'default') {
            return siteId;
        }
        if (this.defaultSiteId) {
            return this.defaultSiteId;
        }
        if (siteId) {
            return siteId;
        }
        throw new Error('A site id must be provided either in the environment or as a parameter.');
    }
    /**
     * Get site detail by site ID.
     * OperationId: getSiteEntity
     */
    async getSiteDetail(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site URL.
     * OperationId: getSiteUrlByOpenApi
     */
    async getSiteUrl(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site NTP server status.
     * OperationId: getNtpServerStatus
     */
    async getSiteNtpStatus(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/ntp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site specification.
     * OperationId: getSiteSpecification
     */
    async getSiteSpecification(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/specification`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site remember device setting.
     * OperationId: getSiteRememberSettingByOpenApi
     */
    async getSiteRememberSetting(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/remember-device`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site device account setting.
     * OperationId: getSiteDeviceAccountSetting
     */
    async getSiteDeviceAccount(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/device-account`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site capacity.
     * OperationId: getSiteSettingCap
     */
    async getSiteCapacity(siteId, customHeaders) {
        const resolvedSiteId = this.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/capacity`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site template list.
     * OperationId: getSiteTemplateList
     */
    async getSiteTemplateList(customHeaders) {
        const path = this.buildPath('/sitetemplates');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site template detail by template ID.
     * OperationId: getSiteTemplateEntity
     */
    async getSiteTemplateDetail(siteTemplateId, customHeaders) {
        const path = this.buildPath(`/sitetemplates/${encodeURIComponent(siteTemplateId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site template configuration.
     * OperationId: getSiteTemplateConfiguration
     */
    async getSiteTemplateConfig(siteTemplateId, customHeaders) {
        const path = this.buildPath(`/sitetemplates/${encodeURIComponent(siteTemplateId)}/setting/configuration`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=site.js.map