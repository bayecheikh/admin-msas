export default () => ({
    listdemandes: [],
    selectListDemandes: [],
    headerdemandes : [
      {
        text: 'Référence dossier',
        align: 'start',
        sortable: true,
        value: 'ref_dossier',
      },
      { text: 'Status', value: 'status' },
      { text: 'Date', value: 'date_of_deposit' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    detaildemande :{}
})