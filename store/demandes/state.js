export default () => ({
    listdemandes: [],
    selectListDemandes: [],
    headerdemandes : [
        { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' },
        { text: 'Profil', value: 'profil' },
        { text: 'Email', value: 'email' },
        { text: 'Telephone', value: 'telephone' },
        { text: 'Sujet', value: 'subject' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detaildemande :{}
})