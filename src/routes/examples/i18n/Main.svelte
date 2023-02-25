<script lang="ts">
	import myData from "$data/data";
	import { DataHandler, Datatable, Th } from "$lib/core";

	import { onMount } from "svelte";

	let rows;

	const handler = new DataHandler({
		rowsPerPage: 20,
		ajax: {
			url: "/api/data",
			dataSrc: "result",
		},
		i18n: {
			search: "Rechercher...",
			show: "Afficher",
			entries: "lignes",
			filter: "Filtrer",
			rowCount: "Lignes {start} à {end} sur {total}",
			noRows: "Aucun résultat",
			previous: "Précédent",
			next: "Suivant",
		},
	});

	onMount(() => {
		handler.renderData().then(() => (rows = handler.getRows()));
	});
</script>

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				<Th {handler} orderBy="first_name">First Name</Th>
				<Th {handler} orderBy="last_name">Last Name</Th>
				<Th {handler} orderBy="email">Email</Th>
			</tr>
		</thead>
		<tbody>
			{#if rows}
				{#each $rows as row}
					<tr>
						<td>{row.first_name}</td>
						<td>{row.last_name}</td>
						<td>{row.email}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</Datatable>

<style>
	thead {
		background: #fff;
	}
	tbody td {
		padding: 4px;
	}
	tbody tr:nth-child(even) {
		background: #fafafa;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f5f5f5;
	}
</style>
