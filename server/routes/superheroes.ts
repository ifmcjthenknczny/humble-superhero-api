import { findNextId } from './../helpers/db.js'
import { FastifyInstance } from 'fastify'
import { sortSuperheroes } from '../helpers/sort.js'
import { superheroes } from '../database/database.js'
import { validate } from '../helpers/validate.js'
import { addSuperheroSchema } from '../schema/schema.js'
import { Superhero } from '../types.js'
import { apiWrapper } from '../helpers/request.js'

export async function superheroesRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/superheroes',
        apiWrapper(async (_, response) => {
            const sortedSuperheroes = sortSuperheroes(superheroes)
            response.send(sortedSuperheroes)
        }),
    )

    fastify.post(
        '/superheroes',
        apiWrapper(async (request, response) => {
            const body = request.body as Omit<Superhero, 'id'>
            const newHero = {
                id: findNextId(superheroes),
                ...validate(body, addSuperheroSchema),
            }
            superheroes.push(newHero)
            response.status(201).send(newHero)
        }),
    )
}
