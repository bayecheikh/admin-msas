export default () => ({
    listpermissions: [],

    headerpermissions : [
        /* {
            text: 'Nom',
            align: 'start',
            sortable: true,
            value: 'name',
        }, */
        { text: 'Permissions', value: 'description' },
        /* { text: 'Statut', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailpermission :{}
})