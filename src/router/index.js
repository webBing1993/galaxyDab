import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Buser from '@/components/Buser/index'

import Login from '@/components/Login/login'

//////////////////////////组织管理///////////
/////////酒店组织
import hotelOrg from '@/components/Buser/organization/hotelOrgClass/hotelOrg'
//集团/酒店/部门等信息
import orgDetailedInfo from '@/components/Buser/organization/hotelOrgClass/orgDetailedInfo'
////////复创组织//////////
import fortrunOrg from '@/components/Buser/organization/fortrunOrgClass/fortrunOrg'
import fortrunInfo from '@/components/Buser/organization/fortrunOrgClass/fortrunInfo'
////////其他组织//////////
import elseOrg from '@/components/Buser/organization/anotherOrg/elseOrg'


/////////////////////////用户管理///////////
import userManage from '@/components/Buser/user/userManage'
import userInfo from '@/components/Buser/user/userInfo'


/////////////////////////权限管理///////////
import authorityManage from '@/components/Buser/authority/authorityManage'
import authorityInfo from '@/components/Buser/authority/authorityInfo'

/////////////////////////角色管理///////////
import roleManage from '@/components/Buser/role/roleManage'
import roleInfo from '@/components/Buser/role/roleInfo'

/////////////////////////角色模板管理////////
import roleModuleManage from '@/components/Buser/roleModule/roleModuleManage'

//配置管理
import Whome from '@/components/Whome'
import Classify from '@/components/collection/classify/Classify'
import Content from '@/components/collection/content/Content'
import Service from '@/components/collection/service/Service'
import Advertising from '@/components/collection/advertising/Advertising'
import Establish from '@/components/collection/establishContent/establish'
import esadvertising from '@/components/collection/establishAdvertising/esAdvertising'
import editAdvertising from '@/components/collection/editAdvertising/editAdvertising'
import editContent from '@/components/collection/editContent/editContent'
Vue.use(Router)

const main = [
  {
    path: '/',
    component: Home,
    children: [
      //B端用户----2级路由
      {
        path: '/',
        component: Buser,
        children: [
          //组织管理----3级路由
          {
            path: 'hotelOrg',
            component: hotelOrg,
            children: [
              // treeInfo----4级路由
              {
                path: '/',
                name: 'orgDetailedInfo',
                component: orgDetailedInfo
              }
            ]
          },
          //复创组织
          {
            path: 'fortrunOrg',
            component: fortrunOrg,
            // children:[
            //     //treeInfo----4级路由
            //     {
            //         path: '/',
            //         component: fortrunInfo
            //     }
            // ]
          },
          //其他组织
          {
            path: 'elseOrg',
            name: 'elseOrg',
            component: elseOrg,
            children: [
              // {
              //     path: 'hotelOrg',
              //     name: 'hotelOrg',
              //     component: hotelOrg,
              // }
            ]
          },
          //用户管理
          {
            path: 'userManage',
            component: userManage,
            children: [
              //treeInfo----4级路由
              {
                path: '/',
                name: 'userInfo',
                component: userInfo
              }
            ]
          },
          //权限管理
          {
            path: 'authorityManage',
            component: authorityManage,
            children: [
              //treeInfo----4级路由
              {
                path: '/',
                name: 'authorityInfo',
                component: authorityInfo
              }
            ]
          },
          //角色管理
          {
            path: 'roleManage',
            component: roleManage,
            children: [
              //treeInfo----4级路由
              {
                path: '/',
                name: 'roleInfo',
                component: roleInfo
              }
            ]
          },
          //角色模板管理
          {
            path: 'roleModuleManage',
            name: 'roleModuleManage',
            component: roleModuleManage,
          }
        ]
      },
      ///////--------------配置管理开始------------
      {
        path: 'whome',
        name: 'Whome',
        component: Whome,
        redirect: {
          name: 'classify'
        },
        children: [
          // 添加分类
          {
            name: 'classify',
            path: 'classify',
            component: Classify
          },
          // 内容管理
          {
            name: 'content',
            path: 'content',
            component: Content,

          },
          // 广告管理
          {
            name: 'advertising',
            path: 'advertising',
            component: Advertising,
          },
          // 基础服务
          {
            name: 'service',
            path: 'service',
            component: Service
          },
          // 创建内容
          {
            name: "establish",
            path: "establish",
            component: Establish
          },
          // 创建广告 编辑广告
          {
            name: 'esadvertising',
            path: 'esadvertising',
            component: esadvertising
          },
          // 编辑广告
          {
            name: 'editAdvertising',
            path: 'editAdvertising',
            component: editAdvertising

          },
          // 编辑内容
          {
            name: 'editContent',
            path: 'editContent',
            component: editContent
          }

        ],

      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

export default new Router({
  routes: [...main]
})
