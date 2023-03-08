import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Search {
    private globalSearch: Writable<{ value: string | null; scope: string[] | null }>
    private triggerMainChange;

    constructor(context: Context) {
        this.globalSearch = context.globalSearch
        this.triggerMainChange = context.triggerMainChange
    }

    public set(value: string, scope: string[] = null): void {
        this.globalSearch.update(store => {
            store = {
                value: value ?? '',
                scope: scope ?? null
            }
            return store
        })
        this.triggerMainChange.update(n => n + 1)
    }

    public remove(): void {
        this.globalSearch.set({ value: null, scope: null })
        this.triggerMainChange.update(n => n + 1)
    }
}