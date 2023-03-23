import state from "./state";

export default {
    async getSelectList({commit}){
        this.$msasApi.$get('selectstructures')
        .then(async (response) => { 
        console.log('Données reçu select list +++++++++++',response)
            //await commit('initlist', response.data)
            await commit('initSelectList', response.data)
            }).catch((error) => {
                console.log('Code error ++++++: ', error?.response?.data?.message)
            }).finally(() => {
            console.log('Requette envoyé ')
        });        
     },
    async getList({commit},payload){
       await commit('initlist', payload)        
    },
    async getDetail({commit},payload){
        await commit('initdetail', payload)
    },
    async deleteStructure({commit,dispatch,state},payload){
        await commit('removeItem',payload)     
    },
    async getTotalPage({commit},payload){
        await commit('inittotalpage', payload)
    },
    async getPerPage({commit},payload){
        await commit('initperpage', payload)
    },
    async getCurrentPage({commit},payload){
        await commit('initcurrentpage', payload)
    },
    async getDataSearch({commit},payload){
        await commit('initdatasearch', payload)
    },
    async submitForm({ commit, state }) {
        
        const formData = new FormData();

        for (const libelle in state.formDataInfosGenerales) {
            if (state.formDataInfosGenerales.hasOwnProperty(libelle) && libelle !== 'undefined') {
              const value = state.formDataInfosGenerales[libelle];
              formData.append(libelle, value);
            }
        }
        for (const libelle in state.formDataCoordonneesSiege) {
            if (state.formDataCoordonneesSiege.hasOwnProperty(libelle) && libelle !== 'undefined') {
              const value = state.formDataCoordonneesSiege[libelle];
              formData.append(libelle, value);
            }
        }
        for (const libelle in state.formDataZoneIntervention) {
            if (state.formDataZoneIntervention.hasOwnProperty(libelle) && libelle !== 'undefined') {
              const value = state.formDataZoneIntervention[libelle];
              formData.append(libelle, value);
            }
        }
        for (const libelle in state.formDataDimensions) {
            if (state.formDataDimensions.hasOwnProperty(libelle) && libelle !== 'undefined') {
              const value = state.formDataDimensions[libelle];
              formData.append(libelle, value);
            }
        }
        for (const libelle in state.formDataPersonneResponsable) {
            if (state.formDataPersonneResponsable.hasOwnProperty(libelle) && libelle !== 'undefined') {
              const value = state.formDataPersonneResponsable[libelle];
              formData.append(libelle, value);
            }
        }
       
        commit('setformdata', formData)
        
        commit('updateFormDataCoordonneesSiege', state.formDataCoordonneesSiege)
        commit('updateFormDataDimensions', state.formDataDimensions)
        commit('updateFormDataInfosGenerales', state.formDataInfosGenerales)
        commit('updateFormDataPersonneResponsable', state.formDataPersonneResponsable)
        commit('updateFormDataZoneIntervention', state.formDataZoneIntervention)
        console.log("COMMIT", commit)
        console.log("STATE", state)
        console.log("FormData +++++++++++++++++++++++++", formData)
        
      },
}