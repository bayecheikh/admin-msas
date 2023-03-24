export default () => ({
    listinvestissements: [],

    headerinvestissements : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        /* { text: 'Région', value: 'region'}, */
        { text: 'Dimension', value: 'dimension'},
        { text: 'Structure', value: 'structure'},
        { text: 'Type de structure', value: 'source'},
        { text: 'Statut', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headerinvestissementavances : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        /* { text: 'Région', value: 'region'}, */
        { text: 'Dimension', value: 'dimension'},
        { text: 'Structure', value: 'structure'},
        { text: 'Type de structure', value: 'source'},
        { text: 'Dimension', value: 'dimension'},
        { text: 'Piliers', value: 'piliers'},
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