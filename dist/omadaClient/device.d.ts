import type { CustomHeaders, GetDeviceStatsOptions, OmadaDeviceInfo, OmadaDeviceStats, OswStackDetail } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Device-related operations for the Omada API.
 */
export declare class DeviceOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * List all devices in a site.
     */
    listDevices(siteId?: string, customHeaders?: CustomHeaders): Promise<OmadaDeviceInfo[]>;
    /**
     * Get a specific device by MAC address or device ID.
     */
    getDevice(identifier: string, siteId?: string, customHeaders?: CustomHeaders): Promise<OmadaDeviceInfo | undefined>;
    /**
     * Get detailed information about a switch stack.
     */
    getSwitchStackDetail(stackId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<OswStackDetail>;
    /**
     * Search for devices globally across all sites the user has access to.
     */
    searchDevices(searchKey: string, customHeaders?: CustomHeaders): Promise<OmadaDeviceInfo[]>;
    /**
     * Get statistics for global adopted devices with filtering and pagination.
     */
    listDevicesStats(options: GetDeviceStatsOptions, customHeaders?: CustomHeaders): Promise<OmadaDeviceStats>;
    /**
     * Get detailed information for a specific switch.
     * OperationId: getSwitch
     */
    getSwitchDetail(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get detailed information for a specific gateway.
     * OperationId: getGateway
     */
    getGatewayDetail(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WAN status for a specific gateway.
     * OperationId: getGatewayWanPortStatus
     */
    getGatewayWanStatus(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LAN status for a specific gateway.
     * OperationId: getGatewayLanPortStatus
     */
    getGatewayLanStatus(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get port information for a specific gateway.
     * OperationId: getGatewayPorts
     */
    getGatewayPorts(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get detailed information for a specific AP.
     * OperationId: getAp
     */
    getApDetail(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get radio information for a specific AP.
     * OperationId: getApRadios
     */
    getApRadios(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get port information for a switch stack.
     * OperationId: getStackPorts
     */
    getStackPorts(stackId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List devices pending adoption in a site.
     * OperationId: getGridPendingDevices
     */
    listPendingDevices(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get all devices in a site including offline devices.
     * OperationId: getAllDeviceBySite
     */
    getAllDeviceBySite(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get latest firmware info for a device.
     * OperationId: getFirmwareInfo
     */
    getFirmwareInfo(deviceMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get auto-check upgrade plan list.
     * OperationId: getGridAutoCheckUpgrade
     */
    getGridAutoCheckUpgrade(page: number, pageSize: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List switch VLAN network assignments.
     * OperationId: listSwitchNetworks
     */
    listSwitchNetworks(switchMac: string, page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get switch general configuration.
     * OperationId: getGeneralConfig (switch)
     */
    getSwitchGeneralConfig(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get cable test logs for a switch.
     * OperationId: getCableTestLogs
     */
    getCableTestLogs(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get cable test full results for a switch.
     * OperationId: getCableTestFullResults
     */
    getCableTestFullResults(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get stack LAG list.
     * OperationId: getOswStackLagList
     */
    getOswStackLagList(stackId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get stack VLAN network list.
     * OperationId: getStackNetworkList
     */
    getStackNetworkList(stackId: string, page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP uplink configuration.
     * OperationId: getApUplinkConfig
     */
    getApUplinkConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get AP per-radio configuration.
     * OperationId: getRadiosConfig
     */
    getRadiosConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update AP per-radio configuration.
     * OperationId: modifyRadiosConfig
     */
    setRadiosConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP VLAN configuration.
     * OperationId: getApVlanConfig
     */
    getApVlanConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get per-AP mesh link statistics.
     * OperationId: getMeshStatistics
     */
    getMeshStatistics(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get RF scan results for an AP.
     * OperationId: getRFScanResult
     */
    getRFScanResult(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get speed test results for an AP.
     * OperationId: getSpeedTestResults
     */
    getSpeedTestResults(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP SNMP configuration.
     * OperationId: getApSnmpConfig
     */
    getApSnmpConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP LLDP configuration.
     * OperationId: getApLldpConfig
     */
    getApLldpConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP general configuration.
     * OperationId: getGeneralConfig_2
     */
    getApGeneralConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update AP general configuration.
     * OperationId: modifyGeneralConfig_2
     */
    setApGeneralConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP wired uplink detail.
     * OperationId: getUplinkWiredDetail
     */
    getUplinkWiredDetail(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get AP wired downlink device list.
     * OperationId: getDownlinkWiredDevices
     */
    getDownlinkWiredDevices(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    getFirmwareUpgradePlan(page: number, pageSize: number, customHeaders?: CustomHeaders): Promise<unknown>;
    getUpgradeLogs(page: number, pageSize: number, customHeaders?: CustomHeaders): Promise<unknown>;
    getDeviceTagList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getApQosConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setApQosConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getApIpv6Config(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setApIpv6Config(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesGatewaysGeneralConfig(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysGeneralConfig(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysConfigGeneral(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysConfigServices(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysConfigAdvanced(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysConfigRadios(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysConfigWlans(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysPortConfig(gatewayMac: string, portName: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesGatewaysMultiPortsConfig(gatewayMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesGatewaysPin(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesGatewaysSimCardUsed(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesHealthGatewaysWansDetails(gatewayMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsIpSetting(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsIpSetting(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsChannelLimit(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsAvailableChannel(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setApChannelConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getAfcConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setAfcConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsLoadBalance(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsLoadBalance(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsOfdma(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsOfdma(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsPowerSaving(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsPowerSaving(apMac: string, payload: {
        timeEnable: boolean;
        bandEnable: boolean;
        startTimeH?: number;
        startTimeM?: number;
        endTimeH?: number;
        endTimeM?: number;
        bands?: number[];
        idleDuration?: number;
    }, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsTrunkSetting(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsTrunkSetting(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsChannelLimit(apMac: string, payload: {
        channelLimitType: number;
    }, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesApsBridge(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setSitesApsBridge(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setApServiceConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setApWlanGroup(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getAntennaGainConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setAntennaGainConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    listSitesApsPorts(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    setSitesApsPortConfig(apMac: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesSwitchesEs(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesSwitchesEsGeneralConfig(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    listSitesCableTestSwitchesPorts(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    listSitesCableTestSwitchesIncrementResults(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    getUpgradeOverviewCritical(customHeaders?: CustomHeaders): Promise<unknown>;
    getUpgradeOverviewTryBeta(customHeaders?: CustomHeaders): Promise<unknown>;
    listUpgradeFirmwares(page: number, pageSize: number, customHeaders?: CustomHeaders): Promise<unknown>;
    listUpgradeOverviewFirmwares(page: number, pageSize: number, customHeaders?: CustomHeaders): Promise<unknown>;
    listSitesStacks(siteId?: string, page?: number, pageSize?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    getSitesDeviceWhiteList(siteId?: string, page?: number, pageSize?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get load balance configuration for a specific AP.
     * OperationId: getApLoadBalanceConfig
     * Delegates to getSitesApsLoadBalance to avoid duplication and ensure consistent apMac validation.
     */
    getApLoadBalance(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OFDMA configuration for a specific AP.
     * OperationId: getApOfdmaConfig
     * Delegates to getSitesApsOfdma to avoid duplication and ensure consistent apMac validation.
     */
    getApOfdmaConfig(apMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
