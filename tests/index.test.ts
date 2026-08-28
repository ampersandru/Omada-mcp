import { beforeEach, describe, expect, it, vi } from 'vitest';

const baseConfig = {
    useHttp: false,
    unsafeEnableHttp: false,
    capabilityProfile: 'safe-read',
    logLevel: 'info',
    logFormat: 'plain',
    baseUrl: 'https://controller.local',
    omadacId: 'omada-1',
    siteId: 'site-1',
    strictSsl: true,
    requestTimeout: 15_000,
    httpTransport: 'stream',
    toolCategories: new Map(),
    startupWarnings: [],
};

const loadEntry = async () => import('../src/index.js');

describe('src/index main entry', () => {
    let mockInitLogger: ReturnType<typeof vi.fn>;
    let loggerInfo: ReturnType<typeof vi.fn>;
    let loggerWarn: ReturnType<typeof vi.fn>;
    let loggerError: ReturnType<typeof vi.fn>;
    let startHttpServer: ReturnType<typeof vi.fn>;
    let startStdioServer: ReturnType<typeof vi.fn>;
    let OmadaClient: ReturnType<typeof vi.fn>;
    let loadConfigFromEnv: ReturnType<typeof vi.fn>;
    let stderrWrite: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        process.exitCode = undefined;

        mockInitLogger = vi.fn();
        loggerInfo = vi.fn();
        loggerWarn = vi.fn();
        loggerError = vi.fn();
        startHttpServer = vi.fn(async () => undefined);
        startStdioServer = vi.fn(async () => undefined);
        loadConfigFromEnv = vi.fn();
        OmadaClient = vi.fn(function OmadaClientMock(config: Record<string, unknown>) {
            return {
                client: 'instance',
                config,
                init: vi.fn(async () => undefined),
                getOmadacId: vi.fn().mockReturnValue('discovered-cid'),
                getDefaultSiteId: vi.fn().mockReturnValue('discovered-site'),
            };
        });
        stderrWrite = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

        vi.doMock('../src/env.js', () => ({}));
        vi.doMock('../src/config.js', () => ({
            loadConfigFromEnv,
        }));
        vi.doMock('../src/omadaClient/index.js', () => ({
            OmadaClient,
        }));
        vi.doMock('../src/server/http.js', () => ({
            startHttpServer,
        }));
        vi.doMock('../src/server/stdio.js', () => ({
            startStdioServer,
        }));
        vi.doMock('../src/utils/logger.js', () => ({
            initLogger: mockInitLogger,
            logger: {
                info: loggerInfo,
                warn: loggerWarn,
                error: loggerError,
            },
        }));
    });

    afterEach(() => {
        stderrWrite.mockRestore();
    });

    it('starts stdio server when HTTP is disabled', async () => {
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: false });

        await loadEntry();

        expect(mockInitLogger).toHaveBeenCalledWith('info', 'plain', true);
        expect(OmadaClient).toHaveBeenCalledWith(expect.objectContaining({ baseUrl: 'https://controller.local' }));
        expect(startStdioServer).toHaveBeenCalledWith(expect.objectContaining({ client: 'instance' }), new Map());
        expect(startHttpServer).not.toHaveBeenCalled();
        expect(loggerInfo).toHaveBeenCalledWith(
            'Starting Safe Omada MCP server',
            expect.objectContaining({ name: 'safe-omada-mcp', version: expect.any(String), mode: 'stdio' })
        );
        expect(loggerInfo).toHaveBeenCalledWith('Loaded Omada configuration', expect.objectContaining({ omadacId: 'omada-1' }));
    });

    it('starts HTTP server when enabled and passes auto-detected siteId/omadacId', async () => {
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: true, logFormat: 'json', omadacId: undefined, siteId: undefined });

        await loadEntry();

        expect(mockInitLogger).toHaveBeenCalledWith('info', 'json', false);
        expect(OmadaClient).toHaveBeenCalledWith(expect.objectContaining({ baseUrl: 'https://controller.local' }));
        expect(startHttpServer).toHaveBeenCalledWith(
            expect.objectContaining({ useHttp: true }),
            expect.objectContaining({ omadacId: 'discovered-cid', siteId: 'discovered-site' })
        );
        expect(startStdioServer).not.toHaveBeenCalled();
    });

    it('handles initial probe failure gracefully in HTTP mode', async () => {
        OmadaClient.mockImplementationOnce(function () {
            return {
                init: vi.fn().mockRejectedValue(new Error('probe network error')),
                getOmadacId: vi.fn(),
                getDefaultSiteId: vi.fn(),
            };
        });
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: true });

        await loadEntry();

        expect(loggerWarn).toHaveBeenCalledWith('Initial Omada probe failed', expect.objectContaining({ error: 'probe network error' }));
        expect(startHttpServer).toHaveBeenCalled();
    });

    it('writes non-Error startup failures to stderr and sets exit code', async () => {
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: false });
        startStdioServer.mockRejectedValueOnce('raw-string-failure');

        await loadEntry();

        expect(stderrWrite).toHaveBeenCalledWith(expect.stringContaining('Failed to start Omada MCP server: raw-string-failure'));
        expect(process.exitCode).toBe(1);
    });

    it('handles probe error when thrown value is a non-Error string', async () => {
        OmadaClient.mockImplementationOnce(function () {
            return {
                init: vi.fn().mockRejectedValue('string probe error'),
                getOmadacId: vi.fn(),
                getDefaultSiteId: vi.fn(),
            };
        });
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: true });

        await loadEntry();

        expect(loggerWarn).toHaveBeenCalledWith('Initial Omada probe failed', expect.objectContaining({ error: 'string probe error' }));
        expect(startHttpServer).toHaveBeenCalled();
    });

    it('handles client when init is not a function', async () => {
        OmadaClient.mockImplementationOnce(function () {
            return {
                client: 'instance',
            };
        });
        loadConfigFromEnv.mockReturnValue({ ...baseConfig, useHttp: false });

        await loadEntry();

        expect(startStdioServer).toHaveBeenCalled();
    });

    it('emits startup warnings only after logger is initialized', async () => {
        loadConfigFromEnv.mockReturnValue({
            ...baseConfig,
            useHttp: false,
            startupWarnings: ['Unknown category: "network-sim-lte" is a future/unimplemented category'],
        });

        await loadEntry();

        expect(loggerWarn).toHaveBeenCalledWith('Unknown category: "network-sim-lte" is a future/unimplemented category');
        // initLogger must have been called before any warning was emitted
        const initOrder = mockInitLogger.mock.invocationCallOrder[0];
        const warnOrder = loggerWarn.mock.invocationCallOrder[0];
        expect(initOrder).toBeLessThan(warnOrder);
    });
});
