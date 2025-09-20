import type { Collection } from 'types/collections';

const getInitialCollection = (): Collection<any, any> => {
  return {
    order: [],
    entities: {},
  };
};
export default getInitialCollection;
