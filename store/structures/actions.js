export default {
    getList({commit}){
        this.$essApi.$get('/list-structures').then(async (response) => { 
            console.log('******Liste des structures*******: ',response?.structures)
              await commit('initSelectList', response?.structures)
              
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data.message)
            }).finally(() => {
              console.log('Requette envoyé ')
        });
    }
}