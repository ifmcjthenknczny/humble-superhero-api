import { InputHTMLAttributes } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Props as InputWrapperProps } from './InputWrapper'
import Input from './Input'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>
} & Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'min' | 'max' | 'defaultValue'
> &
    Pick<InputWrapperProps<T>, 'errorMessage' | 'label' | 'fieldName'>

export default function TextInput<T extends FieldValues>(inputProps: Props<T>) {
    return <Input {...inputProps} />
}
