/**
 * 人证通统计action
 */
module.exports = {
  //获取酒店集团列表
  getHotelGroups(ctx, param) {
    ctx.dispatch('request', {
      url: `/data/queryHotelGroups`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },
  //获取城市
  getCitys(ctx, param) {
    ctx.dispatch('request', {
      url: `/data/queryHotelInCitys`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },
  //获取集团所拥有酒店
  getHotelsByGroupId(ctx, param) {
    ctx.dispatch('request', {
      url: `/data/queryHotelsByGroupId/${param.group_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },

  //人证通数据汇总(人证/无证使用汇总)
  getAllStatistics(ctx, param) {
    ctx.dispatch('request', {
      url: '/data/summary',
      method: 'POST',
      body:param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },

  //有证使用统计
  getCertificateStatistics(ctx, param) {
    ctx.dispatch('request', {
      url: '/data/license',
      method: 'POST',
      body:param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },
  // 无证使用统计
  getUndocumtedStatistics(ctx, param) {
    ctx.dispatch('request', {
      url: '/data/nolicense',
      method: 'POST',
      body:param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },
  // 无证接口开通数据统计
  getInterfaceStatistics(ctx, param) {
    ctx.dispatch('request', {
      url:'/data/nolicense/hotel',
      method: 'POST',
      body:param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: (body) => {
        param.onfail && param.onfail(body)
      }
    })
  },
}
