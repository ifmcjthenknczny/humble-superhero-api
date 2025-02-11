import { Superhero } from '../types.js'

export const sortSuperheroes = (superheroes: Superhero[]): Superhero[] => {
    return superheroes.toSorted((a, b) =>
        a.humilityScore === b.humilityScore
            ? a.name.localeCompare(b.name)
            : b.humilityScore - a.humilityScore,
    )
}
