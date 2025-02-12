import React, { useEffect, useState } from 'react'
import Loader from '../form/Loader'
import ComicPanel from './ComicPanel'
import axios from 'axios'
import ErrorMessage from '../form/ErrorMessage'

type Superhero = {
    id: number
    name: string
    superpower: string
    humilityScore: number
}

const MAX_HUMILITY = 10

type Props = {
    refreshCount: number
}

export default function ListPanel({ refreshCount }: Props) {
    const [superheroes, setSuperheroes] = useState<Superhero[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSuperheroes = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(
                'http://localhost:8080/superheroes',
            )
            setSuperheroes(response.data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError('Error fetching superheroes: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSuperheroes()
    }, [refreshCount])

    return (
        <ComicPanel className="flex flex-col">
            <h2 className="text-3xl md:text-6xl pb-6 self-center w-full border-b-8 text-center mb-4">
                available superheroes report
            </h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : superheroes && superheroes.length > 0 ? (
                <ul>
                    {superheroes.map((superhero) => (
                        <li key={superhero.id} className="p-2 text-xl">
                            <p>
                                <span className="rainbow-text">
                                    {superhero.name}'s
                                </span>{' '}
                                superpower is {superhero.superpower} and their
                                humility is {superhero.humilityScore} out of{' '}
                                {MAX_HUMILITY}.
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No superheroes found. We desperately need a hero.</p>
            )}
        </ComicPanel>
    )
}
