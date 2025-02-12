import React, { useState, ChangeEvent, PropsWithChildren } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import InputWrapper, { Props as InputWrapperProps } from './InputWrapper'

type Props<T extends FieldValues> = {
    min: number
    max: number
    defaultValue: number
    register: UseFormRegister<T>
    onChange: (value: number) => void
} & Pick<InputWrapperProps<T>, 'errorMessage' | 'fieldName' | 'label'>

type ButtonProps = PropsWithChildren<{
    onClick: () => void
}>

function NumberButton({ children, onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="border-3 text-2xl rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:text-red-500 transition-colors"
        >
            {children}
        </button>
    )
}

export default function NumberInput<T extends FieldValues>({
    min,
    max,
    defaultValue,
    label,
    fieldName,
    register,
    errorMessage,
    onChange,
}: Props<T>) {
    const [value, setValue] = useState(defaultValue)

    const handleIncrement = () => {
        const newValue = Math.min(value + 1, max)
        setValue(newValue)
        onChange(newValue)
    }

    const handleDecrement = () => {
        const newValue = Math.max(value - 1, min)
        setValue(newValue)
        onChange(newValue)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newValue = parseInt(event.target.value, 10)
        const clampedValue = Math.max(min, Math.min(newValue, max))
        setValue(clampedValue)
        onChange(clampedValue)
    }

    return (
        <InputWrapper
            errorMessage={errorMessage}
            fieldName={fieldName}
            label={label}
        >
            <div className="flex items-center gap-0.5">
                <NumberButton onClick={handleDecrement}>-</NumberButton>
                <input
                    className="border-3 bg-white h-8 p-2 rounded-lg text-sm focus:outline-none w-16 text-center"
                    id={fieldName.toString()}
                    {...register(fieldName, {
                        required: `${label} is required`,
                        valueAsNumber: true,
                        min: {
                            value: min,
                            message: `${label} must be at least ${min}`,
                        },
                        max: {
                            value: max,
                            message: `${label} must be at most ${max}`,
                        },
                    })}
                    type="number"
                    value={value}
                    onChange={handleChange}
                />
                <NumberButton onClick={handleIncrement}>+</NumberButton>
            </div>
        </InputWrapper>
    )
}
