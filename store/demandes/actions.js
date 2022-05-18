export default {
    async getList({commit},payload){
        await commit('initlist', payload)
    },
    async getSelectList({commit},payload){
        await commit('initSelectList', payload)
    },
    async getDetail({commit},payload){
        await commit('initdetail', payload)
    },
    async deleteUsager({commit,dispatch,state},payload){
        await commit('removeItem',payload)    
    }
}