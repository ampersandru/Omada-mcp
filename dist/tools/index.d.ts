import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ToolCategory, ToolPermission } from '../config.js';
import type { OmadaClient } from '../omadaClient/index.js';
export declare function registerAllTools(server: McpServer, client: OmadaClient, activeCategories?: Map<ToolCategory, Set<ToolPermission>>): void;
