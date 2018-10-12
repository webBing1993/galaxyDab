module.exports = {
  // 获取酒店组织树
  hotelOrgTree(ctx, params) {
    ctx.dispatch('request', {
      // url: `/org/getorgs`,
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
      onFail: (body) => {
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


  // 描述:修改酒店所属父节点url:/org/getbrands/{groupId}
  changeRelationship(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/updaterelation`,
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

// 获取酒店下品牌列表  下拉框
  hotelBrandList(ctx, params) {
    ctx.dispatch('request', {
      url: `org/getBrandsByOrgId/${params.orgId}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 描述:获取集团品牌列表 qa.fortrun.cn:9201/org/getBrandsByOrgId/495692440657723392
  BrandList(ctx, params) {
    ctx.dispatch('request', {
      url: `/org/getBrandsByOrgId/${params.groupId}`,
      method: 'get',
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

  // 添加品牌
  addBrand(ctx, params) {
    ctx.dispatch('request', {
      url: `/brands/add`,
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
  // 修改品牌
  modifyBrand(ctx, params) {
    ctx.dispatch('request', {
      url: `/brands/${params.brand_id}`,
      method: 'PUT',
      body: {...params.fields},
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },

}
