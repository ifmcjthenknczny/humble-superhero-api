import fastify from 'fastify'
import { pingRoutes } from './routes/ping'
import { superheroesRoutes } from './routes/superheroes'
import cors from '@fastify/cors'

const server = fastify()

server.register(pingRoutes)
server.register(superheroesRoutes)

// Expand the origin array when project is deployed
server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
