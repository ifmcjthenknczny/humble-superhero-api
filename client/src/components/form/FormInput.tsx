import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Props as InputWrapperProps } from './InputWrapper'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>
} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'defaultValue'
> &
    Pick<InputWrapperProps<T>, 'label' | 'fieldName'>

export default function FormInput<T extends FieldValues>({
    fieldName,
    label,
    register,
    type = 'text',
    ...inputProps
}: Props<T>) {
    return (
        <input
            className="border-3 bg-white h-8 p-2 rounded-lg text-sm focus:outline-none max-w-40"
            type={type}
            id={fieldName.toString()}
            {...register(fieldName, {
                required: `${label} is required`,
                valueAsNumber: ['number', 'range'].includes(type),
                ...(inputProps.min && {
                    min: {
                        value: inputProps.min,
                        message: `${label} must be at least ${inputProps.min}`,
                    },
                }),
                ...(inputProps.max && {
                    max: {
                        value: inputProps.max,
                        message: `${label} must be at most ${inputProps.max}`,
                    },
                }),
            })}
            {...inputProps}
        />
    )
}
