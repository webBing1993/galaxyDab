
//根据酒店code获取该酒店空间区域节点树形结构列表
module.exports = {
  getHotelTreeList (ctx, param) {
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/getAreaAndPointTree',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //根据空间名字获得区域下拉框
  getZoneList(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/hotelConfig/getSpaceList',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //添加空间区域
  addZone(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/addAreaConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //空间区域详情
  zoneDetail(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/getAreaConfigById',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //修改空间区域
  updateZone(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/updateAreaConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //删除空间区域
  delZone(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/deleteAreaConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //添加节点属性
  addDevicePoint(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/addPointConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //节点属性详情
  devicePointDetail(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/getPointConfigById',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //修改节点属性
  updateDevicePoint(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/updatePointConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //删除节点属性
  delDevicePoint(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/areaAndPointConfig/deletePointConfig',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  //绑定旅业房间号
  getLvyeRoomNo(ctx, param){
    ctx.dispatch ('request', {
      url: '/iotapi/v1/entranceGuardArea/getHotelAllRooms',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  },
  getDoorLockOption(ctx, param){
    ctx.dispatch ('request', {
      url: '/ecard/dab/doorConfig/getDoorList',
      body: param.data,
      method: 'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess (body, headers) : null
      }
    })
  }
}
