import { PropsWithChildren } from 'react'
import classnames from 'classnames'

type Props = PropsWithChildren<{
    className?: string
    centered?: true
    header?: string
    headerClassName?: string
}>

type PanelHeaderProps = PropsWithChildren<{ className?: string }>

function PanelHeader({ children, className }: PanelHeaderProps) {
    return (
        <h2
            className={classnames(
                'text-3xl md:text-6xl pb-6 self-center w-full text-center mb-4',
                className,
            )}
        >
            {children}
        </h2>
    )
}

export default function ComicPanel({
    centered,
    children,
    className,
    header,
    headerClassName,
}: Props) {
    return (
        <div
            className={classnames(
                'w-full border-9 rounded-3xl p-6 bg-comic-book',
                centered && 'flex flex-col justify-center items-center',
                className,
            )}
        >
            {header && (
                <PanelHeader className={headerClassName}>{header}</PanelHeader>
            )}
            {children}
        </div>
    )
}
