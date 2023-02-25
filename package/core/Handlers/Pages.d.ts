import type Context from '../Context';
import type { Writable, Readable } from 'svelte/store';
export default class Pages {
    pageNumber: Writable<number>;
    rowCount: Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    rowsPerPage: Writable<number | null>;
    triggerChange: Writable<number>;
    pages: Readable<any[]>;
    constructor(context: Context);
    get(): Readable<any[]>;
    goTo(number: number): void;
    previous(): void;
    next(): void;
    private getPageNumber;
    private getTotalRowCount;
    private getRowsPerPage;
}
