export default () => ({
    liststructures: [],

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
        /* { text: 'Telephone', value: 'telephone' }, */
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