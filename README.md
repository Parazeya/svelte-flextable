<div align="center">
  <p align="center">
</p>
  <h1 align="center" style="font-size:32px;margin:0;border:none;">svelte-flextable</h1>
  <p style="color:#eee">A toolkit for creating server-side processing datatable components with Svelte</p>
  <p>
</p>
</div>

<br>

# About

Instead of rendering all your data, svelte-flextable renders only pages with filters (rows-per-page, search, pagination). Thanks to this, you reduce the load on your server.

# Install

```apache
npm i -D svelte-flextable
```

# In developing
- Cursor pagination support
- SQL Examples

# Sample code

## Client-side

```svelte
//+page.svelte
<script lang="ts">
    import { DataHandler } from "svelte-flextable";
    import { onMount } from "svelte";

    let rows;

    const handler = new DataHandler({
        rowsPerPage: 50,
        ajax: {
            url: "/api/data",
            dataSrc: "result",
        },
    });

    onMount(() => {
        handler.renderData().then(() => (rows = handler.getRows()));
    });
</script>


<table>
    <thead>
        <tr>
            <th>First name</th>
            <th>Last name</th>
        </tr>
    </thead>
    <tbody>
    {#if $rows}
        {#each $rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
            </tr>
        {/each}
    {/if}
    </tbody>
</table>
```

# Server-side

```javascript
//+server.js|ts

import { json } from "@sveltejs/kit";
const data = [
    { id: 1, first_name: "Tobie", last_name: "Vint", email: "tvint0@fotki.com" },
    { id: 2, first_name: "Zacharias", last_name: "Cerman", email: "zcerman1@sciencedirect.com" },
    { id: 3, first_name: "Gérianna", last_name: "Bunn", email: "gbunn2@foxnews.com" },
    { id: 4, first_name: "Bee", last_name: "Saurin", email: "bsaurin3@live.com" },
    { id: 5, first_name: "Méyère", last_name: "Granulette", email: "mgranul4@yellowbook.com" },
    { id: 6, first_name: "Frederich", last_name: "Benley", email: "fbenley5@ameblo.jp" },
    { id: 7, first_name: "Becki", last_name: "Criag", email: "bcriag6@washingtonpost.com" },
    { id: 8, first_name: "Nichols", last_name: "Risom", email: "nrisom7@google.com.br" },
    { id: 9, first_name: "Ron", last_name: "Menendes", email: "rmenendes8@prnewswire.com" },
    { id: 10, first_name: "Thane", last_name: "Gammill", email: "tgammill9@com.com" },
];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const globalSearchData = url.searchParams.get("globalSearchData");
    const start = url.searchParams.get("start");
    const length = url.searchParams.get("length");
    const sortBy = url.searchParams.get("sortBy");
    const sortValue = url.searchParams.get("sortValue");

    let resultData = [...data];
    let lengthData = 0;

    if (globalSearchData) {
        resultData = data.filter((e) => e.first_name.toLocaleLowerCase().includes(globalSearchData) || e.last_name.toLocaleLowerCase().includes(globalSearchData) || e.email.toLocaleLowerCase().includes(globalSearchData));
        lengthData = resultData.length;
    }

    if (sortBy && sortValue) {
        try {
            if (sortValue == "asc") {
                resultData.sort((a, b) => {
                    if (typeof b[sortBy] === "boolean") {
                        return a[sortBy] ? -1 : 1;
                    } else if (!b[sortBy]) return 1;
                    else if (!a[sortBy]) return -1;
                    else {
                        return a[sortBy].localeCompare(b[sortBy]);
                    }
                });
            } else if (sortValue == "desc") {
                resultData.sort((a, b) => {
                    if (typeof b[sortBy] === "boolean") {
                        return a[sortBy] ? 1 : -1;
                    } else if (!a[sortBy]) return 1;
                    else if (!b[sortBy]) return -1;
                    else {
                        return b[sortBy].localeCompare(a[sortBy]);
                    }
                });
            }
        } catch (error) {
            if (sortValue == "asc") {
                return resultData.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
            } else if (sortValue == "desc") {
                return resultData.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]));
            }
        }
    }

    if (start && length) {
        resultData = resultData.slice(start - 1, length);
    }

    return json({
        type: "success",
        result: resultData, // dataSrc: "result"
        recordsTotal: data.length, // Total data length
        recordsFiltered: globalSearchData ? lengthData : data.length, //Filtered data length
    });
}
```

<br>

# i18n

```javascript
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
        rowCount: "Lignes {start} à {end} sur {total}",
        noRows: "Aucun résultat",
        previous: "Précédent",
        next: "Suivant",
    },
});
```

# DataHandler methods

```typescript
downloadCSVFile(name, headers, data): Promise<void>
downloadXLSXFile(name, headers, data): Promise<void>
downloadJSONFile(name, data): Promise<void>
```

```typescript
getFullList(): Promise<any[]>
getCurrentList(): Promise<any[]>
```

```typescript
renderData(): Promise<void>
```

```typescript
setURL( url: string, trigger: boolean): void
```

```typescript
getLoader(): Readable<boolean>
```

```typescript
getRows(): Readable<any[]>
```

```typescript
sort( orderBy: Function | string ): void
getSorted(): Writable<{ identifier?: string; direction?: 'asc' | 'desc'; }>
```

```typescript
search( value: string, scope?: string[] ): void
clearSearch(): void
```

```typescript
getRowsPerPage(): Writable<number | null>
```

```typescript
getRowCount(): Readable<{ total: number; start: number; end: number; }>
```

```typescript
getPages( param: { ellipsis: boolean } ): Readable<number[]>
getPageCount(): Readable<number>
getPageNumber(): Readable<number>
setPage( value: number | ‘previous’ | ‘next’ ): void
```

```typescript
getTriggerChange(): Writable<number>
```
