import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { type CallToolResult, type ServerNotification, type ServerRequest } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
export declare const customHeadersSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
export declare const deviceMacSchema: z.ZodString;
export declare const siteInputSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}>;
export declare const clientIdSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    clientId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    clientId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    clientId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}>;
export declare const deviceIdSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    deviceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deviceId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    deviceId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}>;
export declare const customRequestSchema: z.ZodObject<{
    method: z.ZodDefault<z.ZodString>;
    url: z.ZodString;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    data: z.ZodOptional<z.ZodUnknown>;
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    method: string;
    siteId?: string | undefined;
    params?: Record<string, unknown> | undefined;
    data?: unknown;
    customHeaders?: Record<string, string> | undefined;
}, {
    url: string;
    siteId?: string | undefined;
    params?: Record<string, unknown> | undefined;
    data?: unknown;
    method?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}>;
export declare const stackIdSchema: z.ZodObject<{
    siteId: z.ZodOptional<z.ZodString>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
} & {
    stackId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    stackId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}, {
    stackId: string;
    siteId?: string | undefined;
    customHeaders?: Record<string, string> | undefined;
}>;
export declare function toToolResult(value: unknown): CallToolResult;
export declare function safeSerialize(value: unknown): string;
export type ToolExtra = RequestHandlerExtra<ServerRequest, ServerNotification>;
export interface MutationSummary {
    action: string;
    target: string;
    siteId?: string;
    mode: 'apply' | 'dry-run';
    status: 'planned' | 'applied';
    summary: string;
    result?: unknown;
}
export declare function wrapToolHandler<Args extends z.ZodRawShape>(name: string, handler: (args: z.objectOutputType<Args, z.ZodTypeAny>, extra: ToolExtra) => Promise<CallToolResult>): (args: z.objectOutputType<Args, z.ZodTypeAny>, extra: ToolExtra) => Promise<CallToolResult>;
export declare function toMutationResult(summary: MutationSummary): CallToolResult;
export declare function wrapMutationToolHandler<Args extends z.ZodRawShape>(name: string, summary: (args: z.objectOutputType<Args, z.ZodTypeAny>, result: unknown, mode: 'apply' | 'dry-run') => MutationSummary, handler: (args: z.objectOutputType<Args, z.ZodTypeAny>, extra: ToolExtra) => Promise<unknown>): (args: z.objectOutputType<Args, z.ZodTypeAny>, extra: ToolExtra) => Promise<CallToolResult>;
declare function setupServerLogging(server: McpServer): void;
export declare function createServer(): McpServer;
export { setupServerLogging };
