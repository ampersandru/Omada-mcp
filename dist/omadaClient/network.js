/**
 * Network-related operations for the Omada API.
 * Covers internet, LAN, WLAN, firewall, and port forwarding configurations.
 */
export class NetworkOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * Get internet configuration info for a site.
     * OperationId: getInternet
     */
    async getInternetInfo(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get port forwarding status for a specific type (User or UPnP).
     * OperationId: getPortForwardStatus
     *
     * @param type - Port forwarding type. The API expects lowercase: 'user' or 'upnp'.
     * @param siteId - Optional site ID (uses default if not provided)
     * @param page - Page number (required by API, default: 1)
     * @param pageSize - Page size (required by API, range: 1-1000, default: 10)
     */
    async getPortForwardingStatus(type, siteId, page = 1, pageSize = 10, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/insight/port-forwarding/${encodeURIComponent(type)}`);
        const response = await this.request.get(path, {
            page,
            pageSize,
        }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LAN network list (v2 API) with pagination.
     * OperationId: getLanNetworkListV2
     */
    async getLanNetworkList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-networks`, 'v2');
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get LAN profile list with pagination.
     * OperationId: getLanProfileList
     */
    async getLanProfileList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-profiles`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get WLAN group list.
     * OperationId: getWlanGroupList
     */
    async getWlanGroupList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wireless-network/wlans`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get SSID list for a specific WLAN group.
     * OperationId: getSsidList
     *
     * @param wlanId - WLAN group ID (can be obtained from getWlanGroupList)
     */
    async getSsidList(wlanId, siteId, customHeaders) {
        if (!wlanId) {
            throw new Error('A wlanId must be provided. Use getWlanGroupList to get available WLAN group IDs.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wireless-network/wlans/${encodeURIComponent(wlanId)}/ssids`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get detailed information for a specific SSID.
     * OperationId: getSsidDetail
     *
     * @param wlanId - WLAN group ID (can be obtained from getWlanGroupList)
     * @param ssidId - SSID ID (can be obtained from getSsidList)
     */
    async getSsidDetail(wlanId, ssidId, siteId, customHeaders) {
        if (!wlanId) {
            throw new Error('A wlanId must be provided. Use getWlanGroupList to get available WLAN group IDs.');
        }
        if (!ssidId) {
            throw new Error('An ssidId must be provided. Use getSsidList to get available SSID IDs.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wireless-network/wlans/${encodeURIComponent(wlanId)}/ssids/${encodeURIComponent(ssidId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get firewall settings for a site.
     * OperationId: getFirewallSetting
     */
    async getFirewallSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/firewall`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update firewall settings for a site.
     * OperationId: modifyFirewallSetting
     */
    async setFirewallSetting(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/firewall`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get VPN settings for a site.
     * OperationId: getVpn
     */
    async getVpnSettings(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List site-to-site VPN configurations.
     * OperationId: getSiteToSiteVpnList
     */
    async listSiteToSiteVpns(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/site-to-site-vpns`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List client-to-site VPN server configurations.
     * OperationId: getClientToSiteVpnServerList
     */
    async listClientToSiteVpnServers(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/client-to-site-vpn-servers`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List NAT port forwarding rules (all pages, paginated internally).
     * OperationId: getPortForwardingList
     */
    async listPortForwardingRules(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/port-forwardings`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get a single page of NAT port forwarding rules.
     * OperationId: getPortForwardingList (paginated)
     * @param page - Page number (required by API, default: 1)
     * @param pageSize - Page size (required by API, range: 1-1000, default: 10)
     */
    async getPortForwardingListPage(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/port-forwardings`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List one-to-one NAT rules.
     * OperationId: getOneToOneNatList
     */
    async listOneToOneNatRules(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/one-to-one-nat`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List OSG (Gateway) ACL rules.
     * OperationId: getOsgAclList
     */
    async listOsgAcls(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-acls`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List EAP (Access Point) ACL rules.
     * OperationId: getEapAclList
     */
    async listEapAcls(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/eap-acls`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Create a gateway ACL rule.
     * OperationId: createOsgAcl
     */
    async createOsgAcl(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-acls`);
        const response = await this.request.post(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update a gateway ACL rule.
     * OperationId: modifyOsgAcl
     */
    async updateOsgAcl(aclId, payload, siteId, customHeaders) {
        if (!aclId.trim()) {
            throw new Error('aclId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-acls/${encodeURIComponent(aclId)}`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Create an EAP ACL rule.
     * OperationId: createEapAcl
     */
    async createEapAcl(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/eap-acls`);
        const response = await this.request.post(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update an EAP ACL rule.
     * OperationId: modifyEapAcl
     */
    async updateEapAcl(aclId, payload, siteId, customHeaders) {
        if (!aclId.trim()) {
            throw new Error('aclId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/eap-acls/${encodeURIComponent(aclId)}`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Delete an ACL rule by id.
     * OperationId: deleteAcl
     */
    async deleteAcl(aclId, siteId, customHeaders) {
        if (!aclId.trim()) {
            throw new Error('aclId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/${encodeURIComponent(aclId)}`);
        const response = await this.request.delete(path, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List OSW (Switch) ACL rules.
     * OperationId: getOswAclList
     */
    async listOswAcls(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osw-acls`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List static routing rules.
     * OperationId: getStaticRoutingList
     */
    async listStaticRoutes(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/routing/static-routings`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get static routing rules with explicit pagination.
     * OperationId: getGridStaticRouting
     */
    async getGridStaticRouting(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/routing/static-routings`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List policy routing rules.
     * OperationId: getPolicyRoutingList
     */
    async listPolicyRoutes(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/routing/policy-routings`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List RADIUS authentication profiles.
     * OperationId: getRadiusProfileList
     */
    async listRadiusProfiles(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/radius`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List group profiles.
     * OperationId: getGroupProfileList
     */
    async listGroupProfiles(groupType, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const basePath = `/sites/${encodeURIComponent(resolvedSiteId)}/profiles/groups`;
        const path = this.buildPath(groupType ? `${basePath}/${encodeURIComponent(groupType)}` : basePath);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get application control status for a site.
     * OperationId: getApplicationControlStatus
     */
    async getApplicationControlStatus(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/status`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get bandwidth control settings for a site.
     * OperationId: getBandwidthControl
     */
    async getBandwidthControl(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get SSH settings for a site.
     * OperationId: getSshSetting
     */
    async getSshSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ssh`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LED settings for a site.
     * OperationId: getLedSetting
     */
    async getLedSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/led`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List time range profiles.
     * OperationId: getTimeRangeProfileList
     */
    async listTimeRangeProfiles(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/time-range-profiles`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List port schedules.
     * OperationId: getPortScheduleList
     */
    async listPortSchedules(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/port-schedules`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List PoE schedules.
     * OperationId: getPoeScheduleList
     */
    async listPoeSchedules(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/poe-schedules`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get gateway URL filter settings for a site.
     * OperationId: getGatewayUrlFilter
     */
    async getGatewayUrlFilters(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url-filters/gateway`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get EAP (access point) URL filter settings for a site.
     * OperationId: getEapUrlFilter
     */
    async getEapUrlFilters(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url-filters/eap`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List wireless SSIDs across all WLAN groups.
     * OperationId: getSsidListAll
     */
    async listAllSsids(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wireless-network/ssids`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * Get WAN-LAN connectivity status for a site.
     * OperationId: getWanLanStatus
     */
    async getWanLanStatus(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wan-lan-status`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List bandwidth control rules.
     * OperationId: getBandwidthControlRuleList
     */
    async listBandwidthControlRules(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control/rules`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    // -------------------------------------------------------------------------
    // Phase 1 Read Tools — LAN/Network config (issue #38)
    // -------------------------------------------------------------------------
    /**
     * Get LAN network list (v2).
     * OperationId: getLanNetworkListV2
     */
    async getLanNetworkListV2(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-networks`, 'v2');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get interface LAN network bindings (v1).
     * OperationId: getInterfaceLanNetwork
     */
    async getInterfaceLanNetwork(type, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-networks/interface`);
        const params = type !== undefined ? { type } : undefined;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get interface LAN network bindings (v2).
     * OperationId: getInterfaceLanNetworkV2
     */
    async getInterfaceLanNetworkV2(type, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-networks/interface`, 'v2');
        const params = type !== undefined ? { type } : undefined;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get policy routing rules.
     * OperationId: getGridPolicyRouting
     */
    async getGridPolicyRouting(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/routing/policy-routings`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get available static routing interfaces.
     * OperationId: getStaticRoutingInterfaceList
     */
    async getStaticRoutingInterfaceList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/routing/static-routings/interfaces`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get 1:1 NAT rules.
     * OperationId: getGridOtoNats
     */
    async getGridOtoNats(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/one-to-one-nat`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get ALG (Application Layer Gateway) configuration.
     * OperationId: getAlg
     */
    async getAlg(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/alg`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get UPnP setting.
     * OperationId: getUpnpSetting
     */
    async getUpnpSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/upnp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get DDNS entries.
     * OperationId: getDdnsGrid
     */
    async getDdnsGrid(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/ddns`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get DHCP reservations.
     * OperationId: getDhcpReservationGrid
     */
    async getDhcpReservationGrid(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dhcp`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Create a DHCP reservation entry.
     * OperationId: createDhcpReservation
     */
    async createDhcpReservation(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dhcp`);
        const response = await this.request.post(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Modify a DHCP reservation entry.
     * OperationId: modifyDhcpReservation
     */
    async updateDhcpReservation(mac, payload, siteId, customHeaders) {
        if (!mac) {
            throw new Error('A reservation MAC address must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dhcp/${encodeURIComponent(mac)}`);
        const response = await this.request.patch(path, { ...payload, mac }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Delete a DHCP reservation entry.
     * OperationId: deleteDhcpReservation
     */
    async deleteDhcpReservation(mac, siteId, customHeaders) {
        if (!mac) {
            throw new Error('A reservation MAC address must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dhcp/${encodeURIComponent(mac)}`);
        const response = await this.request.delete(path, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IP-MAC binding entries.
     * OperationId: getGridIpMacBinding
     */
    async getGridIpMacBinding(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ip-mac-binds`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IP-MAC binding general setting (global toggle).
     * OperationId: getIpMacBindingGeneralSetting
     */
    async getIpMacBindingGeneralSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ip-mac-bind`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get SNMP configuration.
     * OperationId: getSnmpSetting
     */
    async getSnmpSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/snmp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LLDP global setting.
     * OperationId: getLldpSetting
     */
    async getLldpSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lldp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get remote logging (syslog) configuration.
     * OperationId: getRemoteLoggingSetting
     */
    async getRemoteLoggingSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/remote-logging`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get session limit global setting.
     * OperationId: getSessionLimit
     */
    async getSessionLimit(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/session-limit`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get per-rule session limit rules.
     * OperationId: getGridSessionLimitRule
     */
    async getGridSessionLimitRule(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/session-limit/rules`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get bandwidth control rules.
     * OperationId: getGridBandwidthCtrlRule
     */
    async getGridBandwidthCtrlRule(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control/rules`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Create a bandwidth control rule.
     * OperationId: createBandwidthCtrlRule
     */
    async createBandwidthCtrlRule(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control/rules`);
        const response = await this.request.post(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update a bandwidth control rule.
     * OperationId: modifyBandwidthCtrlRule
     */
    async updateBandwidthCtrlRule(ruleId, payload, siteId, customHeaders) {
        if (!ruleId.trim()) {
            throw new Error('ruleId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control/rules/${encodeURIComponent(ruleId)}`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Delete a bandwidth control rule.
     * OperationId: deleteBandwidthCtrlRule
     */
    async deleteBandwidthCtrlRule(ruleId, siteId, customHeaders) {
        if (!ruleId.trim()) {
            throw new Error('ruleId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/bandwidth-control/rules/${encodeURIComponent(ruleId)}`);
        const response = await this.request.delete(path, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get controller access control configuration.
     * OperationId: getAccessControl
     */
    async getAccessControl(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/access-control`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update the site access control setting.
     * OperationId: modifyAccessControl
     */
    async setAccessControl(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/access-control`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get DNS cache setting.
     * OperationId: getDnsCacheSetting
     */
    async getDnsCacheSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dns-cache`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get DNS proxy configuration.
     * OperationId: getDnsProxy
     */
    async getDnsProxy(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/dns-proxy`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IGMP setting.
     * OperationId: getIgmp
     */
    async getIgmp(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/igmp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WAN load balancing configuration.
     * OperationId: getInternetLoadBalance
     */
    async getInternetLoadBalance(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/load-balance`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WAN port settings.
     * OperationId: getWanPortsConfig
     */
    async getWanPortsConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/ports-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WAN port summary / basic info.
     * OperationId: getInternetBasicPortInfo
     */
    async getInternetBasicPortInfo(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/basic-info`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get full WAN/Internet configuration.
     * OperationId: getInternet
     */
    async getInternet(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get virtual WAN list.
     * OperationId: getGridVirtualWan
     */
    async getGridVirtualWan(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/virtual-wans`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get flat SSID list by device type.
     * OperationId: getSsidsBySite
     */
    async getSsidsBySite(type, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wireless-network/ssids`);
        const response = await this.request.get(path, { type }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get RF planning configuration.
     * OperationId: getRadioFrequencyPlanningConfig
     */
    async getRadioFrequencyPlanningConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/rfPlanning`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get RF planning result.
     * OperationId: getRadioFrequencyPlanningResult
     */
    async getRadioFrequencyPlanningResult(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/rfPlanning/result`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get band steering configuration.
     * OperationId: getBandSteeringSetting
     */
    async getBandSteeringSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/band-steering`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get beacon control setting.
     * OperationId: getBeaconControlSetting
     */
    async getBeaconControlSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/beacon-control`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get channel limit setting.
     * OperationId: getChannelLimitSetting
     */
    async getChannelLimitSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/channel-limit`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get mesh configuration.
     * OperationId: getMeshSetting
     */
    async getMeshSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mesh`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get client roaming configuration.
     * OperationId: getRoamingSetting
     */
    async getRoamingSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/roaming`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get OUI-based device profile list (paginated).
     * OperationId: getOuiProfileList
     */
    async getOuiProfileList(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/oui-profiles`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get MAC authentication global setting.
     * OperationId: getMacAuthSetting
     */
    async getMacAuthSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mac-auth`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get per-SSID MAC authentication settings.
     * OperationId: getMacAuthSsids
     */
    async getMacAuthSsids(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mac-auth/ssids`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get MAC filtering global setting.
     * OperationId: getMacFilteringGeneralSetting
     */
    async getMacFilteringGeneralSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mac-filter`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get MAC allow-list entries (paginated).
     * OperationId: getGridAllowMacFiltering
     */
    async getGridAllowMacFiltering(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mac-filters/allow`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get MAC deny-list entries (paginated).
     * OperationId: getGridDenyMacFiltering
     */
    async getGridDenyMacFiltering(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/mac-filters/deny`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get 802.1X switch setting.
     * OperationId: getSwitchDot1xSetting
     */
    async getSwitchDot1xSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dot1x`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get 802.1X EAP setting.
     * OperationId: getEapDot1xSetting
     */
    async getEapDot1xSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dot1x/eap`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // Firewall / ACL / IPS / URL-filter tools (issue #37)
    /**
     * Get ACL config type setting (L2/L3 mode).
     * OperationId: getAclConfigTypeSetting
     */
    async getAclConfigTypeSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-config-mode`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update ACL config type setting (L2/L3 mode).
     * OperationId: modifyOsgConfigMode
     */
    async setAclConfigTypeSetting(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-config-mode`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get custom gateway ACL rules list (paginated).
     * OperationId: getOsgCustomAclList
     */
    async getOsgCustomAclList(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osg-custom-acls`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get switch ACL list (paginated).
     * OperationId: getOswAclList
     */
    async getOswAclList(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/acls/osw-acls`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPS global configuration.
     * OperationId: getIpsConfig
     */
    async getIpsConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/network-security/ips`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPS signature list (paginated).
     * OperationId: getGridSignature
     */
    async getGridSignature(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/network-security/ips/signature`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPS allow list (paginated, optional searchKey).
     * OperationId: getGridAllowList
     */
    async getGridAllowList(page, pageSize, searchKey, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/network-security/ips/grid/allow-list`);
        const params = { page, pageSize };
        if (searchKey !== undefined)
            params.searchKey = searchKey;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPS block list (paginated, optional searchKey).
     * OperationId: getGridBlockList
     */
    async getGridBlockList(page, pageSize, searchKey, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/network-security/ips/grid/block-list`);
        const params = { page, pageSize };
        if (searchKey !== undefined)
            params.searchKey = searchKey;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get DDoS/attack defense configuration.
     * OperationId: getAttackDefenseSetting
     */
    async getAttackDefenseSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/attack-defense`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get URL filter global setting.
     * OperationId: getUrlFilterGeneral
     */
    async getUrlFilterGeneral(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url-filters/globalUrlFilter`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get URL filter gateway rules (paginated).
     * OperationId: getGridGatewayRule
     */
    async getGridGatewayRule(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url-filters/gateway`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get URL filter AP rules (paginated).
     * OperationId: getGridEapRule
     */
    async getGridEapRule(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/url-filters/eap`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // VPN tools (issue #39)
    /**
     * Get single site-to-site VPN detail by ID.
     * OperationId: getSiteToSiteVpnInfo
     */
    async getSiteToSiteVpnInfo(vpnId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/site-to-site-vpns/${encodeURIComponent(vpnId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List WireGuard tunnels (paginated, optional searchKey).
     * OperationId: listWireguard
     */
    async listWireguard(page, pageSize, searchKey, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/wireguards`);
        const params = { page, pageSize };
        if (searchKey !== undefined)
            params.searchKey = searchKey;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List WireGuard peers (paginated).
     * OperationId: listPeer
     */
    async listWireguardPeers(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/wireguard-peers`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WireGuard summary.
     * OperationId: getWireguardSummary
     */
    async getWireguardSummary(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/wireguard-summarys`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get client-to-site VPN client list.
     * OperationId: getClientToSiteVpnClientList
     */
    async listClientToSiteVpnClients(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/client-to-site-vpn-clients`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get single client-to-site VPN server detail by ID.
     * OperationId: getClientToSiteVpnServerInfo
     */
    async getClientToSiteVpnServerInfo(vpnId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/client-to-site-vpn-servers/${encodeURIComponent(vpnId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get SSL VPN server configuration.
     * OperationId: getSslVpnServerSetting
     */
    async getSslVpnServerSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/ssl-vpn-server/setting`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPsec failover configuration (paginated).
     * OperationId: getGridIpsecFailover
     */
    async getGridIpsecFailover(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/ipsec_failovers`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // Profiles & Policies tools (issue #40)
    /**
     * List service type profiles (paginated).
     * OperationId: listServiceType
     */
    async listServiceType(page, pageSize, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/service-type`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get service type profile summary.
     * OperationId: getServiceTypeSummary
     */
    async getServiceTypeSummary(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/service-type-summary`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get group profiles filtered by type.
     * OperationId: getGroupProfilesByType
     */
    async getGroupProfilesByType(groupType, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/groups/${encodeURIComponent(groupType)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List LDAP profiles.
     * OperationId: getLdapProfileList
     */
    async getLdapProfileList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/ldap`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List RADIUS server local users (paginated, optional sort).
     * OperationId: getRadiusUserList
     */
    async getRadiusUserList(page, pageSize, sortUsername, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/radius-server/users`);
        const params = { page, pageSize };
        if (sortUsername !== undefined)
            params['sorts.username'] = sortUsername;
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List PPSK (Private PSK) profiles.
     * OperationId: getPPSKProfiles
     */
    async getPPSKProfiles(type, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ppsk-profiles`);
        const response = await this.request.get(path, { type }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List Bonjour/mDNS service profiles.
     * OperationId: listMdnsProfile
     */
    async listMdnsProfile(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/bonjour-service`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // network-wan additions (#74)
    // -------------------------------------------------------------------------
    /**
     * Get ISP band scan result for a WAN port.
     * OperationId: getBandScanResult
     */
    async getIspBandScan(portUuid, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/band-scan/${encodeURIComponent(portUuid)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get the disable-NAT grid for wired networks (entries where NAT is disabled on a WAN interface).
     * OperationId: getDisableNatGrid
     */
    async getDisableNatList(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/wired-networks/disable-nats`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LTE/cellular WAN port configuration.
     * OperationId: getLteWanPortsConfig
     */
    async getLtePortConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/lte/ports-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get detailed WAN port configuration (alias for getWanPortsConfig).
     * OperationId: getWanPortsConfig
     */
    getWanPortDetail(siteId, customHeaders) {
        return this.getWanPortsConfig(siteId, customHeaders);
    }
    /**
     * Get ISP scan result for a WAN port.
     * OperationId: getIspScanResult
     */
    async getWanIspProfile(portUuid, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/internet/isp-scan/${encodeURIComponent(portUuid)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get QoS configuration for gateway WAN ports.
     * OperationId: getQosWans
     */
    async getWanQosConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/qos/gateway/wans`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WAN traffic usage statistics.
     * OperationId: getTrafficActivities
     */
    async getWanUsageStats(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/traffic-activities`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get one-to-one NAT config (WAN NAT config view).
     * OperationId: getGridOtoNats
     */
    async getWanNatConfig(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/nat/one-to-one-nat`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // network-lan additions (#74)
    // -------------------------------------------------------------------------
    /**
     * Get VLAN interface config for a switch.
     * OperationId: getOswVlanIf
     */
    async getSwitchVlanInterface(switchMac, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vlan-interface/switches/${encodeURIComponent(switchMac)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LAN DNS rules list.
     * OperationId: getGridLanDns
     */
    async getLanDnsRules(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/lan/dns`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LAN profile usage on EAP/switch devices.
     * OperationId: getUseLanProfileES
     */
    async getLanProfileEsUsage(profileId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/lan-profiles/${encodeURIComponent(profileId)}/es`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get client distribution breakdown across network segments.
     * OperationId: getClientsDistribution
     */
    async getLanClientCount(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/dashboard/client-distribution`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // network-routing additions (#74)
    // -------------------------------------------------------------------------
    /**
     * Get OSPF process configuration.
     * OperationId: getGridOspfProcess
     */
    async getOspfProcess(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ospf/process`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get OSPF interface configuration.
     * OperationId: getGridOspfInterface
     */
    async getOspfInterface(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ospf/interface`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get VRRP configuration for OSW devices.
     * OperationId: getGridOswVrrp
     */
    async getVrrpConfig(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/osw-vrrp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get OSPF neighbor devices.
     * OperationId: getOspfDevice
     */
    async getOspfNeighbors(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ospf/device`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // network-services additions (#74)
    // -------------------------------------------------------------------------
    /**
     * Get DNS cache data list.
     * OperationId: getDnsCacheList
     */
    async getDnsCacheDataList(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/dns-cache-data`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get IPTV service setting.
     * OperationId: getIptv
     */
    async getIptvSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/service/iptv`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get NTP server configuration and status.
     * OperationId: getNtpServerStatus
     */
    async getNtpSetting(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/setting/ntp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // security-vpn additions (#75)
    // -------------------------------------------------------------------------
    /**
     * Get global RADIUS proxy configuration.
     * OperationId: getRadiusProxy
     */
    async getRadiusProxyConfig(customHeaders) {
        const path = this.buildPath('/global/controller/setting/network/radius-proxy');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get gateway QoS class rules (paginated).
     * OperationId: getGatewayQosClassRules
     */
    async getGatewayQosClassRules(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/qos/gateway/class-rules`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get gateway bandwidth control detail settings.
     * OperationId: getBandwidthCtrlDetail
     */
    async getBandwidthCtrlDetail(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/qos/gateway/bwcs`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get application control rules (paginated).
     * OperationId: getAppControlRules
     */
    async getAppControlRules(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/rules`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Create an application control rule.
     * OperationId: addRule
     */
    async createAppControlRule(payload, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/rules`);
        const response = await this.request.post(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update an application control rule.
     * OperationId: editRule
     */
    async updateAppControlRule(ruleId, payload, siteId, customHeaders) {
        if (!ruleId.trim()) {
            throw new Error('ruleId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/rules/${encodeURIComponent(ruleId)}`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Delete an application control rule.
     * OperationId: deleteRules
     */
    async deleteAppControlRule(ruleId, siteId, customHeaders) {
        if (!ruleId.trim()) {
            throw new Error('ruleId is required.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/rules/${encodeURIComponent(ruleId)}`);
        const response = await this.request.delete(path, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get application control categories (families).
     * OperationId: getAppControlCategories
     */
    async getAppControlCategories(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/families`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get application control applications (paginated).
     * OperationId: getApplications
     */
    async getApplications(page = 1, pageSize = 10, searchKey, filtersFamilyId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/applicationControl/applications`);
        const params = {
            page,
            pageSize,
            ...(searchKey ? { searchKey } : {}),
            ...(filtersFamilyId !== undefined ? { filtersFamilyId } : {}),
        };
        const response = await this.request.get(path, params, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get gateway QoS policy (tag outbound traffic settings).
     * OperationId: getQosPolicy
     */
    async getQosPolicy(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/qos/gateway/tag-outbound-traffic`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get gateway VoIP/traffic prioritization settings.
     * OperationId: getTrafficPriority
     */
    async getTrafficPriority(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/qos/gateway/voip-prioritization`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get VPN user list (paginated).
     * OperationId: getVpnUserList
     */
    async getVpnUserList(page = 1, pageSize = 10, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/users`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get VPN users for a specific client-to-site VPN server.
     * OperationId: getVpnUserDetail
     */
    async getVpnUserDetail(vpnId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/vpn/client-to-site-vpn-servers/${encodeURIComponent(vpnId)}/users`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get Google LDAP profile for a site.
     * OperationId: getGoogleLdapProfile
     */
    async getGoogleLdapProfile(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/profiles/ldap/google`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get PPSK user group/profile detail by profile ID.
     * OperationId: getPpskUserGroup
     */
    async getPpskUserGroup(profileId, siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/ppsk-profile/${encodeURIComponent(profileId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get user role profiles (global).
     * OperationId: getUserRoleProfile
     */
    async getUserRoleProfile(customHeaders) {
        const path = this.buildPath('/roles');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get portal profiles for a site.
     * OperationId: getPortalProfile
     */
    async getPortalProfile(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/portals`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get multicast rate limit setting for a site.
     * OperationId: getMulticastRateLimitByOpenApi
     */
    async getMulticastRateLimit(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/multicast-rate-limit`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=network.js.map