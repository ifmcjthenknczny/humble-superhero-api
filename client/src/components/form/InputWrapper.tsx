import React, { PropsWithChildren } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

export type Props<T extends FieldValues> = PropsWithChildren<{
    errorMessage?: string
    fieldName: Path<T>
    label: string
}>

export default function InputWrapper<T extends FieldValues>({
    children,
    errorMessage,
    fieldName,
    label,
}: Props<T>) {
    return (
        <div className="flex flex-row justify-between items-center">
            <label htmlFor={fieldName.toString()} className="text-xl">
                {label}:
            </label>
            {errorMessage ? <ErrorMessage message={errorMessage} /> : children}
        </div>
    )
}
