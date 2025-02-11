import { z, ZodSchema } from 'zod'
import { Superhero } from '../types.js'

export const addSuperheroSchema: ZodSchema<Omit<Superhero, 'id'>> = z.object({
    name: z
        .string()
        .max(256, { message: 'Name must be 256 characters or less' }),
    superpower: z
        .string()
        .max(256, { message: 'Superpower must be 256 characters or less' }),
    humilityScore: z
        .number()
        .int({ message: 'Humility score must be an integer' })
        .min(0, { message: 'Humility score must be at least 0' })
        .max(10, { message: 'Humility score must be at most 10' }),
})
