export { default as DataHandler } from "../DataHandler";
export { default as Datatable } from "../Datatable.svelte";
export { default as Pagination } from "../Pagination.svelte";
export { default as RowCount } from "../RowCount.svelte";
export { default as RowsPerPage } from "../RowsPerPage.svelte";
export { default as Search } from "../Search.svelte";
export { default as Th } from "../Th.svelte";
export { default as ExportButtons } from "../ExportButtons.svelte";

export type Internationalization = {
	search?: string;
	show?: string;
	entries?: string;
	filter?: string;
	rowCount?: string;
	noRows?: string;
	previous?: string;
	next?: string;
};
