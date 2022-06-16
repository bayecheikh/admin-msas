export default () => ({
    listligneinvestissements: [],

    headerligneinvestissements : [
        { text: 'Pilier', value: 'pilier[0].nom_pilier'},
        { text: 'Axe', value: 'axe[0].nom_axe'},
        { text: 'Montant Bien Service Prevus', value: 'montantBienServicePrevus'},
        { text: 'Montant Bien Service Mobilises', value: 'montantBienServiceMobilises'},
        { text: 'Montant Bien Service Executes', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prevus', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilises', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Executes', value: 'montantInvestissementExecutes'},
        /* { text: 'Actions', value: 'actions', sortable: false }, */
    ],
    headerligneinvestissementavances : [
        { text: 'Pilier', value: 'pilier[0].nom_pilier'},
        { text: 'Axe', value: 'axe[0].nom_axe'},
        { text: 'Montant Bien Service Prevus', value: 'montantBienServicePrevus'},
        { text: 'Montant Bien Service Mobilises', value: 'montantBienServiceMobilises'},
        { text: 'Montant Bien Service Executes', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prevus', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilises', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Executes', value: 'montantInvestissementExecutes'},
    ],
    detailligneinvestissement :{},
    //Intialise la pagination
    paginationligneinvestissement :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})