module.exports = {
  //酒店列表
  getHotelList(ctx, params) {
    ctx.dispatch('request', {
      url: 'hotelconfig/hotelInformation',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //酒店状态列表
  getHotelServer(ctx, params) {
    ctx.dispatch('request', {
      url: 'hotelServiceConfigs/hotelId?hotelId='+params.data.hotelId,
      method: 'post',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },


  //酒店状态修改
  getHotelServiceConfigs(ctx, params) {
    ctx.dispatch('request', {
      url: 'hotelServiceConfigs/hotelserviceconfig',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //服务状态修改
  getHotelIdsStatus(ctx, params) {
    ctx.dispatch('request', {
      url: '/hotelServiceConfigs/hotelIds',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

}
