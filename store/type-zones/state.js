export default () => ({
    listtypezones: [],

    headertypezones : [
        {
            text: 'Types de zone d\'intervention',
            align: 'start',
            sortable: true,
            value: 'libelle_zone',
        },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailtypezone :{}
})