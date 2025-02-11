import { FastifyInstance } from 'fastify'

export async function pingRoutes(fastify: FastifyInstance) {
    fastify.get('/ping', async () => {
        return 'pong\n'
    })
}
