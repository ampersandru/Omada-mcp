export type OmadaAuthMode = 'auto' | 'web' | 'openapi';
export interface WebLoginResult {
    token: string;
    [key: string]: unknown;
}
export interface ControllerInfoResult {
    omadacId?: string;
    controllerVersion?: string;
    type?: number;
    [key: string]: unknown;
}
