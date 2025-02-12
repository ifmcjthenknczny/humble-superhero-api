import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import InputWrapper, { Props as InputWrapperProps } from './InputWrapper'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>
} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'defaultValue'
> &
    Pick<InputWrapperProps<T>, 'errorMessage' | 'label' | 'fieldName'>

export default function FormInput<T extends FieldValues>({
    fieldName,
    label,
    register,
    errorMessage,
    ...inputProps
}: Props<T>) {
    return (
        <InputWrapper
            fieldName={fieldName}
            label={label}
            errorMessage={errorMessage}
        >
            <input
                className="border-3 bg-white h-8 p-2 rounded-lg text-sm focus:outline-none max-w-40"
                type="text"
                id={fieldName.toString()}
                {...register(fieldName, {
                    required: `${label} is required`,
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
        </InputWrapper>
    )
}
