import './env.js';
import pkg from '../package.json' with { type: 'json' };
import type { OmadaConnectionConfig } from './config.js';
import { loadConfigFromEnv } from './config.js';
import { OmadaClient } from './omadaClient/index.js';
import { startHttpServer } from './server/http.js';
import { startStdioServer } from './server/stdio.js';
import { initLogger, logger } from './utils/logger.js';

async function main(): Promise<void> {
    const config = loadConfigFromEnv();

    // When running in stdio mode, logs must go to stderr to avoid interfering with MCP protocol on stdout
    const useStderr = !config.useHttp;

    // Initialize logger with configured level, format, and output stream
    initLogger(config.logLevel, config.logFormat, useStderr);

    // Startup banner
    logger.info('Starting Safe Omada MCP server', {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        mode: config.useHttp ? 'http' : 'stdio',
        logLevel: config.logLevel,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
    });

    for (const warning of config.startupWarnings) {
        logger.warn(warning);
    }

    logger.info('Loaded Omada configuration', {
        baseUrl: config.baseUrl,
        authMode: config.authMode,
        username: config.username ? 'configured' : undefined,
        clientId: config.clientId ? 'configured' : undefined,
        omadacId: config.omadacId ?? 'auto-detect',
        siteId: config.siteId ?? null,
        strictSsl: config.strictSsl,
        requestTimeout: config.requestTimeout ?? null,
        capabilityProfile: config.capabilityProfile,
    });

    const omadaConfig: OmadaConnectionConfig = {
        baseUrl: config.baseUrl,
        authMode: config.authMode,
        username: config.username,
        password: config.password,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        omadacId: config.omadacId,
        siteId: config.siteId,
        strictSsl: config.strictSsl,
        requestTimeout: config.requestTimeout,
    };

    if (config.useHttp) {
        // Pre-initialize to auto-detect CID and default siteId if not explicitly provided
        const probeClient = new OmadaClient(omadaConfig);
        if (typeof probeClient.init === 'function') {
            try {
                await probeClient.init();
                if (!omadaConfig.omadacId && probeClient.getOmadacId()) {
                    omadaConfig.omadacId = probeClient.getOmadacId();
                }
                if (!omadaConfig.siteId && probeClient.getDefaultSiteId()) {
                    omadaConfig.siteId = probeClient.getDefaultSiteId();
                }
            } catch (err) {
                logger.warn('Initial Omada probe failed', {
                    error: err instanceof Error ? err.message : String(err),
                });
            }
        }
        await startHttpServer(config, omadaConfig);
    } else {
        const client = new OmadaClient(omadaConfig);
        if (typeof client.init === 'function') {
            await client.init();
        }
        await startStdioServer(client, config.toolCategories);
    }
}
main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    // Use process.stderr.write directly — logger may not have been initialized yet
    // (e.g. if loadConfigFromEnv() threw before initLogger() was called)
    process.stderr.write(`Failed to start Omada MCP server: ${message}\n`);
    process.exitCode = 1;
});
