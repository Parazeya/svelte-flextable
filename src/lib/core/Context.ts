/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { writable, derived, readable, get as getStoreData } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { Params, Ajax } from "../DataHandler";

type loadData = {
	start?: number;
	length?: number;
	globalSearchData?: string;
	sortBy?: string;
	sortValue?: string;
};

export default class Context {
	public isLoading: Writable<boolean>;
	public ajax: Ajax;
	public ajaxRecordsTotal: Writable<number | null>;
	public ajaxRecordsFiltered: Writable<number | null>;
	public rowsPerPage: Writable<number | null>;
	public pageNumber: Writable<number>;
	public triggerChange: Writable<number>;
	public triggerMainChange: Writable<number>;
	public globalSearch: Writable<{ value: string | null; scope: string[] | null }>;
	public rows: Readable<any[]>;
	public rowCount: Readable<{ total: number; start: number; end: number }>;
	public pages: Readable<number[]>;
	public pagesWithEllipsis: Readable<number[]>;
	public pageCount: Readable<number>;
	public sorted: Writable<{ identifier: string | null; direction: "asc" | "desc" | null }>;

	constructor(params: Params) {
		this.isLoading = writable(false);
		this.rowsPerPage = writable(params.rowsPerPage);
		this.pageNumber = writable(1);
		this.triggerChange = writable(0);
		this.triggerMainChange = writable(0);
		this.globalSearch = writable({ value: null, scope: null });
		this.ajax = params.ajax;
		this.ajaxRecordsFiltered = writable(0);
		this.ajaxRecordsTotal = writable(0);
		this.rows = readable([]);
		this.rowCount = this.createRowCount();
		this.pages = this.createPages();
		this.pagesWithEllipsis = this.createPagesWithEllipsis();
		this.pageCount = this.createPageCount();
		this.sorted = writable({ identifier: null, direction: null });
	}

	public renderData() {
		return Promise.all([(this.rows = this.createTriggerUpdate())]);
	}

	private async loadData(options?: loadData) {
		let query: any, result: any, url: any, querystring;

		try {
			querystring = Object.entries(options)
				.map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
				.join("&");
			this.ajax.url.includes("?") ? (url = this.ajax.url + "&" + querystring) : (url = this.ajax.url + "?" + querystring);

			query = await fetch(url);
			if (!query) throw new Error("Could not load data");
			result = await query.json();
		} catch (error) {
			console.log(error);
			result = [];
		}
		return result;
	}

	private createTriggerUpdate(): Readable<any[]> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return derived([this.triggerMainChange], ([$triggerMainChange], set) => {
			(async () => {
				this.isLoading.set(true);
				
				const $pageNumber = getStoreData(this.pageNumber);
				const $rowsPerPage = getStoreData(this.rowsPerPage);
				const $sorted = getStoreData(this.sorted);
				const $globalSearch = getStoreData(this.globalSearch);

				const options = {
					start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
					length: Math.min($pageNumber * $rowsPerPage),
				} as loadData;

				if ($sorted.identifier && $sorted.direction) {
					options.sortBy = $sorted.identifier;
					options.sortValue = $sorted.direction;
				}

				if ($globalSearch.value) options.globalSearchData = $globalSearch.value;

				const tableData = await this.loadData(options);

				this.ajaxRecordsFiltered.set(tableData.recordsFiltered);
				this.ajaxRecordsTotal.set(tableData.recordsTotal);

				set(this.ajax.dataSrc ? tableData[this.ajax.dataSrc] : tableData.data);
				this.isLoading.set(false);
			})();
			set([]);
		});
	}

	private createRowCount(): Readable<{ total: number; start: number; end: number }> {
		return derived([this.ajaxRecordsFiltered, this.pageNumber, this.rowsPerPage], ([$ajaxRecordsFiltered, $pageNumber, $rowsPerPage]) => {
			return {
				total: $ajaxRecordsFiltered,
				start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
				end: Math.min($pageNumber * $rowsPerPage, $ajaxRecordsFiltered),
			};
		});
	}

	private createPages(): Readable<number[]> {
		return derived([this.rowsPerPage, this.ajaxRecordsFiltered], ([$rowsPerPage, $ajaxRecordsFiltered]) => {
			if (!$rowsPerPage) {
				return [1];
			}
			const pages = Array.from(Array(Math.ceil($ajaxRecordsFiltered / $rowsPerPage)));
			return pages.map((row, i) => {
				return i + 1;
			});
		});
	}

	private createPagesWithEllipsis(): Readable<number[]> {
		return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
			if ($pages.length <= 7) {
				return $pages;
			}
			const ellipse = null;
			const firstPage = 1;
			const lastPage = $pages.length;
			if ($pageNumber <= 4) {
				return [...$pages.slice(0, 5), ellipse, lastPage];
			} else if ($pageNumber < $pages.length - 3) {
				return [firstPage, ellipse, ...$pages.slice($pageNumber - 2, $pageNumber + 1), ellipse, lastPage];
			} else {
				return [firstPage, ellipse, ...$pages.slice($pages.length - 5, $pages.length)];
			}
		});
	}

	private createPageCount(): Readable<number> {
		return derived([this.pages], ([$pages]) => {
			return $pages.length;
		});
	}

	private stringMatch(entry: string | Object, value: string) {
		if (typeof entry === "string" || !entry) {
			return (
				String(entry)
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.indexOf(
						value
							.toString()
							.toLowerCase()
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
					) > -1
			);
		} else if (typeof entry === "object") {
			return Object.keys(entry).some((k) => {
				return this.stringMatch(entry[k], value);
			});
		}
		return String(entry).indexOf(String(value)) > -1;
	}
}
