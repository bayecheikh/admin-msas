export default () => ({
    listsources: [],
    selectListsources: [],

    headersources : [
        {
            text: 'Nom',
            align: 'start',
            sortable: true,
            value: 'libelle_source',
        },
        { text: 'Sous-types de structure', value: 'type_sources',sortable: false },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailsource :{}
})