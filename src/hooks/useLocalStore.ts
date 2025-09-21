import React from 'react';

export type ILocalStore = {
  destroy(): void;
};

const useLocalStore = <T extends ILocalStore & { _destroyed?: boolean }>(creator: () => T) => {
  const container = React.useRef<T | null>(null);

  if (!container.current || container.current._destroyed) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => {
      if (container.current) {
        container.current._destroyed = true;
        container.current.destroy();
      }
    };
  }, []);

  return container.current;
};

export default useLocalStore;
