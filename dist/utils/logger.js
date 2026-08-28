import pino from 'pino';
const levelToSeverity = {
    trace: 'DEBUG',
    debug: 'DEBUG',
    info: 'INFO',
    warn: 'WARNING',
    error: 'ERROR',
    fatal: 'CRITICAL',
};
let instance;
function createLogger(level = 'info', format = 'plain', useStderr = false) {
    const baseConfig = {
        level,
        base: undefined,
        messageKey: 'message',
        timestamp: pino.stdTimeFunctions.isoTime,
    };
    // Configure formatters based on format
    if (format === 'gcp-json') {
        baseConfig.formatters = {
            level(label) {
                return { severity: levelToSeverity[label] ?? label.toUpperCase() };
            },
        };
    }
    else if (format === 'plain') {
        // For plain format, we still output JSON but could be enhanced with pino-pretty
        // For now, using JSON output with a note that pino-pretty can be added as optional dependency
        baseConfig.formatters = {
            level(label) {
                return { level: label.toUpperCase() };
            },
        };
    }
    // For 'json' format, use default pino JSON output (no special formatters)
    // When running in stdio mode, always log to stderr to avoid interfering with MCP protocol on stdout
    // Pass stderr as the destination stream (second parameter to pino constructor)
    return useStderr ? pino(baseConfig, process.stderr) : pino(baseConfig);
}
// Initialize with default, will be reconfigured by calling initLogger
// Read log level from environment for tests
const defaultLevel = process.env.MCP_SERVER_LOG_LEVEL ?? 'info';
instance = createLogger(defaultLevel);
/**
 * Initialize the logger with a specific log level and format.
 * This should be called once during application startup.
 * @param level - The minimum log level to output
 * @param format - The output format (plain, json, or gcp-json)
 * @param useStderr - If true, logs to stderr instead of stdout (required for stdio transport)
 */
export function initLogger(level, format = 'plain', useStderr = false) {
    instance = createLogger(level, format, useStderr);
}
function normalizeMeta(meta) {
    if (!meta) {
        return undefined;
    }
    const normalized = {};
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            normalized[key] = { message: value.message, stack: value.stack };
            continue;
        }
        normalized[key] = value;
    }
    return Object.keys(normalized).length > 0 ? normalized : undefined;
}
function write(level, message, meta) {
    const fields = normalizeMeta(meta);
    if (fields) {
        instance[level](fields, message);
    }
    else {
        instance[level](message);
    }
}
export const logger = {
    debug(message, meta) {
        write('debug', message, meta);
    },
    info(message, meta) {
        write('info', message, meta);
    },
    warn(message, meta) {
        write('warn', message, meta);
    },
    error(message, meta) {
        write('error', message, meta);
    },
};
//# sourceMappingURL=logger.js.map