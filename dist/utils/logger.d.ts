type LogFields = Record<string, unknown>;
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
type LogFormat = 'plain' | 'json' | 'gcp-json';
/**
 * Initialize the logger with a specific log level and format.
 * This should be called once during application startup.
 * @param level - The minimum log level to output
 * @param format - The output format (plain, json, or gcp-json)
 * @param useStderr - If true, logs to stderr instead of stdout (required for stdio transport)
 */
export declare function initLogger(level: LogLevel, format?: LogFormat, useStderr?: boolean): void;
export declare const logger: {
    debug(message: string, meta?: LogFields): void;
    info(message: string, meta?: LogFields): void;
    warn(message: string, meta?: LogFields): void;
    error(message: string, meta?: LogFields): void;
};
export {};
