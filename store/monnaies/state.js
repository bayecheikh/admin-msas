export default () => ({
    listmonnaies: [],

    headermonnaies : [
        {
            text: 'Monnaie',
            align: 'start',
            sortable: true,
            value: 'libelle',
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailmonnaie :{}
})