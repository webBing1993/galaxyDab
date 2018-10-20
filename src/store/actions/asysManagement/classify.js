module.exports = {
  // 获取分类列表
  claList (ctx, params) {
    ctx.dispatch('request', {
      url: `/discoveryCatalog/page`,
      body: {
        name: params.name
      },
      method: 'post',
      headers: {
        currentPage: params.page,
        pageSize: params.pageSize
      },

      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //删除分类
  deleteCla (ctx, params) {
    ctx.dispatch('request', {
      url: `discoveryCatalog/delete?id=${params.id}`,
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //添加分类
  addCla (ctx, params) {
    ctx.dispatch('request', {
      url: `discoveryCatalog/save`,
      body: {
        name: params.name,
        sort: params.sort
      },
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //编辑分类
  editCla (ctx, params) {
    ctx.dispatch('request', {
      url: `discoveryCatalog/update`,
      body: {
        id: params.id,
        name: params.name,
        sort: params.sort
      },
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //内容列表
  getContent (ctx, params) {
    ctx.dispatch('request', {
      url: `/discoveryContent/page`,
      body: {
        name: params.name,
        categoryId:params.catalogId
      },
      method: 'post',
      headers: {
        currentPage: params.page,
        pageSize: params.pageSize
      },

      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //编辑内容列表
  editCon (ctx, params) {
    ctx.dispatch('request', {
      url: `/discoveryContent/update`,
      body: {
        id: params.id,
        categoryId:params.catalogId,
        name:params.name,
        pictures:params.picture,
        phone:params.phone,
        address:params.address,
        description:params.description,
        sort:params.sort,
        cityCode:params.cityCode,
        longitude:params.longitude,
        latitude:params.latitude
      },
      method: 'post',
      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //创建内容列表
  estabContent(ctx, params) {
    ctx.dispatch('request', {
      url: `/discoveryContent/save`,
      body: {
        categoryId:params.catalogId,
        name:params.name,
        pictures:params.pictures,
        phone:params.phone,
        address:params.address,
        description:params.description,
        sort:params.sort,
        cityCode:params.cityCode,
        longitude:params.longitude,
        latitude:params.latitude
      },
      method: 'post',
      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //删除内容列表
    deleteClassify(ctx,params){
      ctx.dispatch('request', {
        url: `/discoveryContent/delete?id=${params.id}`,
        method: 'post',
        onSuccess: (body, headers) => {
          params.onsuccess ? params.onsuccess(body, headers) : null
        },
        onFail: body => {
          params.onfail && params.onfail(body)
        }
      })
    },
  //查看所有分类
  findAllClassify(ctx,params){
    ctx.dispatch('request', {
      url: `/discoveryCatalog/all`,
      method: 'get',
      onSuccess: (body, headers) => {
        params.onsuccess ? params.onsuccess(body, headers) : null
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  }
}
