export default () => ({
    listpiliers: [],

    headerpiliers : [
        {
            text: 'Piliers',
            align: 'start',
            sortable: true,
            value: 'nom_pilier',
        },
        { text: 'Axes', value: 'axes',sortable: false },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailpilier :{}
})