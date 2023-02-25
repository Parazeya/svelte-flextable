export default [
    {
        name: 'home',
        path: '/home',
    },
    {
        name: 'datatables',
        path: '/examples',
        pages: [
            { name: 'basic', path: '/basic' },
            { name: 'sticky', path: '/sticky' },
            { name: 'small', path: '/small' },
            { name: 'i18n', path: '/i18n' },
            { name: 'blocks', path: '/blocks' },
        ],
    },
    {
        name: 'api',
        path: '/api',
        anchors: [
            { name: 'get rows', slug: '#get-rows' },
            { name: 'sort', slug: '#sort' },
            { name: 'search', slug: '#search' },
            { name: 'rows per page', slug: '#rows-per-page' },
            { name: 'row count', slug: '#row-count' },
            { name: 'pagination', slug: '#pagination' },
            { name: 'trigger change', slug: '#trigger-change' },
        ],
    }
]