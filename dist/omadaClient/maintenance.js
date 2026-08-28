/**
 * Maintenance operations for the Omada API.
 * Covers backup and restore status and file listing.
 */
export class MaintenanceOperations {
    request;
    site;
    buildPath;
    constructor(request, site, buildPath) {
        this.request = request;
        this.site = site;
        this.buildPath = buildPath;
    }
    /**
     * Get list of controller backup files.
     * OperationId: getSelfServerFileList
     */
    async getBackupFileList(customHeaders) {
        const path = this.buildPath('/maintenance/backup/files');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get controller backup result.
     * OperationId: getBackupResult
     */
    async getBackupResult(customHeaders) {
        const path = this.buildPath('/maintenance/backup/result');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get controller restore result.
     * OperationId: getRestoreResult
     */
    async getRestoreResult(customHeaders) {
        const path = this.buildPath('/maintenance/restore/result');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get site backup result.
     * OperationId: getSiteBackupResult
     */
    async getSiteBackupResult(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/backup/result`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get list of site backup files.
     * OperationId: getSelfServerSiteFileList
     */
    async getSiteBackupFileList(siteId, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/maintenance/backup/files`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Export site Rogue AP scan results.
     * OperationId: getSitesRogueAp
     */
    async getRogueApExport(siteId, format = '0', page = 1, pageSize = 10, customHeaders) {
        const resolvedSiteId = this.site.resolveSiteId(siteId);
        const path = this.buildPath(`/sites/${encodeURIComponent(resolvedSiteId)}/rogue-ap/export/${encodeURIComponent(format)}`);
        const response = await this.request.get(path, { page, pageSize }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Backup controller config to self/cloud server.
     * OperationId: backupSelfServer
     */
    async backupController(retainUser, customHeaders) {
        const path = this.buildPath('/maintenance/backup/self-server');
        const response = await this.request.post(path, { retainUser }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Backup controller config to file server.
     * OperationId: backupFileServer
     */
    async backupControllerToFileServer(serverConfig, filePath, retainUser, customHeaders) {
        const path = this.buildPath('/maintenance/backup/file-server');
        const response = await this.request.post(path, { serverConfig, filePath, retainUser }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Restore controller config from self/cloud server.
     * OperationId: restoreSelfServer
     */
    async restoreController(fileName, customHeaders) {
        const path = this.buildPath('/maintenance/restore/self-server');
        const response = await this.request.post(path, { fileName }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Restore controller config from file server.
     * OperationId: restoreFileServer
     */
    async restoreControllerFromFileServer(serverConfig, filePath, skipDevice, customHeaders) {
        const path = this.buildPath('/maintenance/restore/file-server');
        const response = await this.request.post(path, { serverConfig, filePath, skipDevice }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Backup multiple sites config to self server.
     * OperationId: backupSitesSelfServer
     */
    async backupSites(siteIds, customHeaders) {
        const path = this.buildPath('/sites/maintenance/multi-backup/self-server');
        const response = await this.request.post(path, { siteIds }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Backup multiple sites config to file server.
     * OperationId: backupSitesFileServer
     */
    async backupSitesToFileServer(serverConfig, filePath, siteIds, customHeaders) {
        const path = this.buildPath('/sites/maintenance/multi-backup/file-server');
        const response = await this.request.post(path, { serverConfig, filePath, siteIds }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Restore multiple sites config from self server.
     * OperationId: restoreSitesSelfServer
     */
    async restoreSites(siteRestoreInfos, customHeaders) {
        const path = this.buildPath('/sites/maintenance/multi-restore/self-server');
        const response = await this.request.post(path, { siteRestoreInfos }, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Restore multiple sites config from file server.
     * OperationId: restoreSitesFileServer
     */
    async restoreSitesFromFileServer(serverConfig, siteInfos, customHeaders) {
        const path = this.buildPath('/sites/maintenance/multi-restore/file-server');
        const response = await this.request.post(path, { serverConfig, siteInfos }, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=maintenance.js.map