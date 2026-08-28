/**
 * Account-related operations for the Omada API.
 * Covers users, roles, cloud access, and MFA settings.
 */
export class AccountOperations {
    request;
    buildPath;
    constructor(request, buildPath) {
        this.request = request;
        this.buildPath = buildPath;
    }
    /**
     * Get all cloud users (excluding root).
     * OperationId: getAllCloudUsersExcludeRoot
     */
    async getAllCloudUsers(customHeaders) {
        const path = this.buildPath('/users/cloud');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get all local users (excluding root).
     * OperationId: getAllLocalUsersExcludeRoot
     */
    async getAllLocalUsers(customHeaders) {
        const path = this.buildPath('/users/local');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get all roles.
     * OperationId: getAllRoles
     */
    async getAllRoles(customHeaders) {
        const path = this.buildPath('/roles');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get role detail by role ID.
     * OperationId: getRole
     */
    async getRoleDetail(roleId, customHeaders) {
        const path = this.buildPath(`/roles/${encodeURIComponent(roleId)}`);
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get available roles for assignment.
     * OperationId: getAvailableRole
     */
    async getAvailableRoles(customHeaders) {
        const path = this.buildPath('/roles/available');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get all users (app grid view).
     * OperationId: getAppGridUsers
     */
    async getAllUsersApp(customHeaders) {
        const path = this.buildPath('/all-users');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get cloud access status.
     * OperationId: getCloudAccessStatus
     */
    async getCloudAccessStatus(customHeaders) {
        const path = this.buildPath('/cloud/status');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get cloud user info.
     * OperationId: getCloudUserInfo
     */
    async getCloudUserInfo(customHeaders) {
        const path = this.buildPath('/cloud/user');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get global MFA status.
     * OperationId: getGlobalMFAStatus
     */
    async getMfaStatus(customHeaders) {
        const path = this.buildPath('/mfa/status');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
    /**
     * Get remote binding status.
     * OperationId: getRemoteBindingStatus
     */
    async getRemoteBindingStatus(customHeaders) {
        const path = this.buildPath('/cloud/remote/bind/status');
        const response = await this.request.get(path, undefined, customHeaders);
        return this.request.ensureSuccess(response);
    }
}
//# sourceMappingURL=account.js.map