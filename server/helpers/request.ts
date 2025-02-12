import { FastifyReply, FastifyRequest } from 'fastify'
import { ValidationError } from '../helpers/validate'

export const apiWrapper = (
    fn: (request: FastifyRequest, response: FastifyReply) => Promise<void>,
) => {
    return async (request: FastifyRequest, response: FastifyReply) => {
        try {
            await fn(request, response)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error instanceof ValidationError) {
                response.status(400).send({ message: error.message })
                return
            }
            response
                .status(500)
                .send({ message: error.message ?? 'Unknown error' })
        }
    }
}
