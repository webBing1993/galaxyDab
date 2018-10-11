module.exports = {
    geteData: (state, editData) => {
        state.editData = editData
        localStorage.setItem('editData', JSON.stringify(editData))
    },
    getAddclassifyData: (state, addClaData) => {
        state.addClaData = addClaData
        localStorage.setItem('addClaData', JSON.stringify(addClaData))
    },
    getEditConData: (state, editContentData) => {
        state.editContentData = editContentData
        localStorage.setItem('editContentData', JSON.stringify(editContentData))
    }

}