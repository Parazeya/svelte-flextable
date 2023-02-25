import type { Readable, Writable } from 'svelte/store';
import type { Internationalization } from '$lib';
export type Ajax = {
    url: any;
    dataSrc?: string;
};
export type Params = {
    rowsPerPage?: number;
    i18n?: Internationalization;
    ajax?: Ajax;
};
export default class DataHandler {
    private context;
    private rows;
    private pages;
    private globalSearch;
    i18n: Internationalization;
    constructor(params?: Params);
    renderData(): Promise<[Readable<any[]>]>;
    setUrl(url: URL | string, trigger?: boolean): void;
    getRows(): Readable<any[]>;
    getRowCount(): Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    getRowsPerPage(): Writable<number | null>;
    sort(orderBy: Function | string): void;
    getSorted(): Writable<{
        identifier: string | null;
        direction: 'asc' | 'desc' | null;
    }>;
    search(value: string, scope?: string[]): void;
    clearSearch(): void;
    getPages(params?: {
        ellipsis: boolean;
    }): Readable<number[]>;
    getPageCount(): Readable<number>;
    getPageNumber(): Readable<number>;
    setPage(value: number | 'previous' | 'next', trigger?: boolean): void;
    getTriggerChange(): Writable<number>;
    translate(i18n: Internationalization): Internationalization;
}
