/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Context from './core/Context';
import Rows from './core/Handlers/Rows';
import Pages from './core/Handlers/Pages';
import GlobalSearch from './core/Handlers/GlobalSearch';
export default class DataHandler {
    context;
    rows;
    pages;
    globalSearch;
    i18n;
    constructor(params = { rowsPerPage: null, ajax: null }) {
        this.i18n = this.translate(params.i18n);
        this.context = new Context(params);
        this.rows = new Rows(this.context);
        this.pages = new Pages(this.context);
        this.globalSearch = new GlobalSearch(this.context);
    }
    renderData() {
        return this.context.renderData();
    }
    setUrl(url, trigger = true) {
        this.context.ajax.url = url;
        if (trigger)
            this.context.triggerMainChange.update(n => { return n + 1; });
    }
    getRows() {
        return this.context.rows;
    }
    getRowCount() {
        return this.context.rowCount;
    }
    getRowsPerPage() {
        return this.context.rowsPerPage;
    }
    sort(orderBy) {
        this.setPage(1, false);
        this.rows.sort(orderBy);
    }
    getSorted() {
        return this.context.sorted;
    }
    search(value, scope = null) {
        this.globalSearch.set(value, scope);
    }
    clearSearch() {
        this.globalSearch.remove();
    }
    getPages(params = { ellipsis: false }) {
        if (params.ellipsis) {
            return this.context.pagesWithEllipsis;
        }
        return this.context.pages;
    }
    getPageCount() {
        return this.context.pageCount;
    }
    getPageNumber() {
        return this.context.pageNumber;
    }
    setPage(value, trigger = true) {
        switch (value) {
            case 'previous':
                this.pages.previous();
                if (trigger)
                    this.context.triggerMainChange.update(n => { return n + 1; });
                break;
            case 'next':
                this.pages.next();
                if (trigger)
                    this.context.triggerMainChange.update(n => { return n + 1; });
                break;
            default:
                this.pages.goTo(value);
                if (trigger)
                    this.context.triggerMainChange.update(n => { return n + 1; });
                break;
        }
    }
    getTriggerChange() {
        return this.context.triggerChange;
    }
    translate(i18n) {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries to found',
                previous: 'Previous',
                next: 'Next'
            }, ...i18n
        };
    }
}
