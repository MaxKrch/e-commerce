import type { FallbackProps } from "react-error-boundary";

const AppErrorBoundoryFallback = ({ resetErrorBoundary }: FallbackProps) => {
    return (
        <div>
            <p>Sorry, i'm fall...</p>
            <p onClick={resetErrorBoundary}>Retry again?</p>
        </div>
    )
}

export default AppErrorBoundoryFallback;