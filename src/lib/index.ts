// Reexport your entry components here
import DataHandler from "./DataHandler.js";
import Datatable from "./Datatable.svelte";
import Th from "./Th.svelte";
import Pagination from "./Pagination.svelte";
import RowCount from "./RowCount.svelte";
import RowsPerPage from "./RowsPerPage.svelte";
import Search from "./Search.svelte";
import ExportButtons from "./ExportButtons.svelte";

export { DataHandler, Datatable, Th, Pagination, RowCount, RowsPerPage, Search, ExportButtons };

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
