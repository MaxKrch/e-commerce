import StepButton from "components/StepButton"
import { memo } from "react"

const StepBack = () => {
    return (
        <StepButton direction="back">
            Назад
        </StepButton>
    )
}

export default memo(StepBack)