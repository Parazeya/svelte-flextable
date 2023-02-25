import { json } from '@sveltejs/kit';
import data from "$data/data"

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
        resultData = data.filter(e => e.first_name.toLocaleLowerCase().includes(globalSearchData) || e.last_name.toLocaleLowerCase().includes(globalSearchData) || e.email.toLocaleLowerCase().includes(globalSearchData))
        lengthData = resultData.length
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
                return resultData.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            } else if (sortValue == "desc") {
                return resultData.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
            }
        }

    }

    if (start && length) {
        resultData = resultData.slice(start - 1, length)
    }


    return json({
        type: "success",
        result: resultData,
        recordsTotal: data.length,
        recordsFiltered: globalSearchData ? lengthData : data.length
    })
}