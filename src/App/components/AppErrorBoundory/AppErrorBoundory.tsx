import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import AppErrorBoundoryFallback from './AppErrorBoundoryFallBack';

const AppErrorBoundory = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary FallbackComponent={AppErrorBoundoryFallback}>{children}</ErrorBoundary>;
};

export default AppErrorBoundory;
