import type { ActiveClientInfo, ClientActivity, ClientPastConnection, ClientRateLimitSetting, CustomHeaders, GetClientActivityOptions, ListClientsPastConnectionsOptions, OmadaClientInfo, RateLimitProfile } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Client-related operations for the Omada API.
 */
export declare class ClientOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * List all clients in a site.
     */
    listClients(siteId?: string, customHeaders?: CustomHeaders): Promise<OmadaClientInfo[]>;
    /**
     * Get a specific client by MAC address or client ID.
     */
    getClient(identifier: string, siteId?: string, customHeaders?: CustomHeaders): Promise<OmadaClientInfo | undefined>;
    /**
     * Get most active clients in a site (dashboard endpoint).
     * Returns clients sorted by total traffic.
     *
     * @param siteId - Optional site ID, uses default from config if not provided
     * @returns Array of active client information
     */
    listMostActiveClients(siteId?: string, customHeaders?: CustomHeaders): Promise<ActiveClientInfo[]>;
    /**
     * Get client activity statistics over time (dashboard endpoint).
     * Returns time-series data about new, active, and disconnected clients.
     *
     * @param options - Options including optional siteId, start, and end timestamps
     * @returns Array of client activity snapshots over time
     */
    listClientsActivity(options?: GetClientActivityOptions, customHeaders?: CustomHeaders): Promise<ClientActivity[]>;
    /**
     * Get client past connection list (insight endpoint).
     * Returns historical client connection data with support for pagination, filtering, and sorting.
     *
     * @param options - Options including siteId, pagination, filters, and search parameters
     * @returns Array of client past connection information
     */
    listClientsPastConnections(options: ListClientsPastConnectionsOptions, customHeaders?: CustomHeaders): Promise<ClientPastConnection[]>;
    /**
     * Get rate limit profile list for a site.
     * Returns available rate limit profiles that can be applied to clients.
     *
     * @param siteId - Optional site ID, uses default from config if not provided
     * @returns Array of rate limit profiles
     */
    getRateLimitProfiles(siteId?: string, customHeaders?: CustomHeaders): Promise<RateLimitProfile[]>;
    /**
     * Set custom rate limit for a client.
     * Configures download and upload bandwidth limits directly without using a profile.
     *
     * @param clientMac - MAC address of the client
     * @param downLimit - Download limit in Kbps
     * @param upLimit - Upload limit in Kbps
     * @param siteId - Optional site ID, uses default from config if not provided
     * @returns Updated rate limit setting
     */
    setClientRateLimit(clientMac: string, downLimit: number, upLimit: number, siteId?: string, customHeaders?: CustomHeaders): Promise<ClientRateLimitSetting>;
    /**
     * Set rate limit profile for a client.
     * Applies a predefined rate limit profile to the client.
     *
     * @param clientMac - MAC address of the client
     * @param profileId - Rate limit profile ID
     * @param siteId - Optional site ID, uses default from config if not provided
     * @returns Updated rate limit setting
     */
    setClientRateLimitProfile(clientMac: string, profileId: string, siteId?: string, customHeaders?: CustomHeaders): Promise<ClientRateLimitSetting>;
    /**
     * Disable rate limit for a client.
     * Removes any rate limiting applied to the client.
     *
     * @param clientMac - MAC address of the client
     * @param siteId - Optional site ID, uses default from config if not provided
     * @returns Updated rate limit setting
     */
    disableClientRateLimit(clientMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<ClientRateLimitSetting>;
    /**
     * Get full detail for a single client by MAC address.
     * OperationId: getClientDetail
     */
    getClientDetail(clientMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get historical known clients list (paginated).
     * OperationId: getGridKnownClients
     */
    getGridKnownClients(page: number, pageSize: number, options?: {
        sortLastSeen?: string;
        timeStart?: string;
        timeEnd?: string;
        guest?: string;
        searchKey?: string;
    }, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get per-client connection history (paginated).
     * OperationId: getGridClientHistory
     */
    getGridClientHistory(clientMac: string, page: number, pageSize: number, searchKey?: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get client count distribution by type/band.
     * OperationId: getClientsDistribution
     */
    getClientsDistribution(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get historical client count trend over a time range.
     * OperationId: getPastClientNum
     */
    getPastClientNum(start: number, end: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
