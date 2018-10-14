
module.exports = {
  // 获取广告
  advertisinList (ctx, params) {
    ctx.dispatch('request', {
      url: `adv/queryAll/?name=${params.name}&type=${params.type}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },  //删除广告
  deleteAdver (ctx, params) {
    ctx.dispatch('request', {
      url: `adv/delete/${params.id}`,
      method: 'delete',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //上传相册图片
  updateMsg (ctx, params) {
    ctx.dispatch('request', {
      url: '/adv/picture/upload',
      body:{
        file:params.file
      },
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //保存广告
  saveAdver(ctx,params){
    ctx.dispatch('request', {
      url: '/adv/add',
      method: 'post',
      body:{
        type:params.type,
        name:params.name,
        picture:params.picture,
        location:params.location,
        contentType:params.contentType,
        url:params.url,
        contents:params.contents,
        sort:params.sort
      },
      headers: {'Content-Type': 'multipart/form-data'},
      onSuccess: (body) => {
      params.onsuccess && params.onsuccess(body)
  },
    onFail: body => {
      params.onfail && params.onfail(body)
    }
  })
  },
  //服务
  service(ctx,params){
    ctx.dispatch('request', {
      url: '/config/getAll',
      method: 'get',
      onSuccess: (body) => {
      params.onsuccess && params.onsuccess(body)
    },
    onFail: body => {
      params.onfail && params.onfail(body)
    }
  })
  },
  //服务改变状态
  changeSta(ctx,params){
    ctx.dispatch('request', {
      url: '/config/update',
      method: 'post',
      body:{
        id:params.id,
        key:params.key,
        open:params.open
      },
      onSuccess: (body) => {
      params.onsuccess && params.onsuccess(body)
  },
    onFail: body => {
      params.onfail && params.onfail(body)
    }
  })
  }

}
