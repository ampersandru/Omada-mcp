import type { CustomHeaders, PaginatedResult } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Network-related operations for the Omada API.
 * Covers internet, LAN, WLAN, firewall, and port forwarding configurations.
 */
export declare class NetworkOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string, version?: string) => string);
    /**
     * Get internet configuration info for a site.
     * OperationId: getInternet
     */
    getInternetInfo(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get port forwarding status for a specific type (User or UPnP).
     * OperationId: getPortForwardStatus
     *
     * @param type - Port forwarding type. The API expects lowercase: 'user' or 'upnp'.
     * @param siteId - Optional site ID (uses default if not provided)
     * @param page - Page number (required by API, default: 1)
     * @param pageSize - Page size (required by API, range: 1-1000, default: 10)
     */
    getPortForwardingStatus(type: 'user' | 'upnp', siteId?: string, page?: number, pageSize?: number, customHeaders?: CustomHeaders): Promise<PaginatedResult<unknown>>;
    /**
     * Get LAN network list (v2 API) with pagination.
     * OperationId: getLanNetworkListV2
     */
    getLanNetworkList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get LAN profile list with pagination.
     * OperationId: getLanProfileList
     */
    getLanProfileList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get WLAN group list.
     * OperationId: getWlanGroupList
     */
    getWlanGroupList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get SSID list for a specific WLAN group.
     * OperationId: getSsidList
     *
     * @param wlanId - WLAN group ID (can be obtained from getWlanGroupList)
     */
    getSsidList(wlanId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get detailed information for a specific SSID.
     * OperationId: getSsidDetail
     *
     * @param wlanId - WLAN group ID (can be obtained from getWlanGroupList)
     * @param ssidId - SSID ID (can be obtained from getSsidList)
     */
    getSsidDetail(wlanId: string, ssidId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get firewall settings for a site.
     * OperationId: getFirewallSetting
     */
    getFirewallSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update firewall settings for a site.
     * OperationId: modifyFirewallSetting
     */
    setFirewallSetting(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VPN settings for a site.
     * OperationId: getVpn
     */
    getVpnSettings(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List site-to-site VPN configurations.
     * OperationId: getSiteToSiteVpnList
     */
    listSiteToSiteVpns(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List client-to-site VPN server configurations.
     * OperationId: getClientToSiteVpnServerList
     */
    listClientToSiteVpnServers(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List NAT port forwarding rules (all pages, paginated internally).
     * OperationId: getPortForwardingList
     */
    listPortForwardingRules(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get a single page of NAT port forwarding rules.
     * OperationId: getPortForwardingList (paginated)
     * @param page - Page number (required by API, default: 1)
     * @param pageSize - Page size (required by API, range: 1-1000, default: 10)
     */
    getPortForwardingListPage(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List one-to-one NAT rules.
     * OperationId: getOneToOneNatList
     */
    listOneToOneNatRules(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List OSG (Gateway) ACL rules.
     * OperationId: getOsgAclList
     */
    listOsgAcls(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List EAP (Access Point) ACL rules.
     * OperationId: getEapAclList
     */
    listEapAcls(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Create a gateway ACL rule.
     * OperationId: createOsgAcl
     */
    createOsgAcl(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update a gateway ACL rule.
     * OperationId: modifyOsgAcl
     */
    updateOsgAcl(aclId: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Create an EAP ACL rule.
     * OperationId: createEapAcl
     */
    createEapAcl(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update an EAP ACL rule.
     * OperationId: modifyEapAcl
     */
    updateEapAcl(aclId: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Delete an ACL rule by id.
     * OperationId: deleteAcl
     */
    deleteAcl(aclId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List OSW (Switch) ACL rules.
     * OperationId: getOswAclList
     */
    listOswAcls(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List static routing rules.
     * OperationId: getStaticRoutingList
     */
    listStaticRoutes(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get static routing rules with explicit pagination.
     * OperationId: getGridStaticRouting
     */
    getGridStaticRouting(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List policy routing rules.
     * OperationId: getPolicyRoutingList
     */
    listPolicyRoutes(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List RADIUS authentication profiles.
     * OperationId: getRadiusProfileList
     */
    listRadiusProfiles(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List group profiles.
     * OperationId: getGroupProfileList
     */
    listGroupProfiles(groupType?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get application control status for a site.
     * OperationId: getApplicationControlStatus
     */
    getApplicationControlStatus(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get bandwidth control settings for a site.
     * OperationId: getBandwidthControl
     */
    getBandwidthControl(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get SSH settings for a site.
     * OperationId: getSshSetting
     */
    getSshSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LED settings for a site.
     * OperationId: getLedSetting
     */
    getLedSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List time range profiles.
     * OperationId: getTimeRangeProfileList
     */
    listTimeRangeProfiles(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List port schedules.
     * OperationId: getPortScheduleList
     */
    listPortSchedules(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * List PoE schedules.
     * OperationId: getPoeScheduleList
     */
    listPoeSchedules(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get gateway URL filter settings for a site.
     * OperationId: getGatewayUrlFilter
     */
    getGatewayUrlFilters(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get EAP (access point) URL filter settings for a site.
     * OperationId: getEapUrlFilter
     */
    getEapUrlFilters(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List wireless SSIDs across all WLAN groups.
     * OperationId: getSsidListAll
     */
    listAllSsids(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get WAN-LAN connectivity status for a site.
     * OperationId: getWanLanStatus
     */
    getWanLanStatus(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List bandwidth control rules.
     * OperationId: getBandwidthControlRuleList
     */
    listBandwidthControlRules(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get LAN network list (v2).
     * OperationId: getLanNetworkListV2
     */
    getLanNetworkListV2(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get interface LAN network bindings (v1).
     * OperationId: getInterfaceLanNetwork
     */
    getInterfaceLanNetwork(type?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get interface LAN network bindings (v2).
     * OperationId: getInterfaceLanNetworkV2
     */
    getInterfaceLanNetworkV2(type?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get policy routing rules.
     * OperationId: getGridPolicyRouting
     */
    getGridPolicyRouting(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get available static routing interfaces.
     * OperationId: getStaticRoutingInterfaceList
     */
    getStaticRoutingInterfaceList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get 1:1 NAT rules.
     * OperationId: getGridOtoNats
     */
    getGridOtoNats(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get ALG (Application Layer Gateway) configuration.
     * OperationId: getAlg
     */
    getAlg(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get UPnP setting.
     * OperationId: getUpnpSetting
     */
    getUpnpSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DDNS entries.
     * OperationId: getDdnsGrid
     */
    getDdnsGrid(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DHCP reservations.
     * OperationId: getDhcpReservationGrid
     */
    getDhcpReservationGrid(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Create a DHCP reservation entry.
     * OperationId: createDhcpReservation
     */
    createDhcpReservation(payload: {
        netId: string;
        mac: string;
        status: boolean;
        ip?: string;
        description?: string;
        confirmConflict?: boolean;
        options?: unknown[];
    }, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Modify a DHCP reservation entry.
     * OperationId: modifyDhcpReservation
     */
    updateDhcpReservation(mac: string, payload: {
        netId: string;
        status: boolean;
        ip?: string;
        description?: string;
        confirmConflict?: boolean;
        options?: unknown[];
    }, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Delete a DHCP reservation entry.
     * OperationId: deleteDhcpReservation
     */
    deleteDhcpReservation(mac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IP-MAC binding entries.
     * OperationId: getGridIpMacBinding
     */
    getGridIpMacBinding(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IP-MAC binding general setting (global toggle).
     * OperationId: getIpMacBindingGeneralSetting
     */
    getIpMacBindingGeneralSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get SNMP configuration.
     * OperationId: getSnmpSetting
     */
    getSnmpSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LLDP global setting.
     * OperationId: getLldpSetting
     */
    getLldpSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get remote logging (syslog) configuration.
     * OperationId: getRemoteLoggingSetting
     */
    getRemoteLoggingSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get session limit global setting.
     * OperationId: getSessionLimit
     */
    getSessionLimit(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get per-rule session limit rules.
     * OperationId: getGridSessionLimitRule
     */
    getGridSessionLimitRule(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get bandwidth control rules.
     * OperationId: getGridBandwidthCtrlRule
     */
    getGridBandwidthCtrlRule(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Create a bandwidth control rule.
     * OperationId: createBandwidthCtrlRule
     */
    createBandwidthCtrlRule(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update a bandwidth control rule.
     * OperationId: modifyBandwidthCtrlRule
     */
    updateBandwidthCtrlRule(ruleId: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Delete a bandwidth control rule.
     * OperationId: deleteBandwidthCtrlRule
     */
    deleteBandwidthCtrlRule(ruleId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller access control configuration.
     * OperationId: getAccessControl
     */
    getAccessControl(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update the site access control setting.
     * OperationId: modifyAccessControl
     */
    setAccessControl(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DNS cache setting.
     * OperationId: getDnsCacheSetting
     */
    getDnsCacheSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DNS proxy configuration.
     * OperationId: getDnsProxy
     */
    getDnsProxy(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IGMP setting.
     * OperationId: getIgmp
     */
    getIgmp(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WAN load balancing configuration.
     * OperationId: getInternetLoadBalance
     */
    getInternetLoadBalance(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WAN port settings.
     * OperationId: getWanPortsConfig
     */
    getWanPortsConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WAN port summary / basic info.
     * OperationId: getInternetBasicPortInfo
     */
    getInternetBasicPortInfo(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get full WAN/Internet configuration.
     * OperationId: getInternet
     */
    getInternet(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get virtual WAN list.
     * OperationId: getGridVirtualWan
     */
    getGridVirtualWan(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get flat SSID list by device type.
     * OperationId: getSsidsBySite
     */
    getSsidsBySite(type: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get RF planning configuration.
     * OperationId: getRadioFrequencyPlanningConfig
     */
    getRadioFrequencyPlanningConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get RF planning result.
     * OperationId: getRadioFrequencyPlanningResult
     */
    getRadioFrequencyPlanningResult(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get band steering configuration.
     * OperationId: getBandSteeringSetting
     */
    getBandSteeringSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get beacon control setting.
     * OperationId: getBeaconControlSetting
     */
    getBeaconControlSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get channel limit setting.
     * OperationId: getChannelLimitSetting
     */
    getChannelLimitSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get mesh configuration.
     * OperationId: getMeshSetting
     */
    getMeshSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client roaming configuration.
     * OperationId: getRoamingSetting
     */
    getRoamingSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OUI-based device profile list (paginated).
     * OperationId: getOuiProfileList
     */
    getOuiProfileList(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get MAC authentication global setting.
     * OperationId: getMacAuthSetting
     */
    getMacAuthSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get per-SSID MAC authentication settings.
     * OperationId: getMacAuthSsids
     */
    getMacAuthSsids(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get MAC filtering global setting.
     * OperationId: getMacFilteringGeneralSetting
     */
    getMacFilteringGeneralSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get MAC allow-list entries (paginated).
     * OperationId: getGridAllowMacFiltering
     */
    getGridAllowMacFiltering(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get MAC deny-list entries (paginated).
     * OperationId: getGridDenyMacFiltering
     */
    getGridDenyMacFiltering(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get 802.1X switch setting.
     * OperationId: getSwitchDot1xSetting
     */
    getSwitchDot1xSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get 802.1X EAP setting.
     * OperationId: getEapDot1xSetting
     */
    getEapDot1xSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get ACL config type setting (L2/L3 mode).
     * OperationId: getAclConfigTypeSetting
     */
    getAclConfigTypeSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update ACL config type setting (L2/L3 mode).
     * OperationId: modifyOsgConfigMode
     */
    setAclConfigTypeSetting(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get custom gateway ACL rules list (paginated).
     * OperationId: getOsgCustomAclList
     */
    getOsgCustomAclList(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get switch ACL list (paginated).
     * OperationId: getOswAclList
     */
    getOswAclList(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPS global configuration.
     * OperationId: getIpsConfig
     */
    getIpsConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPS signature list (paginated).
     * OperationId: getGridSignature
     */
    getGridSignature(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPS allow list (paginated, optional searchKey).
     * OperationId: getGridAllowList
     */
    getGridAllowList(page: number, pageSize: number, searchKey?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPS block list (paginated, optional searchKey).
     * OperationId: getGridBlockList
     */
    getGridBlockList(page: number, pageSize: number, searchKey?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DDoS/attack defense configuration.
     * OperationId: getAttackDefenseSetting
     */
    getAttackDefenseSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get URL filter global setting.
     * OperationId: getUrlFilterGeneral
     */
    getUrlFilterGeneral(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get URL filter gateway rules (paginated).
     * OperationId: getGridGatewayRule
     */
    getGridGatewayRule(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get URL filter AP rules (paginated).
     * OperationId: getGridEapRule
     */
    getGridEapRule(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get single site-to-site VPN detail by ID.
     * OperationId: getSiteToSiteVpnInfo
     */
    getSiteToSiteVpnInfo(vpnId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List WireGuard tunnels (paginated, optional searchKey).
     * OperationId: listWireguard
     */
    listWireguard(page: number, pageSize: number, searchKey?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List WireGuard peers (paginated).
     * OperationId: listPeer
     */
    listWireguardPeers(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WireGuard summary.
     * OperationId: getWireguardSummary
     */
    getWireguardSummary(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client-to-site VPN client list.
     * OperationId: getClientToSiteVpnClientList
     */
    listClientToSiteVpnClients(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get single client-to-site VPN server detail by ID.
     * OperationId: getClientToSiteVpnServerInfo
     */
    getClientToSiteVpnServerInfo(vpnId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get SSL VPN server configuration.
     * OperationId: getSslVpnServerSetting
     */
    getSslVpnServerSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPsec failover configuration (paginated).
     * OperationId: getGridIpsecFailover
     */
    getGridIpsecFailover(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List service type profiles (paginated).
     * OperationId: listServiceType
     */
    listServiceType(page: number, pageSize: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get service type profile summary.
     * OperationId: getServiceTypeSummary
     */
    getServiceTypeSummary(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get group profiles filtered by type.
     * OperationId: getGroupProfilesByType
     */
    getGroupProfilesByType(groupType: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List LDAP profiles.
     * OperationId: getLdapProfileList
     */
    getLdapProfileList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List RADIUS server local users (paginated, optional sort).
     * OperationId: getRadiusUserList
     */
    getRadiusUserList(page: number, pageSize: number, sortUsername?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List PPSK (Private PSK) profiles.
     * OperationId: getPPSKProfiles
     */
    getPPSKProfiles(type: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * List Bonjour/mDNS service profiles.
     * OperationId: listMdnsProfile
     */
    listMdnsProfile(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get ISP band scan result for a WAN port.
     * OperationId: getBandScanResult
     */
    getIspBandScan(portUuid: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get the disable-NAT grid for wired networks (entries where NAT is disabled on a WAN interface).
     * OperationId: getDisableNatGrid
     */
    getDisableNatList(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LTE/cellular WAN port configuration.
     * OperationId: getLteWanPortsConfig
     */
    getLtePortConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get detailed WAN port configuration (alias for getWanPortsConfig).
     * OperationId: getWanPortsConfig
     */
    getWanPortDetail(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get ISP scan result for a WAN port.
     * OperationId: getIspScanResult
     */
    getWanIspProfile(portUuid: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get QoS configuration for gateway WAN ports.
     * OperationId: getQosWans
     */
    getWanQosConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get WAN traffic usage statistics.
     * OperationId: getTrafficActivities
     */
    getWanUsageStats(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get one-to-one NAT config (WAN NAT config view).
     * OperationId: getGridOtoNats
     */
    getWanNatConfig(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VLAN interface config for a switch.
     * OperationId: getOswVlanIf
     */
    getSwitchVlanInterface(switchMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LAN DNS rules list.
     * OperationId: getGridLanDns
     */
    getLanDnsRules(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get LAN profile usage on EAP/switch devices.
     * OperationId: getUseLanProfileES
     */
    getLanProfileEsUsage(profileId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client distribution breakdown across network segments.
     * OperationId: getClientsDistribution
     */
    getLanClientCount(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OSPF process configuration.
     * OperationId: getGridOspfProcess
     */
    getOspfProcess(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OSPF interface configuration.
     * OperationId: getGridOspfInterface
     */
    getOspfInterface(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VRRP configuration for OSW devices.
     * OperationId: getGridOswVrrp
     */
    getVrrpConfig(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OSPF neighbor devices.
     * OperationId: getOspfDevice
     */
    getOspfNeighbors(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get DNS cache data list.
     * OperationId: getDnsCacheList
     */
    getDnsCacheDataList(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPTV service setting.
     * OperationId: getIptv
     */
    getIptvSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get NTP server configuration and status.
     * OperationId: getNtpServerStatus
     */
    getNtpSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global RADIUS proxy configuration.
     * OperationId: getRadiusProxy
     */
    getRadiusProxyConfig(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get gateway QoS class rules (paginated).
     * OperationId: getGatewayQosClassRules
     */
    getGatewayQosClassRules(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get gateway bandwidth control detail settings.
     * OperationId: getBandwidthCtrlDetail
     */
    getBandwidthCtrlDetail(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get application control rules (paginated).
     * OperationId: getAppControlRules
     */
    getAppControlRules(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Create an application control rule.
     * OperationId: addRule
     */
    createAppControlRule(payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Update an application control rule.
     * OperationId: editRule
     */
    updateAppControlRule(ruleId: string, payload: unknown, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Delete an application control rule.
     * OperationId: deleteRules
     */
    deleteAppControlRule(ruleId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get application control categories (families).
     * OperationId: getAppControlCategories
     */
    getAppControlCategories(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get application control applications (paginated).
     * OperationId: getApplications
     */
    getApplications(page?: number, pageSize?: number, searchKey?: string, filtersFamilyId?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get gateway QoS policy (tag outbound traffic settings).
     * OperationId: getQosPolicy
     */
    getQosPolicy(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get gateway VoIP/traffic prioritization settings.
     * OperationId: getTrafficPriority
     */
    getTrafficPriority(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VPN user list (paginated).
     * OperationId: getVpnUserList
     */
    getVpnUserList(page?: number, pageSize?: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VPN users for a specific client-to-site VPN server.
     * OperationId: getVpnUserDetail
     */
    getVpnUserDetail(vpnId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get Google LDAP profile for a site.
     * OperationId: getGoogleLdapProfile
     */
    getGoogleLdapProfile(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get PPSK user group/profile detail by profile ID.
     * OperationId: getPpskUserGroup
     */
    getPpskUserGroup(profileId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get user role profiles (global).
     * OperationId: getUserRoleProfile
     */
    getUserRoleProfile(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get portal profiles for a site.
     * OperationId: getPortalProfile
     */
    getPortalProfile(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get multicast rate limit setting for a site.
     * OperationId: getMulticastRateLimitByOpenApi
     */
    getMulticastRateLimit(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
