import clsx from "clsx"
import StepButton from "components/StepButton"
import { memo } from "react"
import style from './StepBack.module.scss'

const StepBack = () => {
    return (
        <div className={clsx(style['stepback'])}>
            <StepButton direction="back" >
                Назад
            </StepButton>
        </div>

    )
}

export default memo(StepBack)