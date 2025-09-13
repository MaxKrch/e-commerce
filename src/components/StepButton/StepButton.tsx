import clsx from "clsx"
import ArrowRightIcon from "components/icons/ArrowRightIcon"
import Text from "components/Text"
import style from './StepButton.module.scss'
import { memo, useCallback, type ButtonHTMLAttributes, type FC } from "react"
import { useNavigate } from "react-router-dom"

export type StepButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    direction: 'back' | 'go',
    children: React.ReactNode,
    className?: string,
}


const StepButton: FC<StepButtonProps> = ({
    direction,
    children,
    className,
    ...rest
}) => {
    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        direction === 'back'
            ? navigate(-1)
            : navigate(1)
    }, [direction])

    return (
        <button
            className={clsx(style['button'], className)}
            onClick={handleClick} {...rest}
        >
            <ArrowRightIcon className={clsx(direction === 'back' && style['back'])} />
            <Text
                view="p-20"
            >
                {children}
            </Text>
        </button>
    )
}

StepButton.displayName = 'StepButton'
export default memo(StepButton)