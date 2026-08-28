/**
 * Low-risk operational actions backed by the official Omada Open API.
 * These are intentionally limited to device/client actions with clear operator intent.
 */
export class ActionOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    async rebootDevice(deviceMac, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices/${encodeURIComponent(deviceMac)}/reboot`);
        const response = await this.request.post(path, {}, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async blockClient(clientMac, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/clients/${encodeURIComponent(clientMac)}/block`);
        const response = await this.request.post(path, {}, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async unblockClient(clientMac, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/clients/${encodeURIComponent(clientMac)}/unblock`);
        const response = await this.request.post(path, {}, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async reconnectClient(clientMac, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/clients/${encodeURIComponent(clientMac)}/reconnect`);
        const response = await this.request.post(path, {}, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setDeviceLed(deviceMac, ledSetting, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices/${encodeURIComponent(deviceMac)}/led-setting`);
        const response = await this.request.post(path, { ledSetting }, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=actions.js.map