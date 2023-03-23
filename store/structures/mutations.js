export default {
    updateFormDataCoordonneesSiege(state, { field, value }) {
        state.formDataCoordonneesSiege[field] = value
    },
    updateFormDataDimensions(state, { field, value }) {
        state.formDataDimensions[field] = value
    },
    updateFormDataInfosGenerales(state, { field, value }) {
        state.formDataInfosGenerales[field] = value
    },
    updateFormDataPersonneResponsable(state, { field, value }) {
        state.formDataPersonneResponsable[field] = value
    },
    updateFormDataZoneIntervention(state, { field, value }) {
        state.formDataZoneIntervention[field] = value
    },
    initlist(state, newlist) {
        state.liststructures = newlist
    },
    initSelectList(state, newlist) {
        state.selectliststructures = newlist
    },
    initheader(state, newlist) {
        state.headerstructures = newlist
    },
    initdetail(state, newstructure) {
        state.detailstructure = newstructure
    },
    inittotalpage(state, newtotalpage) {
        state.totalPage = newtotalpage
    },
    initperpage(state, newtperpage) {
        state.perPage = newtperpage
    },
    initcurrentpage(state, newtperpage) {
        state.currentPage = newtperpage
    },
    initdatasearch(state, newdatasearch) {
        state.dataSearch = newdatasearch
    },
    removeItem(state,payload) {
        console.log('item to delete ++++++++ ',payload)
        state.liststructures = state.liststructures.filter(item => item.id != payload)
    },
    setShowZoneIntervention(state, value) {
        state.showzoneintervention = value
    },
    setShowAdresseStructure(state, value) {
        state.showadressestructure = value
    },
    setformdata(state, formData) {
        state.formData = formData;
    },
    setFormStatus(state, formStatus) {
    state.formStatus = formStatus;
    },
    setvalidation(state, payload) {
        state.validation = payload
    }
}