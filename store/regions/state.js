export default () => ({
    listregions: [],

    headerregions : [
        {
            text: 'Régions',
            align: 'start',
            sortable: true,
            value: 'nom_region',
        },
      
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailregion :{}
})