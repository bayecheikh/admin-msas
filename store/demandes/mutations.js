export default {
    initlist(state, newlist) {
        state.listdemandes = newlist
    },
    initSelectList(state, newlist) {
        state.selectListUsagers = newlist
    },
    initheader(state, newlist) {
        state.headerdemandes = newlist
    },
    initdetail(state, newdemande) {
        state.detaildemande = newdemande
    },
    removeItem(state,payload) {
        state.listdemandes = state.listdemandes.filter(item => item.id != payload)
    }
}