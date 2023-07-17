import type Context from '../Context'
import type { Writable, Readable } from 'svelte/store'
import { get as getStoreData } from 'svelte/store';

export default class Pages {
    public pageNumber: Writable<number>
    public rowCount: Readable<{ total: number; start: number; end: number; }>
    public rowsPerPage: Writable<number | null>
    public triggerChange: Writable<number>
    public pages: Readable<any[]>
    public paginationType: string;
    public triggeredPaginate: Writable<string>;

    constructor(context: Context) {
        this.paginationType = context.pagination.type
        if (this.paginationType === 'cursor') {
            this.triggeredPaginate = context.triggeredPaginate
        } else {
            this.pageNumber = context.pageNumber
            this.rowCount = context.rowCount
            this.pages = context.pages
        }
        this.rowsPerPage = context.rowsPerPage
        this.triggerChange = context.triggerChange

    }

    public get(): Readable<any[]> {
        return this.pages
    }

    public goTo(number: number): void {
        this.pageNumber.update(store => {
            const $rowsPerPage = this.getRowsPerPage()
            if ($rowsPerPage) {
                const $rowsTotal = this.getTotalRowCount()
                if (number >= 1 && number <= Math.ceil($rowsTotal / $rowsPerPage)) {
                    store = number
                    this.triggerChange.update(store => { return store + 1 })
                }
            }
            return store
        })
    }

    public previous(): void {
        if (this.paginationType === 'cursor') {
            this.triggeredPaginate.set("before")
            this.triggerChange.update(store => { return store + 1 })
        } else {
            const number = this.getPageNumber() - 1
            this.goTo(number)
        }
    }

    public next(): void {
        if (this.paginationType === 'cursor') {
            this.triggeredPaginate.set("after")
            this.triggerChange.update(store => { return store + 1 })
        } else {
            const number = this.getPageNumber() + 1
            this.goTo(number)
        }
    }

    private getPageNumber(): number {
        return getStoreData(this.pageNumber)
    }

    private getTotalRowCount(): number {
        return getStoreData(this.rowCount).total
    }

    private getRowsPerPage(): number | null {
        return getStoreData(this.rowsPerPage)
    }
}