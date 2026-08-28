/**
 * Device-related operations for the Omada API.
 */
export class DeviceOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * List all devices in a site.
     */
    async listDevices(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        return await this.request.fetchPaginated(this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices`), {}, customHeaders);
    }
    /**
     * Get a specific device by MAC address or device ID.
     */
    async getDevice(identifier, siteId, customHeaders) {
        const devices = await this.listDevices(siteId, customHeaders);
        return devices.find((device) => device.mac === identifier || device.deviceId === identifier);
    }
    /**
     * Get detailed information about a switch stack.
     */
    async getSwitchStackDetail(stackId, siteId, customHeaders) {
        if (!stackId) {
            throw new Error('A stack id must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/stacks/${encodeURIComponent(stackId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Search for devices globally across all sites the user has access to.
     */
    async searchDevices(searchKey, customHeaders) {
        if (!searchKey) {
            throw new Error('A search key must be provided.');
        }
        const path = this.buildPath(`/devices?searchKey=${encodeURIComponent(searchKey)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get statistics for global adopted devices with filtering and pagination.
     */
    async listDevicesStats(options, customHeaders) {
        const queryParams = new URLSearchParams();
        queryParams.append('page', options.page.toString());
        queryParams.append('pageSize', options.pageSize.toString());
        if (options.searchMacs) {
            queryParams.append('searchMacs', options.searchMacs);
        }
        if (options.searchNames) {
            queryParams.append('searchNames', options.searchNames);
        }
        if (options.searchModels) {
            queryParams.append('searchModels', options.searchModels);
        }
        if (options.searchSns) {
            queryParams.append('searchSns', options.searchSns);
        }
        if (options.filterTag) {
            queryParams.append('filters.tag', options.filterTag);
        }
        if (options.filterDeviceSeriesType) {
            queryParams.append('filters.deviceSeriesType', options.filterDeviceSeriesType);
        }
        const path = this.buildPath(`/devices/stat?${queryParams.toString()}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get detailed information for a specific switch.
     * OperationId: getSwitch
     */
    async getSwitchDetail(switchMac, siteId, customHeaders) {
        if (!switchMac) {
            throw new Error('A switchMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/switches/${encodeURIComponent(switchMac)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get detailed information for a specific gateway.
     * OperationId: getGateway
     */
    async getGatewayDetail(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac) {
            throw new Error('A gatewayMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get WAN status for a specific gateway.
     * OperationId: getGatewayWanPortStatus
     */
    async getGatewayWanStatus(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac) {
            throw new Error('A gatewayMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/wan-status`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get LAN status for a specific gateway.
     * OperationId: getGatewayLanPortStatus
     */
    async getGatewayLanStatus(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac) {
            throw new Error('A gatewayMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/lan-status`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get port information for a specific gateway.
     * OperationId: getGatewayPorts
     */
    async getGatewayPorts(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac) {
            throw new Error('A gatewayMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/ports`);
        const response = await this.request.get(path, undefined, customHeaders);
        const result = this.request.ensureSuccess(response);
        return Array.isArray(result) ? result : [];
    }
    /**
     * Get detailed information for a specific AP.
     * OperationId: getAp
     */
    async getApDetail(apMac, siteId, customHeaders) {
        if (!apMac) {
            throw new Error('An apMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get radio information for a specific AP.
     * OperationId: getApRadios
     */
    async getApRadios(apMac, siteId, customHeaders) {
        if (!apMac) {
            throw new Error('An apMac must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/radios`);
        const response = await this.request.get(path, undefined, customHeaders);
        const result = this.request.ensureSuccess(response);
        return Array.isArray(result) ? result : [];
    }
    /**
     * Get port information for a switch stack.
     * OperationId: getStackPorts
     */
    async getStackPorts(stackId, siteId, customHeaders) {
        if (!stackId) {
            throw new Error('A stackId must be provided.');
        }
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/stacks/${encodeURIComponent(stackId)}/ports`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    /**
     * List devices pending adoption in a site.
     * OperationId: getGridPendingDevices
     */
    async listPendingDevices(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/grid/devices/pending`);
        return await this.request.fetchPaginated(path, {}, customHeaders);
    }
    // -------------------------------------------------------------------------
    // Device Management — Phase 1 Read Tools (issue #36)
    // -------------------------------------------------------------------------
    /**
     * Get all devices in a site including offline devices.
     * OperationId: getAllDeviceBySite
     */
    async getAllDeviceBySite(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices/all`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get latest firmware info for a device.
     * OperationId: getFirmwareInfo
     */
    async getFirmwareInfo(deviceMac, siteId, customHeaders) {
        if (!deviceMac)
            throw new Error('A deviceMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices/${encodeURIComponent(deviceMac)}/latest-firmware-info`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get auto-check upgrade plan list.
     * OperationId: getGridAutoCheckUpgrade
     */
    async getGridAutoCheckUpgrade(page, pageSize, customHeaders) {
        const path = this.buildPath('/upgrade/autoCheck');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * List switch VLAN network assignments.
     * OperationId: listSwitchNetworks
     */
    async listSwitchNetworks(switchMac, page, pageSize, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/switches/${encodeURIComponent(switchMac)}/networks`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get switch general configuration.
     * OperationId: getGeneralConfig (switch)
     */
    async getSwitchGeneralConfig(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/switches/${encodeURIComponent(switchMac)}/general-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get cable test logs for a switch.
     * OperationId: getCableTestLogs
     */
    async getCableTestLogs(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/cable-test/switches/${encodeURIComponent(switchMac)}/logs`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get cable test full results for a switch.
     * OperationId: getCableTestFullResults
     */
    async getCableTestFullResults(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/cable-test/switches/${encodeURIComponent(switchMac)}/full-results`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get stack LAG list.
     * OperationId: getOswStackLagList
     */
    async getOswStackLagList(stackId, siteId, customHeaders) {
        if (!stackId)
            throw new Error('A stackId must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/stacks/${encodeURIComponent(stackId)}/lags`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get stack VLAN network list.
     * OperationId: getStackNetworkList
     */
    async getStackNetworkList(stackId, page, pageSize, siteId, customHeaders) {
        if (!stackId)
            throw new Error('A stackId must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/stacks/${encodeURIComponent(stackId)}/networks`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP uplink configuration.
     * OperationId: getApUplinkConfig
     */
    async getApUplinkConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/uplink-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP per-radio configuration.
     * OperationId: getRadiosConfig
     */
    async getRadiosConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/radio-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update AP per-radio configuration.
     * OperationId: modifyRadiosConfig
     */
    async setRadiosConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/radio-config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP VLAN configuration.
     * OperationId: getApVlanConfig
     */
    async getApVlanConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/vlan`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get per-AP mesh link statistics.
     * OperationId: getMeshStatistics
     */
    async getMeshStatistics(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/mesh/statistics`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get RF scan results for an AP.
     * OperationId: getRFScanResult
     */
    async getRFScanResult(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/rf-scan-result`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get speed test results for an AP.
     * OperationId: getSpeedTestResults
     */
    async getSpeedTestResults(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/speed-test-result`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP SNMP configuration.
     * OperationId: getApSnmpConfig
     */
    async getApSnmpConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/snmp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP LLDP configuration.
     * OperationId: getApLldpConfig
     */
    async getApLldpConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/lldp`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP general configuration.
     * OperationId: getGeneralConfig_2
     */
    async getApGeneralConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/general-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Update AP general configuration.
     * OperationId: modifyGeneralConfig_2
     */
    async setApGeneralConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/general-config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP wired uplink detail.
     * OperationId: getUplinkWiredDetail
     */
    async getUplinkWiredDetail(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/wired-uplink`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get AP wired downlink device list.
     * OperationId: getDownlinkWiredDevices
     */
    async getDownlinkWiredDevices(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/wired-downlink`);
        const response = await this.request.get(path, undefined, customHeaders);
        const result = this.request.ensureSuccess(response);
        return result?.wiredDownlinkList ?? [];
    }
    // -------------------------------------------------------------------------
    // Device Management — Phase 2 Read Tools (issue #73)
    // -------------------------------------------------------------------------
    // --- devices-general ---
    async getFirmwareUpgradePlan(page, pageSize, customHeaders) {
        const path = this.buildPath('/upgrade/overview/plans');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getUpgradeLogs(page, pageSize, customHeaders) {
        const path = this.buildPath('/upgrade/overview/logs');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getDeviceTagList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/devices/tag`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // --- devices-ap ---
    async getApQosConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/qos`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setApQosConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/qos`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getApIpv6Config(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ipv6-setting`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setApIpv6Config(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ipv6-setting`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // -------------------------------------------------------------------------
    // Device Management — Phase 2 additional Read Tools (issue #73)
    // -------------------------------------------------------------------------
    // --- devices-gateway new ---
    async getSitesGatewaysGeneralConfig(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/general-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysGeneralConfig(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/general-config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysConfigGeneral(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/config/general`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysConfigServices(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/config/services`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysConfigAdvanced(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/config/advanced`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysConfigRadios(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/config/radios`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysConfigWlans(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/config/wlans`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysPortConfig(gatewayMac, portName, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        if (!portName)
            throw new Error('A portName must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/ports/${encodeURIComponent(portName)}/config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesGatewaysMultiPortsConfig(gatewayMac, payload, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/multi-ports/config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesGatewaysPin(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/pin`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesGatewaysSimCardUsed(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/gateways/${encodeURIComponent(gatewayMac)}/simCardUsed`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesHealthGatewaysWansDetails(gatewayMac, siteId, customHeaders) {
        if (!gatewayMac)
            throw new Error('A gatewayMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/health/gateways/${encodeURIComponent(gatewayMac)}/wans/details`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // --- devices-ap new ---
    async getSitesApsIpSetting(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ip-setting`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsIpSetting(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ip-setting`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsChannelLimit(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/channel-limit`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsAvailableChannel(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/available-channel`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setApChannelConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/channel-config`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getAfcConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/afc-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setAfcConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/afc-config`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsLoadBalance(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/load-balance`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsLoadBalance(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/load-balance`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsOfdma(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ofdma`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsOfdma(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ofdma`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsPowerSaving(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/power-saving`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsPowerSaving(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/power-saving`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsTrunkSetting(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/trunk-setting`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsTrunkSetting(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/trunk-setting`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsChannelLimit(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/channel-limit`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesApsBridge(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/bridge`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setSitesApsBridge(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/bridge`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setApServiceConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/service-config`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setApWlanGroup(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/wlan-group`);
        const response = await this.request.put(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getAntennaGainConfig(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/antenna-gain`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async setAntennaGainConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/antenna-gain`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async listSitesApsPorts(apMac, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ports`);
        const response = await this.request.get(path, undefined, customHeaders);
        const result = this.request.ensureSuccess(response);
        return Array.isArray(result) ? result : [];
    }
    async setSitesApsPortConfig(apMac, payload, siteId, customHeaders) {
        if (!apMac)
            throw new Error('An apMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/aps/${encodeURIComponent(apMac)}/ports`);
        const response = await this.request.patch(path, payload, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // --- devices-switch new ---
    async getSitesSwitchesEs(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/switches/es/${encodeURIComponent(switchMac)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesSwitchesEsGeneralConfig(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/switches/es/${encodeURIComponent(switchMac)}/general-config`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async listSitesCableTestSwitchesPorts(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/cable-test/switches/${encodeURIComponent(switchMac)}/ports`);
        const response = await this.request.get(path, undefined, customHeaders);
        const result = this.request.ensureSuccess(response);
        return Array.isArray(result) ? result : [];
    }
    async listSitesCableTestSwitchesIncrementResults(switchMac, siteId, customHeaders) {
        if (!switchMac)
            throw new Error('A switchMac must be provided.');
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/cable-test/switches/${encodeURIComponent(switchMac)}/increment-results`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    // --- devices-general new ---
    async getUpgradeOverviewCritical(customHeaders) {
        const path = this.buildPath('/upgrade/overview/critical');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getUpgradeOverviewTryBeta(customHeaders) {
        const path = this.buildPath('/upgrade/overview/try-beta');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async listUpgradeFirmwares(page, pageSize, customHeaders) {
        const path = this.buildPath('/upgrade/firmwares');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async listUpgradeOverviewFirmwares(page, pageSize, customHeaders) {
        const path = this.buildPath('/upgrade/overview/firmwares');
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async listSitesStacks(siteId, page, pageSize, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/stacks`);
        const response = await this.request.get(path, { page: page ?? 1, pageSize: pageSize ?? 10 }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    async getSitesDeviceWhiteList(siteId, page, pageSize, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/device-white-list`);
        const response = await this.request.get(path, { page: page ?? 1, pageSize: pageSize ?? 10 }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get load balance configuration for a specific AP.
     * OperationId: getApLoadBalanceConfig
     * Delegates to getSitesApsLoadBalance to avoid duplication and ensure consistent apMac validation.
     */
    getApLoadBalance(apMac, siteId, customHeaders) {
        return this.getSitesApsLoadBalance(apMac, siteId, customHeaders);
    }
    /**
     * Get OFDMA configuration for a specific AP.
     * OperationId: getApOfdmaConfig
     * Delegates to getSitesApsOfdma to avoid duplication and ensure consistent apMac validation.
     */
    getApOfdmaConfig(apMac, siteId, customHeaders) {
        return this.getSitesApsOfdma(apMac, siteId, customHeaders);
    }
}
//# sourceMappingURL=device.js.map