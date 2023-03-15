export default () => ({
    listdemandes: [],
    selectListDemandes: [],
    headerdemandes : [
        { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' },
        /* { text: 'Profil', value: 'profil' }, */
        { text: 'E-mail', value: 'email' },
        { text: 'Téléphone', value: 'telephone' },
        { text: 'Sujet', value: 'subject' },
        { text: 'Message', value: 'message' },
        { text: 'Statut', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detaildemande :{},
    paginationinvestissement :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})