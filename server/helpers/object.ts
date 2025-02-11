// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends { [key: string]: any }, K extends keyof T>(
    obj: T,
    keysToOmit: K[],
): Omit<T, K> => {
    return Object.keys(obj).reduce(
        (newObj, key) => {
            if (keysToOmit.includes(key as K)) {
                return newObj
            }
            return { ...newObj, [key]: obj[key] }
        },
        {} as Omit<T, K>,
    )
}
