import { PropsWithChildren } from 'react'
import classnames from 'classnames'

type Props = PropsWithChildren<{ className?: string; centered?: true }>

export default function ComicPanel({ centered, children, className }: Props) {
    return (
        <div
            className={classnames(
                'w-full border-9 rounded-3xl p-6 bg-[#f8f5ef]',
                centered && 'flex justify-center items-center',
                className,
            )}
        >
            {children}
        </div>
    )
}
