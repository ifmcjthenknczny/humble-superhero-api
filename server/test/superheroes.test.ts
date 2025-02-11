import fastify from 'fastify'
import { superheroesRoutes } from '../routes/superheroes'
import { DEFAULT_SUPERHEROES, superheroes } from '../database/database'
import { omit } from '../helpers/object'

const newHeroPayload = {
    name: 'Iron Man 2',
    superpower: 'Irony',
    humilityScore: '2',
}

const expectedSuperheroes = [
    {
        id: 2,
        name: 'Batman',
        superpower: 'Looks and intelligence',
        humilityScore: 9,
    },
    {
        id: 1,
        name: 'Superman',
        superpower: 'Everything but kryptonite',
        humilityScore: 8,
    },
    {
        id: 3,
        name: 'Spiderman',
        superpower: 'Everything that a spider do',
        humilityScore: 6,
    },
    { id: 4, name: 'Iron Man', superpower: 'Money', humilityScore: 0 },
]

describe('Superheroes API', () => {
    const app = fastify()
    app.register(superheroesRoutes)

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(() => {
        app.close()
    })

    beforeEach(() => {
        // Reset the superheroes array before each test
        superheroes.length = 0
        superheroes.push(...DEFAULT_SUPERHEROES)
    })

    test('GET /superheroes should return sorted superheroes', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/superheroes',
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toEqual(expectedSuperheroes)
    })

    test('POST /superheroes should add a new superhero', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/superheroes',
            payload: newHeroPayload,
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toEqual({
            id: 5,
            ...omit(newHeroPayload, ['humilityScore']),
            humilityScore: +newHeroPayload.humilityScore,
        })
        expect(superheroes).toHaveLength(expectedSuperheroes.length + 1)

        const getResponse = await app.inject({
            method: 'GET',
            url: '/superheroes',
        })

        expect(getResponse.statusCode).toBe(200)

        const expectedGetResponse = [...expectedSuperheroes]
        expectedGetResponse.splice(-1, 0, {
            id: 5,
            ...omit(newHeroPayload, ['humilityScore']),
            humilityScore: +newHeroPayload.humilityScore,
        })

        expect(getResponse.json()).toEqual(expectedGetResponse)
    })
})
