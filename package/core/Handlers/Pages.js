export default class Pages {
    pageNumber;
    rowCount;
    rowsPerPage;
    triggerChange;
    pages;
    constructor(context) {
        this.pageNumber = context.pageNumber;
        this.rowCount = context.rowCount;
        this.rowsPerPage = context.rowsPerPage;
        this.triggerChange = context.triggerChange;
        this.pages = context.pages;
    }
    get() {
        return this.pages;
    }
    goTo(number) {
        this.pageNumber.update(store => {
            const $rowsPerPage = this.getRowsPerPage();
            if ($rowsPerPage) {
                const $rowsTotal = this.getTotalRowCount();
                if (number >= 1 && number <= Math.ceil($rowsTotal / $rowsPerPage)) {
                    store = number;
                    this.triggerChange.update(store => { return store + 1; });
                }
            }
            return store;
        });
    }
    previous() {
        const number = this.getPageNumber() - 1;
        this.goTo(number);
    }
    next() {
        const number = this.getPageNumber() + 1;
        this.goTo(number);
    }
    getPageNumber() {
        let value = 1;
        this.pageNumber.subscribe(store => value = store);
        return value;
    }
    getTotalRowCount() {
        let value = 0;
        this.rowCount.subscribe(store => value = store.total);
        return value;
    }
    getRowsPerPage() {
        let value = null;
        this.rowsPerPage.subscribe(store => value = store);
        return value;
    }
}
