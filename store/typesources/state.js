export default () => ({
    listtypesources: [],

    headertypesources : [
        {
            text: 'Sous-types de structure',
            align: 'start',
            sortable: true,
            value: 'libelle_type_source',
        },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailtypesource :{}
})