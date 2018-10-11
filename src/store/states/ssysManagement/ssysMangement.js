module.exports = {
    //编辑广告列表vuex数据共享
    editData: JSON.parse(localStorage.getItem('editData')),
    //添加分类vuex数据共享
    addClaData: JSON.parse(localStorage.getItem('addClaData')),
    //编辑内容数据共享
    editContentData: JSON.parse(localStorage.getItem('editContentData')),
}