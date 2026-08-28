import type { CustomHeaders, OmadaSiteSummary } from '../types/index.js';
import type { RequestHandler } from './request.js';
/**
 * Site-related operations for the Omada API.
 */
export declare class SiteOperations {
    private readonly request;
    private readonly buildPath;
    private defaultSiteId?;
    constructor(request: RequestHandler, buildPath: (path: string) => string, defaultSiteId?: string);
    getDefaultSiteId(): string | undefined;
    setDefaultSiteId(siteId: string): void;
    /**
     * List all sites accessible to the authenticated user.
     */
    listSites(customHeaders?: CustomHeaders): Promise<OmadaSiteSummary[]>;
    /**
     * Resolve a site ID from the parameter or default configuration.
     * Maps 'Default' / 'default' to configured/discovered hex site ID if available.
     * @throws {Error} If no site ID is available
     */
    resolveSiteId(siteId?: string): string;
    /**
     * Get site detail by site ID.
     * OperationId: getSiteEntity
     */
    getSiteDetail(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site URL.
     * OperationId: getSiteUrlByOpenApi
     */
    getSiteUrl(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site NTP server status.
     * OperationId: getNtpServerStatus
     */
    getSiteNtpStatus(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site specification.
     * OperationId: getSiteSpecification
     */
    getSiteSpecification(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site remember device setting.
     * OperationId: getSiteRememberSettingByOpenApi
     */
    getSiteRememberSetting(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site device account setting.
     * OperationId: getSiteDeviceAccountSetting
     */
    getSiteDeviceAccount(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site capacity.
     * OperationId: getSiteSettingCap
     */
    getSiteCapacity(siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site template list.
     * OperationId: getSiteTemplateList
     */
    getSiteTemplateList(customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site template detail by template ID.
     * OperationId: getSiteTemplateEntity
     */
    getSiteTemplateDetail(siteTemplateId: string, customHeaders?: CustomHeaders): Promise<unknown>;
    /**
     * Get site template configuration.
     * OperationId: getSiteTemplateConfiguration
     */
    getSiteTemplateConfig(siteTemplateId: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
