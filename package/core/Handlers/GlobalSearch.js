export default class Search {
    globalSearch;
    triggerMainChange;
    constructor(context) {
        this.globalSearch = context.globalSearch;
        this.triggerMainChange = context.triggerMainChange;
    }
    set(value, scope = null) {
        this.globalSearch.update(store => {
            store = {
                value: value ?? '',
                scope: scope ?? null
            };
            return store;
        });
        this.triggerMainChange.update(n => n + 1);
    }
    remove() {
        this.globalSearch.set({ value: null, scope: null });
        this.triggerMainChange.update(n => n + 1);
    }
}
