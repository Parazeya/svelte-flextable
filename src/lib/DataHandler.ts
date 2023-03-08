/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Context from "$lib/core/Context";
import Rows from "$lib/core/Handlers/Rows";
import Pages from "$lib/core/Handlers/Pages";
import GlobalSearch from "$lib/core/Handlers/GlobalSearch";
import { utils, writeFile } from "xlsx";
import { saveAs } from "file-saver";

import type { Readable, Writable } from "svelte/store";
import type { Internationalization } from "$lib";

export type Ajax = { url: any; dataSrc?: string };
export type Params = { rowsPerPage?: number; i18n?: Internationalization; ajax?: Ajax };

export default class DataHandler {
	private context: Context;
	private rows: Rows;
	private pages: Pages;
	private globalSearch: GlobalSearch;
	public i18n: Internationalization;

	constructor(params: Params = { rowsPerPage: null, ajax: null }) {
		this.i18n = this.translate(params.i18n);
		this.context = new Context(params);
		this.rows = new Rows(this.context);
		this.pages = new Pages(this.context);
		this.globalSearch = new GlobalSearch(this.context);
	}

	public renderData() {
		return this.context.renderData();
	}

	public async getFullList() {
		return this.context.getFullDataToExport();
	}

	public async getCurrentList() {
		return this.context.getCurrentDataToExport();
	}

	public getLoader() {
		return this.context.isLoading;
	}

	public setURL(url: URL | string, trigger = true as boolean): void {
		this.context.ajax.url = url;
		if (trigger)
			this.context.triggerMainChange.update((n) => {
				return n + 1;
			});
	}

	public getRows(): Readable<any[]> {
		return this.context.rows;
	}

	public getRowCount(): Readable<{ total: number; start: number; end: number }> {
		return this.context.rowCount;
	}

	public getRowsPerPage(): Writable<number | null> {
		return this.context.rowsPerPage;
	}

	public sort(orderBy: Function | string): void {
		this.setPage(1, false);
		this.rows.sort(orderBy);
	}

	public getSorted(): Writable<{ identifier: string | null; direction: "asc" | "desc" | null }> {
		return this.context.sorted;
	}

	public search(value: string, scope: string[] = null): void {
		this.globalSearch.set(value, scope);
	}

	public clearSearch(): void {
		this.globalSearch.remove();
	}

	public getPages(params = { ellipsis: false }): Readable<number[]> {
		if (params.ellipsis) {
			return this.context.pagesWithEllipsis;
		}
		return this.context.pages;
	}

	public getPageCount(): Readable<number> {
		return this.context.pageCount;
	}

	public getPageNumber(): Readable<number> {
		return this.context.pageNumber;
	}

	public setPage(value: number | "previous" | "next", trigger = true): void {
		switch (value) {
			case "previous":
				this.pages.previous();
				if (trigger)
					this.context.triggerMainChange.update((n) => {
						return n + 1;
					});
				break;
			case "next":
				this.pages.next();
				if (trigger)
					this.context.triggerMainChange.update((n) => {
						return n + 1;
					});
				break;
			default:
				this.pages.goTo(value as number);
				if (trigger)
					this.context.triggerMainChange.update((n) => {
						return n + 1;
					});
				break;
		}
	}

	public getTriggerChange(): Writable<number> {
		return this.context.triggerChange;
	}

	public translate(i18n: Internationalization): Internationalization {
		return {
			...{
				search: "Search...",
				show: "Show",
				entries: "entries",
				rowCount: "Showing {start} to {end} of {total} entries",
				noRows: "No entries to found",
				previous: "Previous",
				next: "Next",
			},
			...i18n,
		};
	}

	public downloadCSVFile(name: string, header: string[][], data: any, compression = true as boolean) {
		const worksheet = utils.json_to_sheet(this.context.ajax.dataSrc ? data[this.context.ajax.dataSrc] : data.data);
		const workbook = utils.book_new();

		utils.book_append_sheet(workbook, worksheet, name);

		if (header !== null) {
			utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
		}

		writeFile(workbook, name + ".csv", { compression });
	}

	public downloadXLSXFile(name: string, header: string[][], data: any, compression = true as boolean) {
		const worksheet = utils.json_to_sheet(this.context.ajax.dataSrc ? data[this.context.ajax.dataSrc] : data.data);
		const workbook = utils.book_new();

		utils.book_append_sheet(workbook, worksheet, name);

		if (header !== null) {
			utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
		}

		writeFile(workbook, name + ".xlsx", { compression });
	}

	public downloadJSONFile(name: string, data: any, type = "text/plain;charset=utf-8") {
		const blob = new Blob([JSON.stringify(this.context.ajax.dataSrc ? data[this.context.ajax.dataSrc] : data.data)], { type });
		saveAs(blob, name + ".json");
	}
}
