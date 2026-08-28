import type { CustomHeaders } from '../types/index.js';
import type { RequestHandler } from './request.js';
import type { SiteOperations } from './site.js';
/**
 * Low-risk operational actions backed by the official Omada Open API.
 * These are intentionally limited to device/client actions with clear operator intent.
 */
export declare class ActionOperations {
    private readonly request;
    private readonly site;
    private readonly buildPath;
    constructor(request: RequestHandler, site: SiteOperations, buildPath: (path: string, version?: string) => string);
    rebootDevice(deviceMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    blockClient(clientMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    unblockClient(clientMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    reconnectClient(clientMac: string, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
    setDeviceLed(deviceMac: string, ledSetting: number, siteId?: string, customHeaders?: CustomHeaders): Promise<unknown>;
}
