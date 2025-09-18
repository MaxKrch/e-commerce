import React, { useRef, type PropsWithChildren } from "react";
import type { IRootStore } from "store/RootStore/RootStore";
import RootStore from "store/RootStore/RootStore";

export const rootStoreContext = React.createContext<IRootStore | null>(null)

const RootStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const rootStore = useRef<IRootStore | null>(null)
    if (!rootStore.current) {
        rootStore.current = new RootStore;
    }
    return (
        <rootStoreContext.Provider value={rootStore.current}>
            {children}
        </rootStoreContext.Provider>
    )
}

export default RootStoreProvider