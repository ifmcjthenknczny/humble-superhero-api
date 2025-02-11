import { ZodSchema } from 'zod'

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export const validate = <T>(data: Partial<T>, schema: ZodSchema<T>): T => {
    const validatedData = schema.safeParse(data)
    if ('error' in validatedData) {
        throw new ValidationError(
            validatedData.error?.errors[0].message || 'Invalid data provided',
        )
    }
    return validatedData.data
}
