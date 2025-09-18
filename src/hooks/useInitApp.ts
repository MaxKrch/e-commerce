import useRootStore from "context/root-store/useRootStore";
import { useCallback, useEffect } from "react"

const useInitApp = () => {
    const rootStore = useRootStore();

    useEffect(() => {
        rootStore.categoriesStore.getCategories();
    }, [rootStore]);

    const reset = useCallback(() => {
        rootStore.categoriesStore.getCategories();
    }, [rootStore]);

    return {
        reset,
    };
}

export default useInitApp