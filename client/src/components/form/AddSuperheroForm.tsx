import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextInput from '../input/TextInput'
import axios from 'axios'
import SubmitButton from './SubmitButton'
import Loader from '../shared/Loader'
import NumberInput from '../input/NumberInput'
import { SERVER_URL } from '../../config'

type FormData = {
    name: string
    superpower: string
    humilityScore: number
}

export type Props = {
    onSubmit: () => void
}

const CLEAR_ERRORS_MS = 2_500

export default function AddSuperheroForm({
    onSubmit: incrementRefreshCount,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        setValue,
    } = useForm<FormData>()

    const [submissionError, setSubmissionError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const clearSubmissionError = () => {
        if (submissionError) {
            setSubmissionError(undefined)
        }
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true)
        setSubmissionError(undefined)

        try {
            await axios.post(`${SERVER_URL}/superheroes`, data)
            reset()
            incrementRefreshCount()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error creating superhero:', error)
            if (axios.isAxiosError(error)) {
                setSubmissionError(
                    error.response?.data?.message || error.message,
                )
            } else {
                setSubmissionError(error.message)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            clearErrors()
            clearSubmissionError()
        }, CLEAR_ERRORS_MS)

        return () => clearTimeout(timer)
    }, [errors, clearErrors, submissionError])

    return (
        <div className="w-full h-full flex flex-col justify-evenly items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-1 w-full md:w-2/3"
            >
                <TextInput
                    errorMessage={errors.name?.message}
                    fieldName="name"
                    label="Superhero name"
                    register={register}
                />
                <TextInput
                    errorMessage={errors.superpower?.message}
                    fieldName="superpower"
                    label="Superpower"
                    register={register}
                />
                <NumberInput
                    min={0}
                    max={10}
                    defaultValue={5}
                    label="Humility"
                    fieldName="humilityScore"
                    register={register}
                    onChange={(value) => setValue('humilityScore', value)}
                    errorMessage={errors.humilityScore?.message}
                />

                <SubmitButton
                    errorMessage={submissionError}
                    isSubmitting={isSubmitting}
                />
            </form>
            {isSubmitting && <Loader />}
        </div>
    )
}
