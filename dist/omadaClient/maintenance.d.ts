import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
export interface FileServerConfig {
    protocol: string;
    hostname: string;
    port: number;
    username?: string;
    password?: string;
}
export interface SiteRestoreInfo {
    fileName: string;
    siteId: string;
}
export interface SiteFileRestoreInfo {
    filePath: string;
    siteId: string;
}
/**
 * Maintenance operations for the Omada API.
 * Covers backup and restore status and file listing.
 */
export declare class MaintenanceOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string) => string);
    /**
     * Get list of controller backup files.
     * OperationId: getSelfServerFileList
     */
    getBackupFileList(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller backup result.
     * OperationId: getBackupResult
     */
    getBackupResult(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get controller restore result.
     * OperationId: getRestoreResult
     */
    getRestoreResult(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site backup result.
     * OperationId: getSiteBackupResult
     */
    getSiteBackupResult(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get list of site backup files.
     * OperationId: getSelfServerSiteFileList
     */
    getSiteBackupFileList(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Export site Rogue AP scan results.
     * OperationId: getSitesRogueAp
     */
    getRogueApExport(siteId?: string, format?: '0' | '1', page?: number, pageSize?: number, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Backup controller config to self/cloud server.
     * OperationId: backupSelfServer
     */
    backupController(retainUser: boolean, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Backup controller config to file server.
     * OperationId: backupFileServer
     */
    backupControllerToFileServer(serverConfig: FileServerConfig, filePath: string, retainUser: boolean, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Restore controller config from self/cloud server.
     * OperationId: restoreSelfServer
     */
    restoreController(fileName: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Restore controller config from file server.
     * OperationId: restoreFileServer
     */
    restoreControllerFromFileServer(serverConfig: FileServerConfig, filePath: string, skipDevice: boolean, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Backup multiple sites config to self server.
     * OperationId: backupSitesSelfServer
     */
    backupSites(siteIds: string[], customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Backup multiple sites config to file server.
     * OperationId: backupSitesFileServer
     */
    backupSitesToFileServer(serverConfig: FileServerConfig, filePath: string, siteIds: string[], customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Restore multiple sites config from self server.
     * OperationId: restoreSitesSelfServer
     */
    restoreSites(siteRestoreInfos: SiteRestoreInfo[], customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Restore multiple sites config from file server.
     * OperationId: restoreSitesFileServer
     */
    restoreSitesFromFileServer(serverConfig: FileServerConfig, siteInfos: SiteFileRestoreInfo[], customHeaders?: CustomHeaders): Promise<unknown>;
}
