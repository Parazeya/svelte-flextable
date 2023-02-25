export default class Rows {
    triggerChange;
    triggerMainChange;
    sorted;
    pageNumber;
    constructor(context) {
        this.triggerChange = context.triggerChange;
        this.triggerMainChange = context.triggerMainChange;
        this.sorted = context.sorted;
        this.pageNumber = context.pageNumber;
    }
    sort(orderBy) {
        if (!orderBy)
            return;
        const sorted = this.getSorted();
        const parsed = this.parse(orderBy);
        if (sorted.direction === null || sorted.direction === 'desc') {
            this.sorted.set({ identifier: parsed.identifier, direction: 'asc' });
            this.triggerChange.update(store => { return store + 1; });
            this.triggerMainChange.update(n => { return n + 1; });
        }
        else if (sorted.direction === 'asc') {
            this.sorted.set({ identifier: parsed.identifier, direction: sorted.identifier !== parsed.identifier ? 'asc' : "desc" });
            this.triggerChange.update(store => { return store + 1; });
            this.triggerMainChange.update(n => { return n + 1; });
        }
    }
    parse(orderBy) {
        if (typeof (orderBy) === 'string') {
            return {
                fn: (row) => row[orderBy],
                identifier: orderBy.toString()
            };
        }
        return {
            fn: orderBy,
            identifier: orderBy.toString()
        };
    }
    getSorted() {
        let $sorted = { identifier: null, direction: null };
        this.sorted.subscribe(store => $sorted = store);
        return $sorted;
    }
}
