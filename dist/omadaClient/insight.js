/**
 * Insight operations for the Omada API.
 * Covers site-level threat management, WIDS, rogue APs, and VPN stats.
 */
export class InsightOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * List site-level threat management events.
     * OperationId: getSiteThreatManagementList
     */
    async listSiteThreatManagement(options, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ips/grid/threat-management`);
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
     * Get WIDS (Wireless Intrusion Detection System) information for a site.
     * OperationId: getWids
     */
    async getWids(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/wids`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WIDS blacklist for a site.
     * OperationId: getWidsBlacklist
     */
    async getWidsBlacklist(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/wids/blacklist`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get rogue APs detected in a site.
     * OperationId: getRogueAps
     */
    async getRogueAps(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/rogueaps`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get VPN tunnel statistics for a site.
     * OperationId: getVpnTunnelStats
     */
    async getVpnTunnelStats(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/vpn/stats/tunnel`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPsec VPN statistics for a site.
     * OperationId: getIpsecVpnStats
     */
    async getIpsecVpnStats(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/vpn/stats/ipsec`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get insight client list for a site.
     * OperationId: getInsightClients
     */
    async listInsightClients(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/clients`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get routing table for a site.
     * OperationId: getGridRouting
     */
    async getRoutingTable(type, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/routing/${encodeURIComponent(type)}`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get threat detail by ID for a site.
     * OperationId: getThreatDetail
     *
     * @param threatId - The ID of the threat to retrieve
     * @param time - Unix timestamp in seconds to scope the threat lookup. Defaults to current time if not provided.
     * @param siteId - Optional site ID (uses default if not provided)
     */
    async getThreatDetail(threatId, time, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ips/threat/${encodeURIComponent(threatId)}`);
        const effectiveTime = time ?? Math.floor(Date.now() / 1000);
        const params = { time: effectiveTime };
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=insight.js.map