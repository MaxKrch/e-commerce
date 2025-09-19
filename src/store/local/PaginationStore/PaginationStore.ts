import type { ILocalStore } from "hooks/useLocalStore";
import { makeObservable } from "mobx";

export default class PaginationStore implements ILocalStore {
    constructor() {
        makeObservable({

        })
    }

    destroy(): void {

    }
}