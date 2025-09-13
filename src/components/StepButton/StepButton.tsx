import ArrowRightIcon from "components/icons/ArrowRightIcon"
import { memo, useCallback, type ButtonHTMLAttributes, type FC } from "react"

export type StepButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    direction: 'back' | 'go',
    steps?: number,
    priority?: 'primary' | 'secondary',
    children: React.ReactNode,
    className?: string,
}


const StepButton: FC<StepButtonProps> = ({
    steps = 1,
    priority = 'primary',
    direction,
    children,
    className,
    ...rest
}) => {

    const handleClick = useCallback(() => {

    }, [direction, steps])

    return (
        <button onClick={handleClick} {...rest}>
            <ArrowRightIcon />
            <p>
                {children}
            </p>
        </button>
    )
}

StepButton.displayName = 'StepButton'
export default memo(StepButton)