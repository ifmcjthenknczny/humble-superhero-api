import classnames from 'classnames'

type Props = { className?: string; message: string }

export default function ErrorMessage({ className, message }: Props) {
    return (
        <div
            className={classnames(
                'h-8 text-right flex items-center',
                className,
            )}
        >
            <p className="text-red-500">{message}</p>
        </div>
    )
}
