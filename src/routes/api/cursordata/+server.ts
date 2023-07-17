import { json } from '@sveltejs/kit';
import data from "$data/data"

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const globalSearchData = url.searchParams.get("globalSearchData");
    const limit = parseInt(url.searchParams.get("limit"));
    const sortBy = url.searchParams.get("sortBy");
    const sortValue = url.searchParams.get("sortValue");
    const cursor = url.searchParams.get("cursor");
    const cursorDirection = url.searchParams.get("cursorDirection");

    let resultData = [...data];
    // let lengthData = 0;

    if (globalSearchData) {
        resultData = data.filter(e => e.first_name.toLocaleLowerCase().includes(globalSearchData.toLocaleLowerCase()) || e.last_name.toLocaleLowerCase().includes(globalSearchData.toLocaleLowerCase()) || e.email.toLocaleLowerCase().includes(globalSearchData.toLocaleLowerCase()))
        // lengthData = resultData.length
    }

    if (sortBy && sortValue) {
        try {
            if (sortValue == "asc") {
                resultData.sort((a, b) => {
                    if (typeof (b[sortBy]) === "boolean") {
                        return (a[sortBy]) ? -1 : 1
                    }
                    else if (!(b[sortBy])) return 1
                    else if (!(a[sortBy])) return -1
                    else {
                        return (a[sortBy]).localeCompare(b[sortBy])
                    }
                })
            } else if (sortValue == "desc") {
                resultData.sort((a, b) => {
                    if (typeof (b[sortBy]) === "boolean") {
                        return (a[sortBy]) ? 1 : -1
                    }
                    else if (!(a[sortBy])) return 1
                    else if (!(b[sortBy])) return -1
                    else {
                        return b[sortBy].localeCompare(a[sortBy])
                    }
                })
            }

        } catch (error) {
            if (sortValue == "asc") {
                resultData.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            } else if (sortValue == "desc") {
                resultData.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
            }
        }

    }

    const filteredData = (cursorDirection && cursor != 'null') ? resultData.filter(v => {
        if (cursorDirection == "before") {
            return v.id < parseInt(cursor)
        } else if (cursorDirection == "after") {
            return v.id > parseInt(cursor)
        }
    }).slice(0, limit + 1) : resultData.slice(0, limit + 1)

    const nextCursor = (filteredData.length > limit) ? filteredData[filteredData.length - 2].id : null
    const prevCursor = (cursorDirection && cursor != 'null') ? filteredData[0].id == 1 ? null : filteredData[0].id : null

    return json({
        type: "success",
        result: filteredData.slice(0, limit),
        meta: {
            nextCursor,
            prevCursor
        }
    })
}