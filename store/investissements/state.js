export default () => ({
    listinvestissements: [],

    headerinvestissements : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'username',
        }, */
        /* { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }, */
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Région', value: 'region'},
        { text: 'Structure', value: 'structure'},
        { text: 'Source de financement', value: 'source'},
        { text: 'Etat', value: 'state'},
        { text: 'Statut', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailinvestissement :{},
    //Intialise la pagination
    paginationinvestissement :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})