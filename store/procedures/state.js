export default () => ({
    listprocedures: [],
    selectListProcedures: [],

    headerprocedures : [
        {
            text: 'Code',
            align: 'start',
            sortable: true,
            value: 'code',
        },
        { text: 'Libellé', value: 'libelle' },
        { text: 'Description', value: 'description' },
        { text: 'Statut', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
    ],
    detailprocedure :{}
})