import Button from "components/Button"

const defaultActionSlot = (action: () => void) => {
    return (
        <Button onClick={action}>
            {"Мне повезет!"}
        </Button>
    )
}

export default defaultActionSlot;