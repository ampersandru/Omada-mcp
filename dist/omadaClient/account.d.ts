import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
/**
 * Account-related operations for the Omada API.
 * Covers users, roles, cloud access, and MFA settings.
 */
export declare class AccountOperations {
    private readonly request;
    private readonly buildPath;
    constructor(request: RequestHandler, buildPath: (path: string) => string);
    /**
     * Get all cloud users (excluding root).
     * OperationId: getAllCloudUsersExcludeRoot
     */
    getAllCloudUsers(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get all local users (excluding root).
     * OperationId: getAllLocalUsersExcludeRoot
     */
    getAllLocalUsers(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get all roles.
     * OperationId: getAllRoles
     */
    getAllRoles(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get role detail by role ID.
     * OperationId: getRole
     */
    getRoleDetail(roleId: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get available roles for assignment.
     * OperationId: getAvailableRole
     */
    getAvailableRoles(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get all users (app grid view).
     * OperationId: getAppGridUsers
     */
    getAllUsersApp(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get cloud access status.
     * OperationId: getCloudAccessStatus
     */
    getCloudAccessStatus(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get cloud user info.
     * OperationId: getCloudUserInfo
     */
    getCloudUserInfo(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get global MFA status.
     * OperationId: getGlobalMFAStatus
     */
    getMfaStatus(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get remote binding status.
     * OperationId: getRemoteBindingStatus
     */
    getRemoteBindingStatus(customHeaders?: CustomHeaders): Promise<unknown>;
}
