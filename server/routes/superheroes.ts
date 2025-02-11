import { findNextId } from './../helpers/db'
import { FastifyInstance } from 'fastify'
import { sortSuperheroes } from '../helpers/sort'
import { superheroes } from '../database/database'
import { validate } from '../helpers/validate'
import { addSuperheroSchema } from '../schema/schema'
import { Superhero } from '../types'
import { apiWrapper } from '../helpers/request'

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
