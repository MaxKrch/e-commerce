import type { Collection } from "types/collections";
import getInitialCollection from "./get-initial-collection";

export const normalizeCollection = <K extends number | string, T>(
    elements: T[], getKeyForCollection: (element: T) => K
): Collection<K, T> => {
    const collection = getInitialCollection()

    elements.forEach(item => {
        const id = getKeyForCollection(item);
        collection.order.push(id);
        collection.entities[id] = item;
    })

    return collection;
}

export const linearizeCollection = <K extends string | number, T>(
    elements: Collection<K, T>
): T[] => {
    const linearized = elements.order.map((id) => elements.entities[id]);
    return linearized;
}