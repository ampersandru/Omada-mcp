import https from 'node:https';
import axios from 'axios';
import { logger } from '../utils/logger.js';
import { AccountOperations } from './account.js';
import { ActionOperations } from './actions.js';
import { AuthManager } from './auth.js';
import { ClientOperations } from './client.js';
import { ControllerOperations } from './controller.js';
import { DeviceOperations } from './device.js';
import { InsightOperations } from './insight.js';
import { LogOperations } from './log.js';
import { MaintenanceOperations } from './maintenance.js';
import { MonitorOperations } from './monitor.js';
import { NetworkOperations } from './network.js';
import { RequestHandler } from './request.js';
import { ScheduleOperations } from './schedules.js';
import { SecurityOperations } from './security.js';
import { SiteOperations } from './site.js';
/**
 * Main client for interacting with the TP-Link Omada API.
 * Organized by API tag with dedicated operation classes for each domain.
 */
export class OmadaClient {
    http;
    auth;
    request;
    siteOps;
    deviceOps;
    clientOps;
    securityOps;
    networkOps;
    monitorOps;
    insightOps;
    logOps;
    controllerOps;
    maintenanceOps;
    accountOps;
    scheduleOps;
    actionOps;
    omadacId;
    constructor(options) {
        this.omadacId = options.omadacId ?? '';
        const axiosOptions = {
            baseURL: options.baseUrl,
            httpsAgent: new https.Agent({ rejectUnauthorized: options.strictSsl }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        if (options.requestTimeout) {
            axiosOptions.timeout = options.requestTimeout;
        }
        this.http = axios.create(axiosOptions);
        // Initialize operation modules
        this.auth = new AuthManager(this.http, {
            authMode: options.authMode,
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            username: options.username,
            password: options.password,
            omadacId: options.omadacId,
        });
        this.request = new RequestHandler(this.http, this.auth);
        this.siteOps = new SiteOperations(this.request, this.buildOmadaPath.bind(this), options.siteId);
        this.deviceOps = new DeviceOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.clientOps = new ClientOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.securityOps = new SecurityOperations(this.request, this.buildOmadaPath.bind(this));
        this.networkOps = new NetworkOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.monitorOps = new MonitorOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.insightOps = new InsightOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.logOps = new LogOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.controllerOps = new ControllerOperations(this.request, this.buildOmadaPath.bind(this));
        this.maintenanceOps = new MaintenanceOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.accountOps = new AccountOperations(this.request, this.buildOmadaPath.bind(this));
        this.scheduleOps = new ScheduleOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
        this.actionOps = new ActionOperations(this.request, this.siteOps, this.buildOmadaPath.bind(this));
    }
    getDefaultSiteId() {
        return this.siteOps.getDefaultSiteId();
    }
    getOmadacId() {
        return this.omadacId;
    }
    /**
     * Initialize connection and ensure valid session / auto-discover controller ID and default site ID.
     */
    async init() {
        await this.auth.ensureSession();
        if (!this.omadacId) {
            this.omadacId = this.auth.getOmadacIdSync();
        }
        if (!this.siteOps.getDefaultSiteId() || this.siteOps.getDefaultSiteId()?.toLowerCase() === 'default') {
            try {
                const sites = await this.siteOps.listSites();
                if (sites && sites.length > 0) {
                    const defaultSite = sites.find((s) => s.siteId === 'Default' || s.name === 'Default') ?? sites[0];
                    if (defaultSite?.siteId) {
                        this.siteOps.setDefaultSiteId(defaultSite.siteId);
                        logger.info('Auto-detected default Omada Site ID', {
                            siteId: defaultSite.siteId,
                            siteName: defaultSite.name,
                        });
                    }
                }
            }
            catch (err) {
                logger.warn('Could not auto-detect default Site ID from controller', {
                    error: err instanceof Error ? err.message : String(err),
                });
            }
        }
    }
    // Site operations
    async listSites(customHeaders) {
        return await this.siteOps.listSites(customHeaders);
    }
    // Device operations
    async listDevices(siteId, customHeaders) {
        return await this.deviceOps.listDevices(siteId, customHeaders);
    }
    async getDevice(identifier, siteId, customHeaders) {
        return await this.deviceOps.getDevice(identifier, siteId, customHeaders);
    }
    async getSwitchStackDetail(stackId, siteId, customHeaders) {
        return await this.deviceOps.getSwitchStackDetail(stackId, siteId, customHeaders);
    }
    async searchDevices(searchKey, customHeaders) {
        return await this.deviceOps.searchDevices(searchKey, customHeaders);
    }
    async listDevicesStats(options, customHeaders) {
        return await this.deviceOps.listDevicesStats(options, customHeaders);
    }
    // Client operations
    async listClients(siteId, customHeaders) {
        return await this.clientOps.listClients(siteId, customHeaders);
    }
    async getClient(identifier, siteId, customHeaders) {
        return await this.clientOps.getClient(identifier, siteId, customHeaders);
    }
    async listMostActiveClients(siteId, customHeaders) {
        return await this.clientOps.listMostActiveClients(siteId, customHeaders);
    }
    async listClientsActivity(options, customHeaders) {
        return await this.clientOps.listClientsActivity(options, customHeaders);
    }
    async listClientsPastConnections(options, customHeaders) {
        return await this.clientOps.listClientsPastConnections(options, customHeaders);
    }
    // Rate limit operations
    async getRateLimitProfiles(siteId, customHeaders) {
        return await this.clientOps.getRateLimitProfiles(siteId, customHeaders);
    }
    async setClientRateLimit(clientMac, downLimit, upLimit, siteId, customHeaders) {
        return await this.clientOps.setClientRateLimit(clientMac, downLimit, upLimit, siteId, customHeaders);
    }
    async setClientRateLimitProfile(clientMac, profileId, siteId, customHeaders) {
        return await this.clientOps.setClientRateLimitProfile(clientMac, profileId, siteId, customHeaders);
    }
    async disableClientRateLimit(clientMac, siteId, customHeaders) {
        return await this.clientOps.disableClientRateLimit(clientMac, siteId, customHeaders);
    }
    async getClientDetail(clientMac, siteId, customHeaders) {
        return await this.clientOps.getClientDetail(clientMac, siteId, customHeaders);
    }
    async getGridKnownClients(page, pageSize, options, siteId, customHeaders) {
        return await this.clientOps.getGridKnownClients(page, pageSize, options, siteId, customHeaders);
    }
    async getGridClientHistory(clientMac, page, pageSize, searchKey, siteId, customHeaders) {
        return await this.clientOps.getGridClientHistory(clientMac, page, pageSize, searchKey, siteId, customHeaders);
    }
    async getClientsDistribution(siteId, customHeaders) {
        return await this.clientOps.getClientsDistribution(siteId, customHeaders);
    }
    async getPastClientNum(start, end, siteId, customHeaders) {
        return await this.clientOps.getPastClientNum(start, end, siteId, customHeaders);
    }
    // Security operations
    async getThreatList(options, customHeaders) {
        return await this.securityOps.getThreatList(options, customHeaders);
    }
    // Network operations
    async getInternetInfo(siteId, customHeaders) {
        return await this.networkOps.getInternetInfo(siteId, customHeaders);
    }
    async getPortForwardingStatus(type, siteId, page = 1, pageSize = 10, customHeaders) {
        return await this.networkOps.getPortForwardingStatus(type, siteId, page, pageSize, customHeaders);
    }
    async getLanNetworkList(siteId, customHeaders) {
        return await this.networkOps.getLanNetworkList(siteId, customHeaders);
    }
    async getLanProfileList(siteId, customHeaders) {
        return await this.networkOps.getLanProfileList(siteId, customHeaders);
    }
    async getWlanGroupList(siteId, customHeaders) {
        return await this.networkOps.getWlanGroupList(siteId, customHeaders);
    }
    async getSsidList(wlanId, siteId, customHeaders) {
        return await this.networkOps.getSsidList(wlanId, siteId, customHeaders);
    }
    async getSsidDetail(wlanId, ssidId, siteId, customHeaders) {
        return await this.networkOps.getSsidDetail(wlanId, ssidId, siteId, customHeaders);
    }
    async getFirewallSetting(siteId, customHeaders) {
        return await this.networkOps.getFirewallSetting(siteId, customHeaders);
    }
    async setFirewallSetting(payload, siteId, customHeaders) {
        return await this.networkOps.setFirewallSetting(payload, siteId, customHeaders);
    }
    async getSwitchDetail(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getSwitchDetail(switchMac, siteId, customHeaders);
    }
    async getGatewayDetail(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getGatewayDetail(gatewayMac, siteId, customHeaders);
    }
    async getGatewayWanStatus(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getGatewayWanStatus(gatewayMac, siteId, customHeaders);
    }
    async getGatewayLanStatus(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getGatewayLanStatus(gatewayMac, siteId, customHeaders);
    }
    async getGatewayPorts(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getGatewayPorts(gatewayMac, siteId, customHeaders);
    }
    async getApDetail(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApDetail(apMac, siteId, customHeaders);
    }
    async getApRadios(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApRadios(apMac, siteId, customHeaders);
    }
    async getStackPorts(stackId, siteId, customHeaders) {
        return await this.deviceOps.getStackPorts(stackId, siteId, customHeaders);
    }
    async listPendingDevices(siteId, customHeaders) {
        return await this.deviceOps.listPendingDevices(siteId, customHeaders);
    }
    // Device Management — Phase 1 Read Tools (issue #36)
    async getAllDeviceBySite(siteId, customHeaders) {
        return await this.deviceOps.getAllDeviceBySite(siteId, customHeaders);
    }
    async getFirmwareInfo(deviceMac, siteId, customHeaders) {
        return await this.deviceOps.getFirmwareInfo(deviceMac, siteId, customHeaders);
    }
    async rebootDevice(deviceMac, siteId, customHeaders) {
        return await this.actionOps.rebootDevice(deviceMac, siteId, customHeaders);
    }
    async blockClient(clientMac, siteId, customHeaders) {
        return await this.actionOps.blockClient(clientMac, siteId, customHeaders);
    }
    async unblockClient(clientMac, siteId, customHeaders) {
        return await this.actionOps.unblockClient(clientMac, siteId, customHeaders);
    }
    async reconnectClient(clientMac, siteId, customHeaders) {
        return await this.actionOps.reconnectClient(clientMac, siteId, customHeaders);
    }
    async setDeviceLed(deviceMac, ledSetting, siteId, customHeaders) {
        return await this.actionOps.setDeviceLed(deviceMac, ledSetting, siteId, customHeaders);
    }
    async getGridAutoCheckUpgrade(page, pageSize, customHeaders) {
        return await this.deviceOps.getGridAutoCheckUpgrade(page, pageSize, customHeaders);
    }
    async listSwitchNetworks(switchMac, page, pageSize, siteId, customHeaders) {
        return await this.deviceOps.listSwitchNetworks(switchMac, page, pageSize, siteId, customHeaders);
    }
    async getSwitchGeneralConfig(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getSwitchGeneralConfig(switchMac, siteId, customHeaders);
    }
    async getCableTestLogs(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getCableTestLogs(switchMac, siteId, customHeaders);
    }
    async getCableTestFullResults(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getCableTestFullResults(switchMac, siteId, customHeaders);
    }
    async getOswStackLagList(stackId, siteId, customHeaders) {
        return await this.deviceOps.getOswStackLagList(stackId, siteId, customHeaders);
    }
    async getStackNetworkList(stackId, page, pageSize, siteId, customHeaders) {
        return await this.deviceOps.getStackNetworkList(stackId, page, pageSize, siteId, customHeaders);
    }
    async getApUplinkConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApUplinkConfig(apMac, siteId, customHeaders);
    }
    async getRadiosConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getRadiosConfig(apMac, siteId, customHeaders);
    }
    async getApVlanConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApVlanConfig(apMac, siteId, customHeaders);
    }
    async getMeshStatistics(apMac, siteId, customHeaders) {
        return await this.deviceOps.getMeshStatistics(apMac, siteId, customHeaders);
    }
    async getRFScanResult(apMac, siteId, customHeaders) {
        return await this.deviceOps.getRFScanResult(apMac, siteId, customHeaders);
    }
    async getSpeedTestResults(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSpeedTestResults(apMac, siteId, customHeaders);
    }
    async getApSnmpConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApSnmpConfig(apMac, siteId, customHeaders);
    }
    async getApLldpConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApLldpConfig(apMac, siteId, customHeaders);
    }
    async getApGeneralConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApGeneralConfig(apMac, siteId, customHeaders);
    }
    async setApGeneralConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApGeneralConfig(apMac, payload, siteId, customHeaders);
    }
    async getUplinkWiredDetail(apMac, siteId, customHeaders) {
        return await this.deviceOps.getUplinkWiredDetail(apMac, siteId, customHeaders);
    }
    async getDownlinkWiredDevices(apMac, siteId, customHeaders) {
        return await this.deviceOps.getDownlinkWiredDevices(apMac, siteId, customHeaders);
    }
    // Device Management — Phase 2 Read Tools (issue #73)
    // devices-general
    async getFirmwareUpgradePlan(page, pageSize, customHeaders) {
        return await this.deviceOps.getFirmwareUpgradePlan(page, pageSize, customHeaders);
    }
    async getUpgradeLogs(page, pageSize, customHeaders) {
        return await this.deviceOps.getUpgradeLogs(page, pageSize, customHeaders);
    }
    async getDeviceTagList(siteId, customHeaders) {
        return await this.deviceOps.getDeviceTagList(siteId, customHeaders);
    }
    // devices-ap
    async getApQosConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApQosConfig(apMac, siteId, customHeaders);
    }
    async setApQosConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApQosConfig(apMac, payload, siteId, customHeaders);
    }
    async getApIpv6Config(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApIpv6Config(apMac, siteId, customHeaders);
    }
    async setApIpv6Config(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApIpv6Config(apMac, payload, siteId, customHeaders);
    }
    // Device operations — Phase 2 additional
    async getSitesGatewaysGeneralConfig(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesGatewaysGeneralConfig(gatewayMac, siteId, customHeaders);
    }
    async setSitesGatewaysGeneralConfig(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysGeneralConfig(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysConfigGeneral(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysConfigGeneral(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysConfigServices(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysConfigServices(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysConfigAdvanced(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysConfigAdvanced(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysConfigRadios(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysConfigRadios(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysConfigWlans(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysConfigWlans(gatewayMac, payload, siteId, customHeaders);
    }
    async setSitesGatewaysPortConfig(gatewayMac, portName, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysPortConfig(gatewayMac, portName, payload, siteId, customHeaders);
    }
    async setSitesGatewaysMultiPortsConfig(gatewayMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesGatewaysMultiPortsConfig(gatewayMac, payload, siteId, customHeaders);
    }
    async getSitesGatewaysPin(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesGatewaysPin(gatewayMac, siteId, customHeaders);
    }
    async getSitesGatewaysSimCardUsed(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesGatewaysSimCardUsed(gatewayMac, siteId, customHeaders);
    }
    async getSitesHealthGatewaysWansDetails(gatewayMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesHealthGatewaysWansDetails(gatewayMac, siteId, customHeaders);
    }
    async getSitesApsIpSetting(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsIpSetting(apMac, siteId, customHeaders);
    }
    async setSitesApsIpSetting(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsIpSetting(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsChannelLimit(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsChannelLimit(apMac, siteId, customHeaders);
    }
    async getSitesApsAvailableChannel(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsAvailableChannel(apMac, siteId, customHeaders);
    }
    async setApChannelConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApChannelConfig(apMac, payload, siteId, customHeaders);
    }
    async getAfcConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getAfcConfig(apMac, siteId, customHeaders);
    }
    async setAfcConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setAfcConfig(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsLoadBalance(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsLoadBalance(apMac, siteId, customHeaders);
    }
    async setSitesApsLoadBalance(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsLoadBalance(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsOfdma(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsOfdma(apMac, siteId, customHeaders);
    }
    async setSitesApsOfdma(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsOfdma(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsPowerSaving(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsPowerSaving(apMac, siteId, customHeaders);
    }
    async setSitesApsPowerSaving(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsPowerSaving(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsTrunkSetting(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsTrunkSetting(apMac, siteId, customHeaders);
    }
    async setSitesApsTrunkSetting(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsTrunkSetting(apMac, payload, siteId, customHeaders);
    }
    async setSitesApsChannelLimit(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsChannelLimit(apMac, payload, siteId, customHeaders);
    }
    async getSitesApsBridge(apMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesApsBridge(apMac, siteId, customHeaders);
    }
    async setSitesApsBridge(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsBridge(apMac, payload, siteId, customHeaders);
    }
    async setRadiosConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setRadiosConfig(apMac, payload, siteId, customHeaders);
    }
    async listSitesApsPorts(apMac, siteId, customHeaders) {
        return await this.deviceOps.listSitesApsPorts(apMac, siteId, customHeaders);
    }
    async setSitesApsPortConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setSitesApsPortConfig(apMac, payload, siteId, customHeaders);
    }
    async setApServiceConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApServiceConfig(apMac, payload, siteId, customHeaders);
    }
    async setApWlanGroup(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setApWlanGroup(apMac, payload, siteId, customHeaders);
    }
    async getAntennaGainConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getAntennaGainConfig(apMac, siteId, customHeaders);
    }
    async setAntennaGainConfig(apMac, payload, siteId, customHeaders) {
        return await this.deviceOps.setAntennaGainConfig(apMac, payload, siteId, customHeaders);
    }
    async getSitesSwitchesEs(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesSwitchesEs(switchMac, siteId, customHeaders);
    }
    async getSitesSwitchesEsGeneralConfig(switchMac, siteId, customHeaders) {
        return await this.deviceOps.getSitesSwitchesEsGeneralConfig(switchMac, siteId, customHeaders);
    }
    async listSitesCableTestSwitchesPorts(switchMac, siteId, customHeaders) {
        return await this.deviceOps.listSitesCableTestSwitchesPorts(switchMac, siteId, customHeaders);
    }
    async listSitesCableTestSwitchesIncrementResults(switchMac, siteId, customHeaders) {
        return await this.deviceOps.listSitesCableTestSwitchesIncrementResults(switchMac, siteId, customHeaders);
    }
    async getUpgradeOverviewCritical(customHeaders) {
        return await this.deviceOps.getUpgradeOverviewCritical(customHeaders);
    }
    async getUpgradeOverviewTryBeta(customHeaders) {
        return await this.deviceOps.getUpgradeOverviewTryBeta(customHeaders);
    }
    async listUpgradeFirmwares(page, pageSize, customHeaders) {
        return await this.deviceOps.listUpgradeFirmwares(page, pageSize, customHeaders);
    }
    async listUpgradeOverviewFirmwares(page, pageSize, customHeaders) {
        return await this.deviceOps.listUpgradeOverviewFirmwares(page, pageSize, customHeaders);
    }
    async listSitesStacks(siteId, page, pageSize, customHeaders) {
        return await this.deviceOps.listSitesStacks(siteId, page, pageSize, customHeaders);
    }
    async getSitesDeviceWhiteList(siteId, page, pageSize, customHeaders) {
        return await this.deviceOps.getSitesDeviceWhiteList(siteId, page, pageSize, customHeaders);
    }
    // Security operations (extended)
    async getTopThreats(customHeaders) {
        return await this.securityOps.getTopThreats(customHeaders);
    }
    async getThreatSeverity(startTime, endTime, customHeaders) {
        return await this.securityOps.getThreatSeverity(startTime, endTime, customHeaders);
    }
    // Global Controller settings (issue #41)
    async getControllerStatus(customHeaders) {
        return await this.securityOps.getControllerStatus(customHeaders);
    }
    async getGeneralSettings(customHeaders) {
        return await this.securityOps.getGeneralSettings(customHeaders);
    }
    async getRetention(customHeaders) {
        return await this.securityOps.getRetention(customHeaders);
    }
    async getClientActiveTimeout(customHeaders) {
        return await this.securityOps.getClientActiveTimeout(customHeaders);
    }
    async getRemoteLogging(customHeaders) {
        return await this.securityOps.getRemoteLogging(customHeaders);
    }
    async getRadiusServer(customHeaders) {
        return await this.securityOps.getRadiusServer(customHeaders);
    }
    async getLogging(customHeaders) {
        return await this.securityOps.getLogging(customHeaders);
    }
    async getUiInterface(customHeaders) {
        return await this.securityOps.getUiInterface(customHeaders);
    }
    async getDeviceAccessManagement(customHeaders) {
        return await this.securityOps.getDeviceAccessManagement(customHeaders);
    }
    async getWebhookForGlobal(customHeaders) {
        return await this.securityOps.getWebhookForGlobal(customHeaders);
    }
    async getWebhookLogsForGlobal(page, pageSize, webhookId, timeStart, timeEnd, customHeaders) {
        return await this.securityOps.getWebhookLogsForGlobal(page, pageSize, webhookId, timeStart, timeEnd, customHeaders);
    }
    async getMailServerStatus(customHeaders) {
        return await this.securityOps.getMailServerStatus(customHeaders);
    }
    // Network operations (extended)
    async getVpnSettings(siteId, customHeaders) {
        return await this.networkOps.getVpnSettings(siteId, customHeaders);
    }
    async listSiteToSiteVpns(siteId, customHeaders) {
        return await this.networkOps.listSiteToSiteVpns(siteId, customHeaders);
    }
    async listClientToSiteVpnServers(siteId, customHeaders) {
        return await this.networkOps.listClientToSiteVpnServers(siteId, customHeaders);
    }
    // VPN tools (issue #39)
    async getSiteToSiteVpnInfo(vpnId, siteId, customHeaders) {
        return await this.networkOps.getSiteToSiteVpnInfo(vpnId, siteId, customHeaders);
    }
    async listWireguard(page, pageSize, searchKey, siteId, customHeaders) {
        return await this.networkOps.listWireguard(page, pageSize, searchKey, siteId, customHeaders);
    }
    async listWireguardPeers(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.listWireguardPeers(page, pageSize, siteId, customHeaders);
    }
    async getWireguardSummary(siteId, customHeaders) {
        return await this.networkOps.getWireguardSummary(siteId, customHeaders);
    }
    async listClientToSiteVpnClients(siteId, customHeaders) {
        return await this.networkOps.listClientToSiteVpnClients(siteId, customHeaders);
    }
    async getClientToSiteVpnServerInfo(vpnId, siteId, customHeaders) {
        return await this.networkOps.getClientToSiteVpnServerInfo(vpnId, siteId, customHeaders);
    }
    async getSslVpnServerSetting(siteId, customHeaders) {
        return await this.networkOps.getSslVpnServerSetting(siteId, customHeaders);
    }
    async getGridIpsecFailover(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridIpsecFailover(page, pageSize, siteId, customHeaders);
    }
    // Profiles & Policies tools (issue #40)
    async listServiceType(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.listServiceType(page, pageSize, siteId, customHeaders);
    }
    async getServiceTypeSummary(siteId, customHeaders) {
        return await this.networkOps.getServiceTypeSummary(siteId, customHeaders);
    }
    async getGroupProfilesByType(groupType, siteId, customHeaders) {
        return await this.networkOps.getGroupProfilesByType(groupType, siteId, customHeaders);
    }
    async getLdapProfileList(siteId, customHeaders) {
        return await this.networkOps.getLdapProfileList(siteId, customHeaders);
    }
    async getRadiusUserList(page, pageSize, sortUsername, siteId, customHeaders) {
        return await this.networkOps.getRadiusUserList(page, pageSize, sortUsername, siteId, customHeaders);
    }
    async getPPSKProfiles(type, siteId, customHeaders) {
        return await this.networkOps.getPPSKProfiles(type, siteId, customHeaders);
    }
    async listMdnsProfile(siteId, customHeaders) {
        return await this.networkOps.listMdnsProfile(siteId, customHeaders);
    }
    // --- network-wan (#74) ---
    async getIspBandScan(portUuid, siteId, customHeaders) {
        return await this.networkOps.getIspBandScan(portUuid, siteId, customHeaders);
    }
    async getDisableNatList(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getDisableNatList(page, pageSize, siteId, customHeaders);
    }
    async getLtePortConfig(siteId, customHeaders) {
        return await this.networkOps.getLtePortConfig(siteId, customHeaders);
    }
    async getWanPortDetail(siteId, customHeaders) {
        return await this.networkOps.getWanPortDetail(siteId, customHeaders);
    }
    async getWanIspProfile(portUuid, siteId, customHeaders) {
        return await this.networkOps.getWanIspProfile(portUuid, siteId, customHeaders);
    }
    async getWanQosConfig(siteId, customHeaders) {
        return await this.networkOps.getWanQosConfig(siteId, customHeaders);
    }
    async getWanHealthDetail(gatewayMac, siteId, customHeaders) {
        return await this.getSitesHealthGatewaysWansDetails(gatewayMac, siteId, customHeaders);
    }
    async getWanUsageStats(siteId, customHeaders) {
        return await this.networkOps.getWanUsageStats(siteId, customHeaders);
    }
    async getWanNatConfig(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getWanNatConfig(page, pageSize, siteId, customHeaders);
    }
    // --- network-lan (#74) ---
    async getSwitchVlanInterface(switchMac, siteId, customHeaders) {
        return await this.networkOps.getSwitchVlanInterface(switchMac, siteId, customHeaders);
    }
    async getLanDnsRules(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getLanDnsRules(page, pageSize, siteId, customHeaders);
    }
    async getLanProfileEsUsage(profileId, siteId, customHeaders) {
        return await this.networkOps.getLanProfileEsUsage(profileId, siteId, customHeaders);
    }
    async getLanClientCount(siteId, customHeaders) {
        return await this.networkOps.getLanClientCount(siteId, customHeaders);
    }
    // --- network-routing (#74) ---
    async getOspfProcess(siteId, customHeaders) {
        return await this.networkOps.getOspfProcess(siteId, customHeaders);
    }
    async getOspfInterface(siteId, customHeaders) {
        return await this.networkOps.getOspfInterface(siteId, customHeaders);
    }
    async getVrrpConfig(siteId, customHeaders) {
        return await this.networkOps.getVrrpConfig(siteId, customHeaders);
    }
    async getOspfNeighbors(siteId, customHeaders) {
        return await this.networkOps.getOspfNeighbors(siteId, customHeaders);
    }
    // --- network-services (#74) ---
    async getDnsCacheDataList(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getDnsCacheDataList(page, pageSize, siteId, customHeaders);
    }
    async getIptvSetting(siteId, customHeaders) {
        return await this.networkOps.getIptvSetting(siteId, customHeaders);
    }
    async getNtpSetting(siteId, customHeaders) {
        return await this.networkOps.getNtpSetting(siteId, customHeaders);
    }
    async listPortForwardingRules(siteId, customHeaders) {
        return await this.networkOps.listPortForwardingRules(siteId, customHeaders);
    }
    async getPortForwardingListPage(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getPortForwardingListPage(page, pageSize, siteId, customHeaders);
    }
    async listOneToOneNatRules(siteId, customHeaders) {
        return await this.networkOps.listOneToOneNatRules(siteId, customHeaders);
    }
    async listOsgAcls(siteId, customHeaders) {
        return await this.networkOps.listOsgAcls(siteId, customHeaders);
    }
    async listEapAcls(siteId, customHeaders) {
        return await this.networkOps.listEapAcls(siteId, customHeaders);
    }
    async listOswAcls(siteId, customHeaders) {
        return await this.networkOps.listOswAcls(siteId, customHeaders);
    }
    async listStaticRoutes(siteId, customHeaders) {
        return await this.networkOps.listStaticRoutes(siteId, customHeaders);
    }
    async listPolicyRoutes(siteId, customHeaders) {
        return await this.networkOps.listPolicyRoutes(siteId, customHeaders);
    }
    async listRadiusProfiles(siteId, customHeaders) {
        return await this.networkOps.listRadiusProfiles(siteId, customHeaders);
    }
    async listGroupProfiles(groupType, siteId, customHeaders) {
        return await this.networkOps.listGroupProfiles(groupType, siteId, customHeaders);
    }
    async getApplicationControlStatus(siteId, customHeaders) {
        return await this.networkOps.getApplicationControlStatus(siteId, customHeaders);
    }
    async getBandwidthControl(siteId, customHeaders) {
        return await this.networkOps.getBandwidthControl(siteId, customHeaders);
    }
    async getSshSetting(siteId, customHeaders) {
        return await this.networkOps.getSshSetting(siteId, customHeaders);
    }
    async getLedSetting(siteId, customHeaders) {
        return await this.networkOps.getLedSetting(siteId, customHeaders);
    }
    async listTimeRangeProfiles(siteId, customHeaders) {
        return await this.networkOps.listTimeRangeProfiles(siteId, customHeaders);
    }
    async listPortSchedules(siteId, customHeaders) {
        return await this.networkOps.listPortSchedules(siteId, customHeaders);
    }
    async listPoeSchedules(siteId, customHeaders) {
        return await this.networkOps.listPoeSchedules(siteId, customHeaders);
    }
    async getGatewayUrlFilters(siteId, customHeaders) {
        return await this.networkOps.getGatewayUrlFilters(siteId, customHeaders);
    }
    async getEapUrlFilters(siteId, customHeaders) {
        return await this.networkOps.getEapUrlFilters(siteId, customHeaders);
    }
    async listAllSsids(siteId, customHeaders) {
        return await this.networkOps.listAllSsids(siteId, customHeaders);
    }
    async getWanLanStatus(siteId, customHeaders) {
        return await this.networkOps.getWanLanStatus(siteId, customHeaders);
    }
    async listBandwidthControlRules(siteId, customHeaders) {
        return await this.networkOps.listBandwidthControlRules(siteId, customHeaders);
    }
    // LAN/Network config tools (issue #38)
    async getLanNetworkListV2(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getLanNetworkListV2(page, pageSize, siteId, customHeaders);
    }
    async getInterfaceLanNetwork(type, siteId, customHeaders) {
        return await this.networkOps.getInterfaceLanNetwork(type, siteId, customHeaders);
    }
    async getInterfaceLanNetworkV2(type, siteId, customHeaders) {
        return await this.networkOps.getInterfaceLanNetworkV2(type, siteId, customHeaders);
    }
    async getGridPolicyRouting(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridPolicyRouting(page, pageSize, siteId, customHeaders);
    }
    async getGridStaticRouting(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridStaticRouting(page, pageSize, siteId, customHeaders);
    }
    async getStaticRoutingInterfaceList(siteId, customHeaders) {
        return await this.networkOps.getStaticRoutingInterfaceList(siteId, customHeaders);
    }
    async getGridOtoNats(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridOtoNats(page, pageSize, siteId, customHeaders);
    }
    async getAlg(siteId, customHeaders) {
        return await this.networkOps.getAlg(siteId, customHeaders);
    }
    async getUpnpSetting(siteId, customHeaders) {
        return await this.networkOps.getUpnpSetting(siteId, customHeaders);
    }
    async getDdnsGrid(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getDdnsGrid(page, pageSize, siteId, customHeaders);
    }
    async getDhcpReservationGrid(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getDhcpReservationGrid(page, pageSize, siteId, customHeaders);
    }
    async createDhcpReservation(payload, siteId, customHeaders) {
        return await this.networkOps.createDhcpReservation(payload, siteId, customHeaders);
    }
    async updateDhcpReservation(mac, payload, siteId, customHeaders) {
        return await this.networkOps.updateDhcpReservation(mac, payload, siteId, customHeaders);
    }
    async deleteDhcpReservation(mac, siteId, customHeaders) {
        return await this.networkOps.deleteDhcpReservation(mac, siteId, customHeaders);
    }
    async createBandwidthCtrlRule(payload, siteId, customHeaders) {
        return await this.networkOps.createBandwidthCtrlRule(payload, siteId, customHeaders);
    }
    async updateBandwidthCtrlRule(ruleId, payload, siteId, customHeaders) {
        return await this.networkOps.updateBandwidthCtrlRule(ruleId, payload, siteId, customHeaders);
    }
    async deleteBandwidthCtrlRule(ruleId, siteId, customHeaders) {
        return await this.networkOps.deleteBandwidthCtrlRule(ruleId, siteId, customHeaders);
    }
    async setAccessControl(payload, siteId, customHeaders) {
        return await this.networkOps.setAccessControl(payload, siteId, customHeaders);
    }
    async getGridIpMacBinding(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridIpMacBinding(page, pageSize, siteId, customHeaders);
    }
    async getIpMacBindingGeneralSetting(siteId, customHeaders) {
        return await this.networkOps.getIpMacBindingGeneralSetting(siteId, customHeaders);
    }
    async getSnmpSetting(siteId, customHeaders) {
        return await this.networkOps.getSnmpSetting(siteId, customHeaders);
    }
    async getLldpSetting(siteId, customHeaders) {
        return await this.networkOps.getLldpSetting(siteId, customHeaders);
    }
    async getRemoteLoggingSetting(siteId, customHeaders) {
        return await this.networkOps.getRemoteLoggingSetting(siteId, customHeaders);
    }
    async getSessionLimit(siteId, customHeaders) {
        return await this.networkOps.getSessionLimit(siteId, customHeaders);
    }
    async getGridSessionLimitRule(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridSessionLimitRule(page, pageSize, siteId, customHeaders);
    }
    async getGridBandwidthCtrlRule(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridBandwidthCtrlRule(page, pageSize, siteId, customHeaders);
    }
    async getAccessControl(siteId, customHeaders) {
        return await this.networkOps.getAccessControl(siteId, customHeaders);
    }
    async getDnsCacheSetting(siteId, customHeaders) {
        return await this.networkOps.getDnsCacheSetting(siteId, customHeaders);
    }
    async getDnsProxy(siteId, customHeaders) {
        return await this.networkOps.getDnsProxy(siteId, customHeaders);
    }
    async getIgmp(siteId, customHeaders) {
        return await this.networkOps.getIgmp(siteId, customHeaders);
    }
    async getInternetLoadBalance(siteId, customHeaders) {
        return await this.networkOps.getInternetLoadBalance(siteId, customHeaders);
    }
    async getWanPortsConfig(siteId, customHeaders) {
        return await this.networkOps.getWanPortsConfig(siteId, customHeaders);
    }
    async getInternetBasicPortInfo(siteId, customHeaders) {
        return await this.networkOps.getInternetBasicPortInfo(siteId, customHeaders);
    }
    async getInternet(siteId, customHeaders) {
        return await this.networkOps.getInternet(siteId, customHeaders);
    }
    async getGridVirtualWan(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridVirtualWan(page, pageSize, siteId, customHeaders);
    }
    // Wireless/SSID tools (issue #35)
    async getSsidsBySite(type, siteId, customHeaders) {
        return await this.networkOps.getSsidsBySite(type, siteId, customHeaders);
    }
    async getRadioFrequencyPlanningConfig(siteId, customHeaders) {
        return await this.networkOps.getRadioFrequencyPlanningConfig(siteId, customHeaders);
    }
    async getRadioFrequencyPlanningResult(siteId, customHeaders) {
        return await this.networkOps.getRadioFrequencyPlanningResult(siteId, customHeaders);
    }
    async getBandSteeringSetting(siteId, customHeaders) {
        return await this.networkOps.getBandSteeringSetting(siteId, customHeaders);
    }
    async getBeaconControlSetting(siteId, customHeaders) {
        return await this.networkOps.getBeaconControlSetting(siteId, customHeaders);
    }
    async getChannelLimitSetting(siteId, customHeaders) {
        return await this.networkOps.getChannelLimitSetting(siteId, customHeaders);
    }
    async getMeshSetting(siteId, customHeaders) {
        return await this.networkOps.getMeshSetting(siteId, customHeaders);
    }
    async getRoamingSetting(siteId, customHeaders) {
        return await this.networkOps.getRoamingSetting(siteId, customHeaders);
    }
    async getOuiProfileList(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getOuiProfileList(page, pageSize, siteId, customHeaders);
    }
    async getMacAuthSetting(siteId, customHeaders) {
        return await this.networkOps.getMacAuthSetting(siteId, customHeaders);
    }
    async getMacAuthSsids(siteId, customHeaders) {
        return await this.networkOps.getMacAuthSsids(siteId, customHeaders);
    }
    async getMacFilteringGeneralSetting(siteId, customHeaders) {
        return await this.networkOps.getMacFilteringGeneralSetting(siteId, customHeaders);
    }
    async getGridAllowMacFiltering(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridAllowMacFiltering(page, pageSize, siteId, customHeaders);
    }
    async getGridDenyMacFiltering(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridDenyMacFiltering(page, pageSize, siteId, customHeaders);
    }
    async getSwitchDot1xSetting(siteId, customHeaders) {
        return await this.networkOps.getSwitchDot1xSetting(siteId, customHeaders);
    }
    async getEapDot1xSetting(siteId, customHeaders) {
        return await this.networkOps.getEapDot1xSetting(siteId, customHeaders);
    }
    // Firewall / ACL / IPS / URL-filter tools (issue #37)
    async getAclConfigTypeSetting(siteId, customHeaders) {
        return await this.networkOps.getAclConfigTypeSetting(siteId, customHeaders);
    }
    async setAclConfigTypeSetting(payload, siteId, customHeaders) {
        return await this.networkOps.setAclConfigTypeSetting(payload, siteId, customHeaders);
    }
    async createOsgAcl(payload, siteId, customHeaders) {
        return await this.networkOps.createOsgAcl(payload, siteId, customHeaders);
    }
    async updateOsgAcl(aclId, payload, siteId, customHeaders) {
        return await this.networkOps.updateOsgAcl(aclId, payload, siteId, customHeaders);
    }
    async createEapAcl(payload, siteId, customHeaders) {
        return await this.networkOps.createEapAcl(payload, siteId, customHeaders);
    }
    async updateEapAcl(aclId, payload, siteId, customHeaders) {
        return await this.networkOps.updateEapAcl(aclId, payload, siteId, customHeaders);
    }
    async deleteAcl(aclId, siteId, customHeaders) {
        return await this.networkOps.deleteAcl(aclId, siteId, customHeaders);
    }
    async getOsgCustomAclList(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getOsgCustomAclList(page, pageSize, siteId, customHeaders);
    }
    async getOswAclList(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getOswAclList(page, pageSize, siteId, customHeaders);
    }
    async getIpsConfig(siteId, customHeaders) {
        return await this.networkOps.getIpsConfig(siteId, customHeaders);
    }
    async getGridSignature(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridSignature(page, pageSize, siteId, customHeaders);
    }
    async getGridAllowList(page, pageSize, searchKey, siteId, customHeaders) {
        return await this.networkOps.getGridAllowList(page, pageSize, searchKey, siteId, customHeaders);
    }
    async getGridBlockList(page, pageSize, searchKey, siteId, customHeaders) {
        return await this.networkOps.getGridBlockList(page, pageSize, searchKey, siteId, customHeaders);
    }
    async getAttackDefenseSetting(siteId, customHeaders) {
        return await this.networkOps.getAttackDefenseSetting(siteId, customHeaders);
    }
    async getUrlFilterGeneral(siteId, customHeaders) {
        return await this.networkOps.getUrlFilterGeneral(siteId, customHeaders);
    }
    async getGridGatewayRule(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridGatewayRule(page, pageSize, siteId, customHeaders);
    }
    async getGridEapRule(page, pageSize, siteId, customHeaders) {
        return await this.networkOps.getGridEapRule(page, pageSize, siteId, customHeaders);
    }
    // Monitor / dashboard operations
    async getDashboardWifiSummary(siteId, customHeaders) {
        return await this.monitorOps.getDashboardWifiSummary(siteId, customHeaders);
    }
    async getDashboardSwitchSummary(siteId, customHeaders) {
        return await this.monitorOps.getDashboardSwitchSummary(siteId, customHeaders);
    }
    async getTrafficDistribution(siteId, start, end, customHeaders) {
        return await this.monitorOps.getTrafficDistribution(siteId, start, end, customHeaders);
    }
    async getRetryAndDroppedRate(siteId, start, end, customHeaders) {
        return await this.monitorOps.getRetryAndDroppedRate(siteId, start, end, customHeaders);
    }
    async getDashboardTrafficActivities(siteId, customHeaders) {
        return await this.monitorOps.getDashboardTrafficActivities(siteId, customHeaders);
    }
    async getDashboardPoEUsage(siteId, customHeaders) {
        return await this.monitorOps.getDashboardPoEUsage(siteId, customHeaders);
    }
    async getDashboardTopCpuUsage(siteId, customHeaders) {
        return await this.monitorOps.getDashboardTopCpuUsage(siteId, customHeaders);
    }
    async getDashboardTopMemoryUsage(siteId, customHeaders) {
        return await this.monitorOps.getDashboardTopMemoryUsage(siteId, customHeaders);
    }
    async getDashboardMostActiveSwitches(siteId, customHeaders) {
        return await this.monitorOps.getDashboardMostActiveSwitches(siteId, customHeaders);
    }
    async getDashboardMostActiveEaps(siteId, customHeaders) {
        return await this.monitorOps.getDashboardMostActiveEaps(siteId, customHeaders);
    }
    async getDashboardOverview(siteId, customHeaders) {
        return await this.monitorOps.getDashboardOverview(siteId, customHeaders);
    }
    async getChannels(siteId, customHeaders) {
        return await this.monitorOps.getChannels(siteId, customHeaders);
    }
    async getIspLoad(siteId, start, end, customHeaders) {
        return await this.monitorOps.getIspLoad(siteId, start, end, customHeaders);
    }
    async getInterference(siteId, customHeaders) {
        return await this.monitorOps.getInterference(siteId, customHeaders);
    }
    async getGridDashboardTunnelStats(siteId, type, customHeaders) {
        return await this.monitorOps.getGridDashboardTunnelStats(siteId, type, customHeaders);
    }
    async getGridDashboardIpsecTunnelStats(siteId, customHeaders) {
        return await this.monitorOps.getGridDashboardIpsecTunnelStats(siteId, customHeaders);
    }
    async getGridDashboardOpenVpnTunnelStats(siteId, type, customHeaders) {
        return await this.monitorOps.getGridDashboardOpenVpnTunnelStats(siteId, type, customHeaders);
    }
    // Insight operations
    async listSiteThreatManagement(options, siteId, customHeaders) {
        return await this.insightOps.listSiteThreatManagement(options, siteId, customHeaders);
    }
    async getWids(siteId, customHeaders) {
        return await this.insightOps.getWids(siteId, customHeaders);
    }
    async getWidsBlacklist(siteId, customHeaders) {
        return await this.insightOps.getWidsBlacklist(siteId, customHeaders);
    }
    async getRogueAps(siteId, customHeaders) {
        return await this.insightOps.getRogueAps(siteId, customHeaders);
    }
    async getVpnTunnelStats(page, pageSize, siteId, customHeaders) {
        return await this.insightOps.getVpnTunnelStats(page, pageSize, siteId, customHeaders);
    }
    async getIpsecVpnStats(page, pageSize, siteId, customHeaders) {
        return await this.insightOps.getIpsecVpnStats(page, pageSize, siteId, customHeaders);
    }
    async listInsightClients(page, pageSize, siteId, customHeaders) {
        return await this.insightOps.listInsightClients(page, pageSize, siteId, customHeaders);
    }
    async getRoutingTable(type, siteId, customHeaders) {
        return await this.insightOps.getRoutingTable(type, siteId, customHeaders);
    }
    async getThreatDetail(threatId, time, siteId, customHeaders) {
        return await this.insightOps.getThreatDetail(threatId, time, siteId, customHeaders);
    }
    // Log operations
    async listSiteEvents(options, siteId, customHeaders) {
        return await this.logOps.listSiteEvents(options, siteId, customHeaders);
    }
    async listSiteAlerts(options, siteId, customHeaders) {
        return await this.logOps.listSiteAlerts(options, siteId, customHeaders);
    }
    async listSiteAuditLogs(options, siteId, customHeaders) {
        return await this.logOps.listSiteAuditLogs(options, siteId, customHeaders);
    }
    async listGlobalEvents(options, customHeaders) {
        return await this.logOps.listGlobalEvents(options, customHeaders);
    }
    async listGlobalAlerts(options, customHeaders) {
        return await this.logOps.listGlobalAlerts(options, customHeaders);
    }
    async listGlobalAuditLogs(options, customHeaders) {
        return await this.logOps.listGlobalAuditLogs(options, customHeaders);
    }
    // Logs, Events & Alerts tools (issue #42)
    async getLogSettingForSite(siteId, customHeaders) {
        return await this.logOps.getLogSettingForSite(siteId, customHeaders);
    }
    async getLogSettingForSiteV2(siteId, customHeaders) {
        return await this.logOps.getLogSettingForSiteV2(siteId, customHeaders);
    }
    async getAuditLogSettingForSite(siteId, customHeaders) {
        return await this.logOps.getAuditLogSettingForSite(siteId, customHeaders);
    }
    async getLogSettingForGlobal(customHeaders) {
        return await this.logOps.getLogSettingForGlobal(customHeaders);
    }
    async getLogSettingForGlobalV2(customHeaders) {
        return await this.logOps.getLogSettingForGlobalV2(customHeaders);
    }
    async getAuditLogSettingForGlobal(customHeaders) {
        return await this.logOps.getAuditLogSettingForGlobal(customHeaders);
    }
    async getAuditLogsForGlobal(page, pageSize, options, customHeaders) {
        return await this.logOps.getAuditLogsForGlobal(page, pageSize, options, customHeaders);
    }
    // security-vpn additions (#75)
    async getRadiusProxyConfig(customHeaders) {
        return await this.networkOps.getRadiusProxyConfig(customHeaders);
    }
    async getGatewayQosClassRules(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getGatewayQosClassRules(page, pageSize, siteId, customHeaders);
    }
    async getBandwidthCtrlDetail(siteId, customHeaders) {
        return await this.networkOps.getBandwidthCtrlDetail(siteId, customHeaders);
    }
    async getAppControlRules(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getAppControlRules(page, pageSize, siteId, customHeaders);
    }
    async createAppControlRule(payload, siteId, customHeaders) {
        return await this.networkOps.createAppControlRule(payload, siteId, customHeaders);
    }
    async updateAppControlRule(ruleId, payload, siteId, customHeaders) {
        return await this.networkOps.updateAppControlRule(ruleId, payload, siteId, customHeaders);
    }
    async deleteAppControlRule(ruleId, siteId, customHeaders) {
        return await this.networkOps.deleteAppControlRule(ruleId, siteId, customHeaders);
    }
    async getAppControlCategories(siteId, customHeaders) {
        return await this.networkOps.getAppControlCategories(siteId, customHeaders);
    }
    async getApplications(page = 1, pageSize = 10, searchKey, filtersFamilyId, siteId, customHeaders) {
        return await this.networkOps.getApplications(page, pageSize, searchKey, filtersFamilyId, siteId, customHeaders);
    }
    async getQosPolicy(siteId, customHeaders) {
        return await this.networkOps.getQosPolicy(siteId, customHeaders);
    }
    async getTrafficPriority(siteId, customHeaders) {
        return await this.networkOps.getTrafficPriority(siteId, customHeaders);
    }
    async getVpnUserList(page = 1, pageSize = 10, siteId, customHeaders) {
        return await this.networkOps.getVpnUserList(page, pageSize, siteId, customHeaders);
    }
    async getVpnUserDetail(vpnId, siteId, customHeaders) {
        return await this.networkOps.getVpnUserDetail(vpnId, siteId, customHeaders);
    }
    async getGoogleLdapProfile(siteId, customHeaders) {
        return await this.networkOps.getGoogleLdapProfile(siteId, customHeaders);
    }
    async getPpskUserGroup(profileId, siteId, customHeaders) {
        return await this.networkOps.getPpskUserGroup(profileId, siteId, customHeaders);
    }
    async getUserRoleProfile(customHeaders) {
        return await this.networkOps.getUserRoleProfile(customHeaders);
    }
    async getPortalProfile(siteId, customHeaders) {
        return await this.networkOps.getPortalProfile(siteId, customHeaders);
    }
    async getMulticastRateLimit(siteId, customHeaders) {
        return await this.networkOps.getMulticastRateLimit(siteId, customHeaders);
    }
    // Device — new AP tools (route through DeviceOperations wrappers for naming consistency)
    async getApLoadBalance(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApLoadBalance(apMac, siteId, customHeaders);
    }
    async getApOfdmaConfig(apMac, siteId, customHeaders) {
        return await this.deviceOps.getApOfdmaConfig(apMac, siteId, customHeaders);
    }
    // Site detail and template operations
    async getSiteDetail(siteId, customHeaders) {
        return await this.siteOps.getSiteDetail(siteId, customHeaders);
    }
    async getSiteUrl(siteId, customHeaders) {
        return await this.siteOps.getSiteUrl(siteId, customHeaders);
    }
    async getSiteNtpStatus(siteId, customHeaders) {
        return await this.siteOps.getSiteNtpStatus(siteId, customHeaders);
    }
    async getSiteSpecification(siteId, customHeaders) {
        return await this.siteOps.getSiteSpecification(siteId, customHeaders);
    }
    async getSiteRememberSetting(siteId, customHeaders) {
        return await this.siteOps.getSiteRememberSetting(siteId, customHeaders);
    }
    async getSiteDeviceAccount(siteId, customHeaders) {
        return await this.siteOps.getSiteDeviceAccount(siteId, customHeaders);
    }
    async getSiteCapacity(siteId, customHeaders) {
        return await this.siteOps.getSiteCapacity(siteId, customHeaders);
    }
    async getSiteTemplateList(customHeaders) {
        return await this.siteOps.getSiteTemplateList(customHeaders);
    }
    async getSiteTemplateDetail(siteTemplateId, customHeaders) {
        return await this.siteOps.getSiteTemplateDetail(siteTemplateId, customHeaders);
    }
    async getSiteTemplateConfig(siteTemplateId, customHeaders) {
        return await this.siteOps.getSiteTemplateConfig(siteTemplateId, customHeaders);
    }
    // Controller operations
    async getDataRetention(customHeaders) {
        return await this.controllerOps.getDataRetention(customHeaders);
    }
    async getControllerPort(customHeaders) {
        return await this.controllerOps.getControllerPort(customHeaders);
    }
    async getPortalPort(customHeaders) {
        return await this.controllerOps.getPortalPort(customHeaders);
    }
    async getCertificate(customHeaders) {
        return await this.controllerOps.getCertificate(customHeaders);
    }
    async getExperienceImprovement(customHeaders) {
        return await this.controllerOps.getExperienceImprovement(customHeaders);
    }
    async getGlobalDashboardOverview(customHeaders) {
        return await this.controllerOps.getGlobalDashboardOverview(customHeaders);
    }
    async getClientHistoryDataEnable(customHeaders) {
        return await this.controllerOps.getClientHistoryDataEnable(customHeaders);
    }
    // Maintenance operations
    async getBackupFileList(customHeaders) {
        return await this.maintenanceOps.getBackupFileList(customHeaders);
    }
    async getBackupResult(customHeaders) {
        return await this.maintenanceOps.getBackupResult(customHeaders);
    }
    async getRestoreResult(customHeaders) {
        return await this.maintenanceOps.getRestoreResult(customHeaders);
    }
    async getSiteBackupResult(siteId, customHeaders) {
        return await this.maintenanceOps.getSiteBackupResult(siteId, customHeaders);
    }
    async getSiteBackupFileList(siteId, customHeaders) {
        return await this.maintenanceOps.getSiteBackupFileList(siteId, customHeaders);
    }
    async getRogueApExport(siteId, format, page, pageSize, customHeaders) {
        return await this.maintenanceOps.getRogueApExport(siteId, format, page, pageSize, customHeaders);
    }
    async backupController(retainUser, customHeaders) {
        return await this.maintenanceOps.backupController(retainUser, customHeaders);
    }
    async backupControllerToFileServer(serverConfig, filePath, retainUser, customHeaders) {
        return await this.maintenanceOps.backupControllerToFileServer(serverConfig, filePath, retainUser, customHeaders);
    }
    async restoreController(fileName, customHeaders) {
        return await this.maintenanceOps.restoreController(fileName, customHeaders);
    }
    async restoreControllerFromFileServer(serverConfig, filePath, skipDevice, customHeaders) {
        return await this.maintenanceOps.restoreControllerFromFileServer(serverConfig, filePath, skipDevice, customHeaders);
    }
    async backupSites(siteIds, customHeaders) {
        return await this.maintenanceOps.backupSites(siteIds, customHeaders);
    }
    async backupSitesToFileServer(serverConfig, filePath, siteIds, customHeaders) {
        return await this.maintenanceOps.backupSitesToFileServer(serverConfig, filePath, siteIds, customHeaders);
    }
    async restoreSites(siteRestoreInfos, customHeaders) {
        return await this.maintenanceOps.restoreSites(siteRestoreInfos, customHeaders);
    }
    async restoreSitesFromFileServer(serverConfig, siteInfos, customHeaders) {
        return await this.maintenanceOps.restoreSitesFromFileServer(serverConfig, siteInfos, customHeaders);
    }
    // Account operations
    async getAllCloudUsers(customHeaders) {
        return await this.accountOps.getAllCloudUsers(customHeaders);
    }
    async getAllLocalUsers(customHeaders) {
        return await this.accountOps.getAllLocalUsers(customHeaders);
    }
    async getAllRoles(customHeaders) {
        // Delegate to AccountOperations — single source of truth for /roles endpoint
        return await this.accountOps.getAllRoles(customHeaders);
    }
    async getRoleDetail(roleId, customHeaders) {
        return await this.accountOps.getRoleDetail(roleId, customHeaders);
    }
    async getAvailableRoles(customHeaders) {
        return await this.accountOps.getAvailableRoles(customHeaders);
    }
    async getAllUsersApp(customHeaders) {
        return await this.accountOps.getAllUsersApp(customHeaders);
    }
    async getCloudAccessStatus(customHeaders) {
        return await this.accountOps.getCloudAccessStatus(customHeaders);
    }
    async getCloudUserInfo(customHeaders) {
        return await this.accountOps.getCloudUserInfo(customHeaders);
    }
    async getMfaStatus(customHeaders) {
        return await this.accountOps.getMfaStatus(customHeaders);
    }
    async getRemoteBindingStatus(customHeaders) {
        return await this.accountOps.getRemoteBindingStatus(customHeaders);
    }
    // Schedule operations
    async getUpgradeScheduleList(siteId, customHeaders) {
        return await this.scheduleOps.getUpgradeScheduleList(siteId, customHeaders);
    }
    async getRebootScheduleList(siteTemplateId, customHeaders) {
        return await this.scheduleOps.getRebootScheduleList(siteTemplateId, customHeaders);
    }
    async getPoeScheduleList(siteId, customHeaders) {
        return await this.scheduleOps.getPoeScheduleList(siteId, customHeaders);
    }
    async getPortScheduleList(siteId, customHeaders) {
        return await this.scheduleOps.getPortScheduleList(siteId, customHeaders);
    }
    async getPortSchedulePorts(siteId, customHeaders) {
        return await this.scheduleOps.getPortSchedulePorts(siteId, customHeaders);
    }
    // Generic API call
    async callApi(config, customHeaders) {
        return await this.request.request(config, true, customHeaders);
    }
    /**
     * Build a full Omada API path from a relative path.
     * @param relativePath - The relative path to append to the base API path
     * @param version - The API version to use (default: 'v1')
     */
    buildOmadaPath(relativePath, version = 'v1') {
        const omadaId = this.auth.getOmadacIdSync() || this.omadacId;
        const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
        return `/openapi/${version}/${encodeURIComponent(omadaId)}${normalized}`;
    }
}
//# sourceMappingURL=index.js.map