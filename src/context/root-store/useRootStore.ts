import { useContext } from "react";
import { rootStoreContext } from "./RootStore";

const useRootStore = () => {
    const store = useContext(rootStoreContext);
    if (!store) {
        throw new Error('Use outside context')
    }

    return store;
}

export default useRootStore;