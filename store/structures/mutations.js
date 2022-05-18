export default {
    initlist(state, newlist) {
        state.liststructures = newlist
    },
    initSelectList(state, newlist) {
        /* state.selectListStructures= Object.entries(newlist).map(([key, val]) => ({
            id:parseInt([key]),
            name:val
        })); */
        state.selectListStructures= newlist
        console.log('Structure state +++++++++++++++',state.selectListStructures)
    },
    initheader(state, newlist) {
        state.headerstructures = newlist
    },
    initdetail(state, newstructure) {
        state.detailstructure = newstructure
    }
}