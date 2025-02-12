export const findNextId = <T extends { id: number }>(
    superheroes: T[],
): number => {
    return superheroes.reduce((maxId, { id }) => Math.max(maxId, id), 0) + 1
}
