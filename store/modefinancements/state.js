export default () => ({
    listmodefinancements: [],

    headermodefinancements : [
        {
            text: 'Modes de financement',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
     
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailmodefinancement :{}
})