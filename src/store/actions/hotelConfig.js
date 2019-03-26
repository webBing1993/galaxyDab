module.exports = {
  // 酒店配置列表接口
  getHotelConfigList(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/hotelConfig/searchHotelConfigList/'+param.page+'/'+param.num,
      method: 'POST',
      body:{
        name:param.name
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //筛选获取酒店列表
  searchHotelList(ctx, param){
    ctx.dispatch('resource', {
      url: '/iotapi/v1/entranceGuardArea/searchHotelById',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  //新增酒店配置
  addNewHotelConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/hotelConfig/addHotelConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //修改酒店配置
  modifyHotelConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/hotelConfig/updateHotelConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //获取酒店配置详情
  getHotelConfigDetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/hotelConfig/getHotelConfigById',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //根据酒店code获取该酒店门锁电量信息
  getDoorConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/doorConfig/getDoorConfigByCode',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //删除门锁电量配置
  delDoorConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/doorConfig/deleteDoorConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //添加门锁电量配置
  addDoorConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/doorConfig/addDoorConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //修改门锁电量配置
  modifyDoorConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/doorConfig/updateDoorConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //根据酒店code获取该酒店梯控信息
  getLiftInfo(ctx, param){
    ctx.dispatch('resource', {
      url: '/ecard/dab/hotelConfig/getLiftByCode',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
