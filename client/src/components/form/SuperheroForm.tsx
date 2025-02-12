import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import FormInput from './FormInput'
import axios from 'axios'
import SubmitButton from './SubmitButton'
import Loader from './Loader'
import NumberInput from './NumberInput'

type FormData = {
    name: string
    superpower: string
    humilityScore: number
}

const CLEAR_ERRORS_MS = 2_500

export default function SuperheroForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
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
            await axios.post('http://localhost:8080/superheroes', data)
            reset()
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
        <div>
            <h2 className="text-3xl mb-6">Superhero Registration Form!!!</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-1"
            >
                <FormInput
                    errorMessage={errors.name?.message}
                    fieldName="name"
                    label="Superhero name"
                    register={register}
                />
                <FormInput
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
                    errorMessage={errors.humilityScore?.message}
                />

                <SubmitButton
                    errorMessage={submissionError}
                    isLoading={isSubmitting}
                />
            </form>
            {isSubmitting && <Loader />}
        </div>
    )
}
