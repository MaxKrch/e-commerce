import type { Collection } from 'types/collections';

export const normalizeCollection = <K extends number | string, T>(
  elements: T[],
  getKeyForCollection: (element: T) => K
): Collection<K, T> => {
  const collection: Collection<K, T> = {
    order: [],
    entities: {} as Record<K, T>,
  };

  elements.forEach((item) => {
    const id = getKeyForCollection(item);
    collection.order.push(id);
    collection.entities[id] = item;
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(
  elements: Collection<K, T> | null | undefined
): T[] => {
  if (!elements?.order) {
    return [];
  }

  const linearized = elements.order
    .map((id) => elements.entities[id])
    .filter((item): item is T => item !== undefined);
  return linearized;
};
