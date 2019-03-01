import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/components/Home'], resolve)
const Buser = resolve => require(['@/components/Buser/index'], resolve)
const Login = resolve => require(['@/components/Login/login'], resolve)
const hotelOrg = resolve => require(['@/components/Buser/organization/hotelOrgClass/hotelOrg'], resolve)
const orgDetailedInfo = resolve => require(['@/components/Buser/organization/hotelOrgClass/orgDetailedInfo'], resolve)
const fortrunOrg = resolve => require(['@/components/Buser/organization/fortrunOrgClass/fortrunOrg'], resolve)
const elseOrg = resolve => require(['@/components/Buser/organization/anotherOrg/elseOrg'], resolve)
const userManage = resolve => require(['@/components/Buser/user/userManage'], resolve)
/////////////////////////用户管理///////////
const userInfo = resolve => require(['@/components/Buser/user/userInfo'], resolve)

const authorityManage = resolve => require(['@/components/Buser/authority/authorityManage'], resolve)
/////////////////////////权限管理///////////
const authorityInfo = resolve => require(['@/components/Buser/authority/authorityInfo'], resolve)
const roleManage = resolve => require(['@/components/Buser/role/roleManage'], resolve)
/////////////////////////角色管理///////////
const roleInfo = resolve => require(['@/components/Buser/role/roleInfo'], resolve)

/////////////////////////角色模板管理////////
const roleModuleManage = resolve => require(['@/components/Buser/roleModule/roleModuleManage'], resolve)

//配置管理
const Whome = resolve => require(['@/components/whome'], resolve)
const Classify = resolve => require(['@/components/collection/classify/Classify'], resolve)
const Content = resolve => require(['@/components/collection/content/Content'], resolve)
const Service = resolve => require(['@/components/collection/service/Service'], resolve)
const Advertising = resolve => require(['@/components/collection/advertising/Advertising'], resolve)
const Establish = resolve => require(['@/components/collection/establishContent/establish'], resolve)
const esadvertising = resolve => require(['@/components/collection/establishAdvertising/esAdvertising'], resolve)
const editAdvertising = resolve => require(['@/components/collection/editAdvertising/editAdvertising'], resolve)
const editContent = resolve => require(['@/components/collection/editContent/editContent'], resolve)
const hotelList = resolve => require(['@/components/collection/hotelList'], resolve)
const configure = resolve => require(['@/components/collection/hotelList/configure'], resolve)
const userListDetail =  resolve => require(['@/components/Buser/userListDetails/index'], resolve)
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
            name:'hotelOrg',
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
          },
          //用户列表详情
          {
            path:'userListDetail',
            name:'userListDetail',
            component:userListDetail
          }
        ]
      },
      ///////--------------配置管理开始------------
      {
        path: '/',
        name: 'Whome',
        component: Whome,
        redirect: {
          name: 'hotelList'
        },
        children: [
          //酒店列表
          {
            name: 'hotelList',
            path: 'hotelList',
            component: hotelList
          },
          // 酒店配置
          {
            name: 'configure',
            path: 'configure',
            component: configure
          },
          //添加分类
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
