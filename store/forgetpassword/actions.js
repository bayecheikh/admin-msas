export default {
  async getToken({commit},payload){
    await commit('inittoken',payload)
  }
}