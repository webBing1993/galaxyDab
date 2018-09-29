module.exports = {
  // 获取酒店组织树
  hotelOrgTree(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getorgs`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 添加酒店组织
  addHotelOrgTreeNode(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/addorg`,
      method: 'POST',
      body: {...params.fields},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 描述:获取组织机构详细信息 url:/org/get det ailbyid/{orgid}
  hotelOrgNodeDetail(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getdetailbyid/${params.orgid}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
 // 修改组织机构详细信息 url:/org/updat eorgbyid
  modifyHotelOrgTreeNode(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/updateorgbyid`,
      method: 'POST',
      body: {...params.fields},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  // 描述:获取集团品牌列表 url:/org/getbrands/{groupId} 请求方式get
  getBrandList(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getbrands/${params.groupId}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
