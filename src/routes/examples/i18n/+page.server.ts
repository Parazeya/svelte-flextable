import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/examples'
    const lib = './src/lib'
    const page = 'i18n'
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        serverSide: fs.readFileSync(`./src/routes/api/data/+server.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Th.svelte',
                        code: fs.readFileSync(`${lib}/Th.svelte`).toString('utf-8'),
                    },
                    {
                        name: 'Datatable.svelte',
                        code: fs.readFileSync(`${lib}/Datatable.svelte`).toString('utf-8'),
                        components: [
                            {
                                name: 'Search.svelte',
                                code: fs.readFileSync(`${lib}/Search.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'RowsPerPage.svelte',
                                code: fs.readFileSync(`${lib}/RowsPerPage.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'RowCount.svelte',
                                code: fs.readFileSync(`${lib}/RowCount.svelte`).toString('utf-8'),
                            },
                            {
                                name: 'Pagination.svelte',
                                code: fs.readFileSync(`${lib}/Pagination.svelte`).toString('utf-8'),
                            }
                        ]
                    },
                ]
            },

        ]
    }
}