export default () => ({
    listusagers: [],
    selectListUsagers: [],

    headerusagers : [
        {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'username',
        },
        { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' },
        { text: 'E-mail', value: 'email' },
        { text: 'Telephone', value: 'telephone' },
/*         { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false }
    ],
    detailusager :{},
    totalPage :1,
    perPage :15,
    dataSearch :null
})