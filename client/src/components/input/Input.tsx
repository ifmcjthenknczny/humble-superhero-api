import { InputHTMLAttributes } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import InputWrapper, { Props as InputWrapperProps } from './InputWrapper'
import classnames from 'classnames'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>
    className?: string
    noWrapper?: true
} & Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'defaultValue' | 'value' | 'onChange'
> &
    Pick<InputWrapperProps<T>, 'errorMessage' | 'label' | 'fieldName'>

type RawInputProps<T extends FieldValues> = Omit<
    Props<T>,
    'noWrapper' | 'errorMessage'
>

function RawInput<T extends FieldValues>({
    fieldName,
    label,
    register,
    type = 'text',
    className,
    ...inputProps
}: RawInputProps<T>) {
    return (
        <input
            className={classnames(
                'border-3 bg-white h-8 p-2 rounded-lg text-sm focus:outline-none max-w-40',
                className,
            )}
            type={type}
            id={fieldName.toString()}
            {...register(fieldName, {
                required: `${label} is required`,
                valueAsNumber: ['range', 'number'].includes(type),
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

export default function Input<T extends FieldValues>({
    fieldName,
    label,
    errorMessage,
    noWrapper,
    ...rawInputProps
}: Props<T>) {
    if (noWrapper) {
        return (
            <RawInput fieldName={fieldName} label={label} {...rawInputProps} />
        )
    }

    return (
        <InputWrapper
            fieldName={fieldName}
            label={label}
            errorMessage={errorMessage}
        >
            <RawInput fieldName={fieldName} label={label} {...rawInputProps} />
        </InputWrapper>
    )
}
