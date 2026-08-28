import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Monitor / dashboard operations for the Omada API.
 * Covers site dashboard statistics and summaries.
 */
export declare class MonitorOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * Get WiFi summary for a site dashboard.
     * OperationId: getWifiSummary
     */
    getDashboardWifiSummary(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get switch summary for a site dashboard.
     * OperationId: getSwitchSummary
     */
    getDashboardSwitchSummary(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get traffic distribution statistics for a site dashboard.
     * OperationId: getTrafficDistribution
     */
    getTrafficDistribution(siteId?: string, start?: number, end?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get wireless retry rate and dropped packet rate over a time range.
     * OperationId: getRetryAndDroppedRate
     */
    getRetryAndDroppedRate(siteId?: string, start?: number, end?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get traffic activity time-series data for a site dashboard.
     * OperationId: getTrafficActivities
     */
    getDashboardTrafficActivities(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get PoE usage statistics for a site dashboard.
     * OperationId: getPoeUsage
     */
    getDashboardPoEUsage(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get top devices by CPU usage for a site dashboard.
     * OperationId: getTopDeviceCpuUsage
     */
    getDashboardTopCpuUsage(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get top devices by memory usage for a site dashboard.
     * OperationId: getTopDeviceMemoryUsage
     */
    getDashboardTopMemoryUsage(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get most active switches for a site dashboard.
     * OperationId: getMostActiveSwitches
     */
    getDashboardMostActiveSwitches(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get most active EAPs (access points) for a site dashboard.
     * OperationId: getMostActiveEaps
     */
    getDashboardMostActiveEaps(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown[]>;
    /**
     * Get site overview diagram data for a site dashboard.
     * OperationId: getOverviewDiagram
     */
    getDashboardOverview(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get channel distribution and utilization across all APs.
     * OperationId: getChannels
     */
    getChannels(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get per-WAN ISP link load over a time range.
     * OperationId: getIspLoad
     */
    getIspLoad(siteId?: string, start?: number, end?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get top RF interference sources detected by APs.
     * OperationId: getInterference
     */
    getInterference(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get VPN tunnel statistics by type.
     * OperationId: getGridDashboardTunnelStats
     */
    getGridDashboardTunnelStats(siteId?: string, type?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get IPsec tunnel statistics.
     * OperationId: getGridDashboardIpsecTunnelStats
     */
    getGridDashboardIpsecTunnelStats(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get OpenVPN tunnel statistics by type.
     * OperationId: getGridDashboardOpenVpnTunnelStats
     */
    getGridDashboardOpenVpnTunnelStats(siteId?: string, type?: number, customHeaders?: CustomHeaders): Promise<unknown>;
}
