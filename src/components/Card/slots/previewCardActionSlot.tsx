import Button from "components/Button"
import { useCallback } from "react"
import type { ProductResponseShort } from "types/product"

const previewCardActionSlot = (id: ProductResponseShort['documentId']) => {
    const handleClick = useCallback((_id: ProductResponseShort['documentId']) => {
    }, [])

    return (
        <Button onClick={() => handleClick(id)}>
            Add to Cart
        </Button>
    )
}

export default previewCardActionSlot