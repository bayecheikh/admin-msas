export default () => ({
    listligneinvestissements: [],

    headerligneinvestissements : [
        { text: 'Structure d\'enregistrement', value: 'structure'},
        { text: 'Année', value: 'annee'},
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Dimension', value: 'dimension'},
        { text: 'Pilier', value: 'pilier'},
        { text: 'Axe', value: 'axe'},
        { text: 'Structure Bailleur', value: 'structure_source'},
        { text: 'Type structure bailleur', value: 'type_structure_source'},
        { text: 'Région Bénéficiaire', value: 'region'},
        { text: 'Structure bénéficiaire', value: 'structure_beneficiaire'},
        { text: 'Montant Biens et Services Prévu', value: 'montantBienServicePrevus'},
        { text: 'Montant Biens et Services Mobilisé', value: 'montantBienServiceMobilises'},
        { text: 'Montant Biens et Services Exécuté', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prévu', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilisé', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Exécuté', value: 'montantInvestissementExecutes'},
        /* { text: 'Actions', value: 'actions', sortable: false }, */
    ],
    headerligneinvestissementavances : [
        { text: 'Structure d\'enregistrement', value: 'structure'},
        { text: 'Année', value: 'annee'},
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Dimension', value: 'dimension'},
        { text: 'Pilier', value: 'pilier'},
        { text: 'Axe', value: 'axe'},
        { text: 'Structure Bailleur', value: 'structure_source'},
        { text: 'Type structure bailleur', value: 'type_structure_source'},
        { text: 'Région Bénéficiaire', value: 'region'},
        { text: 'Structure bénéficiaire', value: 'structure_beneficiaire'},
        { text: 'Montant Biens et Services Prévu', value: 'montantBienServicePrevus'},
        { text: 'Montant Biens et Services Mobilisé', value: 'montantBienServiceMobilises'},
        { text: 'Montant Biens et Services Exécuté', value: 'montantBienServiceExecutes'},
        { text: 'Montant Investissement Prévu', value: 'montantInvestissementPrevus'},
        { text: 'Montant Investissement Mobilisé', value: 'montantInvestissementMobilises'},
        { text: 'Montant Investissement Exécuté', value: 'montantInvestissementExecutes'},
    ],
    detailligneinvestissement :{},
    //Intialise la pagination
    paginationligneinvestissement :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})