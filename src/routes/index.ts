import { FastifyPluginAsync } from 'fastify';

const healthCheck: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get('/health', async function (_request, _reply) {
    return { status: 'Active', healthStatus: 'Healthy' };
  });

};

export default healthCheck;