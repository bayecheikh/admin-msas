export default () => ({
    liststructures: [],
    validation: '',
    showzoneintervention: false, 
    showadressestructure: false, 
    // Données du formulaire complet
    formData: {
      nom_structure:'',
      donneur_receveur_mixte: '',
      numero_autorisation: '',
      accord_siege: '',
      numero_agrement: '',
      adresse_structure:'',
      debut_intervention: '',
      fin_intervention: '',
      telephone_structure:'',
      email_structure:'',
      source_financements: '',
      type_sources: '',
      departements: '',
      regions: '',
      dimensions: [],
      type_zone_interventions: '',
     

    },
    formDataCoordonneesSiege: {
      adresse_structure:'',
      telephone_structure:'',
      email_structure:'',
    },
    formDataDimensions: {
      dimensions: '',
    },
    formDataInfosGenerales: {
      nom_structure:'',
      donneur_receveur_mixte: '',
      source_financements: '',
      type_sources: '',
      departements: '',
      numero_autorisation: '',
      accord_siege: '',
      numero_agrement: '',
      debut_intervention: '',
      fin_intervention: '',
    },
    formDataPersonneResponsable: {
      firstname_responsable: '',
      lastname_responsable: '',
      email_responsable: '',
      telephone_responsable: '',
      fonction_responsable: ''
    },
    formDataZoneIntervention: {
      type_zone_interventions: '',
      regions:  [],
    },
    formStatus: {
      message: null,
      color: null,
    },
    selectliststructures: [],

    headerstructures : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'username',
        }, */
        /* { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }, */
        { text: 'Nom', value: 'nom_structure' },
        { text: 'Source de financement', value: 'source_financements'},
        { text: 'Type', value: 'type_sources'},
        { text: 'Téléphone', value: 'telephone_structure'},
        { text: 'E-mail', value: 'email_structure'},
        /* { text: 'Téléphone', value: 'telephone' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailstructure :{},
    //Intialise la pagination
    paginationStructure :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})