/**
 * Monitor / dashboard operations for the Omada API.
 * Covers site dashboard statistics and summaries.
 */
export class MonitorOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * Get WiFi summary for a site dashboard.
     * OperationId: getWifiSummary
     */
    async getDashboardWifiSummary(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/wifi-summary`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get switch summary for a site dashboard.
     * OperationId: getSwitchSummary
     */
    async getDashboardSwitchSummary(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/switch-summary`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get traffic distribution statistics for a site dashboard.
     * OperationId: getTrafficDistribution
     */
    async getTrafficDistribution(siteId, start, end, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/traffic-distribution`);
        const response = await this.request.get(path, { start, end }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get wireless retry rate and dropped packet rate over a time range.
     * OperationId: getRetryAndDroppedRate
     */
    async getRetryAndDroppedRate(siteId, start, end, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/retry-dropped-rate`);
        const response = await this.request.get(path, { start, end }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get traffic activity time-series data for a site dashboard.
     * OperationId: getTrafficActivities
     */
    async getDashboardTrafficActivities(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/traffic-activities`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get PoE usage statistics for a site dashboard.
     * OperationId: getPoeUsage
     */
    async getDashboardPoEUsage(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/poe-usage`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get top devices by CPU usage for a site dashboard.
     * OperationId: getTopDeviceCpuUsage
     */
    async getDashboardTopCpuUsage(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/top-device-cpu-usage`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response) ?? [];
    }
    /**
     * Get top devices by memory usage for a site dashboard.
     * OperationId: getTopDeviceMemoryUsage
     */
    async getDashboardTopMemoryUsage(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/top-device-memory-usage`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response) ?? [];
    }
    /**
     * Get most active switches for a site dashboard.
     * OperationId: getMostActiveSwitches
     */
    async getDashboardMostActiveSwitches(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/most-active-switches`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response) ?? [];
    }
    /**
     * Get most active EAPs (access points) for a site dashboard.
     * OperationId: getMostActiveEaps
     */
    async getDashboardMostActiveEaps(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/most-active-eaps`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response) ?? [];
    }
    /**
     * Get site overview diagram data for a site dashboard.
     * OperationId: getOverviewDiagram
     */
    async getDashboardOverview(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/overview-diagram`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get channel distribution and utilization across all APs.
     * OperationId: getChannels
     */
    async getChannels(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/channels`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get per-WAN ISP link load over a time range.
     * OperationId: getIspLoad
     */
    async getIspLoad(siteId, start, end, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/isp-load`);
        const response = await this.request.get(path, { start, end }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get top RF interference sources detected by APs.
     * OperationId: getInterference
     */
    async getInterference(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/top-interference`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get VPN tunnel statistics by type.
     * OperationId: getGridDashboardTunnelStats
     */
    async getGridDashboardTunnelStats(siteId, type, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/vpn-tunnel-stats`);
        const response = await this.request.get(path, { type }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPsec tunnel statistics.
     * OperationId: getGridDashboardIpsecTunnelStats
     */
    async getGridDashboardIpsecTunnelStats(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/lpset-tunnel-stats`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get OpenVPN tunnel statistics by type.
     * OperationId: getGridDashboardOpenVpnTunnelStats
     */
    async getGridDashboardOpenVpnTunnelStats(siteId, type, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/open-vpn-tunnel-stats`);
        const response = await this.request.get(path, { type }, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=monitor.js.map