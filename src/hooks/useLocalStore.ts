import React from "react";

export interface ILocalStore {
    destroy(): void
}

const useLocalStore = <T extends ILocalStore>(creator: () => T) => {
    const container = React.useRef<T | null>(null)

    if (!container.current) {
        container.current = creator()
    }

    React.useEffect(() => {
        return () => {
            container.current?.destroy()
        }
    }, [])

    return container.current

}

export default useLocalStore;