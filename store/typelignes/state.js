export default () => ({
    listtypelignes: [],

    headertypelignes : [
        {
            text: 'Libelle',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailtypeligne :{}
})