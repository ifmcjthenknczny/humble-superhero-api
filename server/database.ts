import { Superhero } from './types.js'

// A variable that acts as a database as long the server is running
export const superheroes: Superhero[] = [
    {
        id: 1,
        name: 'Superman',
        superpower: 'Everything but kryptonite',
        humilityScore: 8,
    },
    {
        id: 2,
        name: 'Batman',
        superpower: 'Looks and intelligence',
        humilityScore: 9,
    },
    {
        id: 3,
        name: 'Spiderman',
        superpower: 'Everything that a spider do',
        humilityScore: 6,
    },
    { id: 4, name: 'Iron Man', superpower: 'Money', humilityScore: 0 },
]
