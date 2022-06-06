export default () => ({
    listmodefinancements: [],

    headermodefinancements : [
        {
            text: 'Libelle',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        { text: 'Description', value: 'montant' },
        /* { text: 'Status', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailmodefinancement :{}
})