import type { Collection } from 'types/collections';

const getInitialCollection = <K extends string | number, V = unknown>(): Collection<K, V> => {
  return {
    order: [] as K[],
    entities: {} as Record<K, V>,
  };
};
export default getInitialCollection;
