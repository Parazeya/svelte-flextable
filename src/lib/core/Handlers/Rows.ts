import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Rows {
    private triggerChange: Writable<number>
    private triggerMainChange: Writable<number>
    private sorted: Writable<{ identifier: string | null; direction: 'asc' | 'desc' | null; }>

    constructor(context: Context) {
        this.triggerChange = context.triggerChange
        this.triggerMainChange = context.triggerMainChange
        this.sorted = context.sorted
    }

    public sort(orderBy: Function | string): void {
        if (!orderBy) return
        const sorted = this.getSorted()
        const parsed = this.parse(orderBy)

        if (sorted.direction === null || sorted.direction === 'desc') {
            this.sorted.set({ identifier: parsed.identifier, direction: 'asc' });
            this.triggerChange.update(store => { return store + 1; });
            this.triggerMainChange.update(n => { return n + 1 })
        } else if (sorted.direction === 'asc') {
            this.sorted.set({ identifier: parsed.identifier, direction: sorted.identifier !== parsed.identifier ? 'asc' : "desc" });
            this.triggerChange.update(store => { return store + 1; });
            this.triggerMainChange.update(n => { return n + 1 })
        }
    }

    private parse(orderBy: Function | string): { fn: Function, identifier: string } {
        if (typeof (orderBy) === 'string') {
            return {
                fn: (row: any) => row[orderBy],
                identifier: orderBy.toString()
            }
        }
        return {
            fn: orderBy,
            identifier: orderBy.toString()
        }
    }

    private getSorted() {
        let $sorted = { identifier: null, direction: null }
        this.sorted.subscribe(store => $sorted = store)
        return $sorted
    }
}