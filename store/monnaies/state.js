export default () => ({
    listmonnaies: [],

    headermonnaies : [
        {
            text: 'Monnaies',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailmonnaie :{}
})