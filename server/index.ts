import fastify from 'fastify'
import { pingRoutes } from './routes/ping.js'
import { superheroesRoutes } from './routes/superheroes.js'

const server = fastify()

server.register(pingRoutes)
server.register(superheroesRoutes)

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
