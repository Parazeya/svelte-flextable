import type { Writable, Readable } from 'svelte/store';
import type { Params, Ajax } from '../DataHandler';
export default class Context {
    ajax: Ajax;
    ajaxRecordsTotal: Writable<number | null>;
    ajaxRecordsFiltered: Writable<number | null>;
    rowsPerPage: Writable<number | null>;
    pageNumber: Writable<number>;
    triggerChange: Writable<number>;
    triggerMainChange: Writable<number>;
    globalSearch: Writable<{
        value: string | null;
        scope: string[] | null;
    }>;
    rows: Readable<any[]>;
    rowCount: Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    pages: Readable<number[]>;
    pagesWithEllipsis: Readable<number[]>;
    pageCount: Readable<number>;
    sorted: Writable<{
        identifier: string | null;
        direction: 'asc' | 'desc' | null;
    }>;
    constructor(params: Params);
    renderData(): Promise<[Readable<any[]>]>;
    getURL(): any;
    private loadData;
    private createTriggerUpdate;
    private createRowCount;
    private createPages;
    private createPagesWithEllipsis;
    private createPageCount;
    private stringMatch;
}
