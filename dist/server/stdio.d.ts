import type { ToolCategory, ToolPermission } from '../config.js';
import type { OmadaClient } from '../omadaClient/index.js';
export declare function startStdioServer(client: OmadaClient, activeCategories?: Map<ToolCategory, Set<ToolPermission>>): Promise<void>;
