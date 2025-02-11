import fastify from 'fastify'
import { superheroes } from './database.js'
import { sortSuperheroes } from './helpers/sort.js'
import { validate, ValidationError } from './helpers/validate.js'
import { addSuperheroSchema } from './schema/schema.js'
import { Superhero } from './types.js'
import { findNextId } from './helpers/db.js'

const server = fastify()

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

server.get('/ping', async () => {
    return 'pong\n'
})

server.get('/superheroes', async (_, response) => {
    const sortedSuperheroes = sortSuperheroes(superheroes)
    response.send(sortedSuperheroes)
})

server.post('/superheroes', async (request, response) => {
    try {
        const body = request.body as Omit<Superhero, 'id'>
        const newHero = {
            id: findNextId(superheroes),
            ...validate(body, addSuperheroSchema),
        }
        superheroes.push(newHero)
        response.status(201).send(newHero)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error instanceof ValidationError) {
            response.status(400).send({ error: error.message })
            return
        }
        response.status(500).send({ error: 'Unknown error' })
    }
})

export default server
