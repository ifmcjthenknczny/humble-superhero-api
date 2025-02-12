import { useEffect, useState } from 'react'
import Loader from '../shared/Loader'
import ComicPanel from './ComicPanel'
import axios from 'axios'
import ErrorMessage from '../shared/ErrorMessage'
import { SERVER_URL } from '../../config'

const MAX_HUMILITY = 10

type Superhero = {
    id: number
    name: string
    superpower: string
    humilityScore: number
}

type Props = {
    refreshCount: number
}

type ListElementProps = {
    superhero: Superhero
}

type SuperheroListProps = {
    superheroes: Superhero[] | null
}

function ListElement({ superhero }: ListElementProps) {
    return (
        <li key={superhero.id} className="p-2 text-xl">
            <p>
                <span className="rainbow-text">{superhero.name}'s</span>{' '}
                superpower is {superhero.superpower} and their humility is{' '}
                {superhero.humilityScore} out of {MAX_HUMILITY}.
            </p>
        </li>
    )
}

function SuperheroList({ superheroes }: SuperheroListProps) {
    if (!superheroes?.length) {
        return <p>No superheroes found. We desperately need a hero.</p>
    }

    return (
        <ul>
            {superheroes.map((superhero) => (
                <ListElement superhero={superhero} />
            ))}
        </ul>
    )
}

export default function ListPanel({ refreshCount }: Props) {
    const [superheroes, setSuperheroes] = useState<Superhero[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSuperheroes = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${SERVER_URL}/superheroes`)
            setSuperheroes(response.data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError('Error fetching superheroes: ' + err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSuperheroes()
    }, [refreshCount])

    if (isLoading) {
        return <Loader />
    }

    return (
        <ComicPanel
            className="flex flex-col"
            header="Available superheroes"
            headerClassName="border-b-8"
        >
            <SuperheroList superheroes={superheroes} />
            {error && <ErrorMessage message={error} />}
        </ComicPanel>
    )
}
