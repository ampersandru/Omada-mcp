/**
 * Configuration validation utilities
 * All environment variable validation logic should be centralized here
 */
/**
 * Validates IPv4 addresses
 * @param value - The string to validate
 * @returns true if valid IPv4 address, false otherwise
 */
export declare function isValidIpv4Address(value: string): boolean;
/**
 * Validates IPv6 addresses
 * @param value - The string to validate
 * @returns true if valid IPv6 address, false otherwise
 */
export declare function isValidIpv6Address(value: string): boolean;
/**
 * Validates IPv4 or IPv6 addresses
 * @param value - The string to validate
 * @returns true if valid IP address, false otherwise
 */
export declare function isValidIpAddress(value: string): boolean;
/**
 * Validates hostnames according to RFC standards
 * @param value - The string to validate
 * @returns true if valid hostname, false otherwise
 */
export declare function isValidHostname(value: string): boolean;
/**
 * Validates allowed origin values (hostname, IPv4, IPv6, or wildcard)
 * @param value - The string to validate
 * @returns true if valid origin, false otherwise
 */
export declare function isValidOrigin(value: string): boolean;
/**
 * Validates bind address (must be a valid IP address)
 * @param value - The string to validate
 * @returns true if valid bind address, false otherwise
 */
export declare function isValidBindAddress(value: string): boolean;
/**
 * Returns true when the bind address is loopback-only.
 * Used to keep the legacy HTTP transport confined to local lab/debug use.
 */
export declare function isLoopbackBindAddress(value: string): boolean;
/**
 * Validates an array of origin values
 * @param origins - Array of origin strings to validate
 * @returns Object with isValid flag and optional error message
 */
export declare function validateOrigins(origins: string[]): {
    isValid: boolean;
    error?: string;
};
/**
 * Validates bind address with detailed error message
 * @param bindAddr - The bind address to validate
 * @returns Object with isValid flag and optional error message
 */
export declare function validateBindAddress(bindAddr: string): {
    isValid: boolean;
    error?: string;
};
/**
 * Validates and resolves port number with fallback
 * @param value - The port number to validate
 * @param fallback - The fallback port number if validation fails
 * @returns The validated port or fallback
 */
export declare function resolvePort(value: number | undefined, fallback: number): number;
/**
 * Normalizes path by ensuring it starts with / and doesn't end with /
 * @param path - The path to normalize
 * @returns The normalized path
 */
export declare function normalizePath(path: string): string;
