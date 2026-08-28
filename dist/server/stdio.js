import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAllTools } from '../tools/index.js';
import { logger } from '../utils/logger.js';
import { createServer } from './common.js';
export async function startStdioServer(client, activeCategories) {
    logger.info('Starting stdio server');
    const server = createServer();
    registerAllTools(server, client, activeCategories);
    const transport = new StdioServerTransport();
    logger.info('Connecting stdio server');
    await server.connect(transport);
    logger.info('Stdio server connected');
}
//# sourceMappingURL=stdio.js.map