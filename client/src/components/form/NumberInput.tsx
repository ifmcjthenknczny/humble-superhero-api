import React, { useState, ChangeEvent, PropsWithChildren } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type Props<T extends FieldValues> = {
    min: number
    max: number
    defaultValue: number
    onChange: (value: number) => void
    label: string
    fieldName: Path<T>
    register: UseFormRegister<T>
    errorMessage?: string
}

type ButtonProps = PropsWithChildren<{
    onClick: () => void
}>

function NumberButton({ children, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="border-3 text-2xl rounded-full w-8 h-8 flex justify-center items-center"
        >
            {children}
        </button>
    )
}

export default function NumberInput<T extends FieldValues>({
    min,
    max,
    defaultValue,
    onChange,
    label,
    fieldName,
    register,
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
        const newValue = parseInt(event.target.value, 10)
        const clampedValue = Math.max(min, Math.min(newValue, max))
        setValue(clampedValue)
        onChange(clampedValue)
    }

    return (
        <div className="flex items-center">
            <NumberButton onClick={handleDecrement}>-</NumberButton>
            <input
                className="border-3 bg-white h-8 p-2 rounded-lg text-sm focus:outline-none max-w-40"
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
    )
}
