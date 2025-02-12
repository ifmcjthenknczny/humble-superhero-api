import React from 'react'
import ErrorMessage from './ErrorMessage'

type Props = {
    errorMessage?: string
    isLoading: boolean
}

export default function SubmitButton({ errorMessage }: Props) {
    if (errorMessage) {
        return (
            <ErrorMessage
                message={errorMessage}
                className="self-center mt-6 py-5.25 px-4 text-2xl"
            />
        )
    }
    return (
        <button
            type="submit"
            className="text-2xl mt-6 border-3 w-fit py-0.5 px-4 bg-[#fec108] rounded-lg cursor-pointer hover:text-red-500 transition-colors self-center"
        >
            Submit!!!
        </button>
    )
}
