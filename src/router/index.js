<<<<<<< HEAD
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Buser from '@/components/Buser/index'

//////////////////////////组织管理///////////
/////////酒店组织
import hotelOrg from '@/components/Buser/organization/hotelOrgClass/hotelOrg'
//集团/酒店/部门等信息
import orgDetailedInfo from '@/components/Buser/organization/hotelOrgClass/orgDetailedInfo'
////////复创组织//////////
import fortrunOrg from '@/components/Buser/organization/fortrunOrgClass/fortrunOrg'
import fortrunInfo from '@/components/Buser/organization/fortrunOrgClass/fortrunInfo'
////////其他组织//////////
import elseOrg from '@/components/Buser/organization/elseOrg'


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
// /////////--------------------我的部分 =-----------------
import roleModuleManage from '@/components/Buser/roleModule/roleModuleManage'
//////////////////////////////// 主页菜单/////////////
// const Whome = () => import('@/views/Whome')
// const Classify = () => import('@/views/classify/Classify')
// const Content = () => import('@/views/content/Content')
// const Service = () => import('@/views/service/Service')
// const Advertising = () => import('@/views/advertising/Advertising')

import Whome from '@/views/Whome'
import Classify from '@/views/classify/Classify'
import Content from '@/views/content/Content'
import Service from '@/views/service/Service'
import Advertising from '@/views/advertising/Advertising'
import Establish from '@/views/establishContent/establish'
import esadvertising from '@/views/establishAdvertising/esAdvertising'
import editAdvertising from '@/views/editAdvertising/editAdvertising'
import editContent from '@/views/editContent/editContent'
Vue.use(Router)

const main = [{
        path: '/buser',
        name: 'Home',
        component: Home,
        children: [
            //B端用户----2级路由
            {
                path: '/',
                name: 'Buser',
                component: Buser,
                redirect: {
                    path: '/buser/hotelOrg'
                },
                children: [
                    //组织管理----3级路由
                    {
                        path: 'hotelOrg',
                        name: 'hotelOrg',
                        component: hotelOrg,
                        children: [
                            //treeInfo----4级路由
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
                        name: 'fortrunOrg',
                        component: fortrunOrg,
                        children: [
                            //treeInfo----4级路由
                            {
                                path: '/',
                                name: 'fortrunInfo',
                                component: fortrunInfo
                            }
                        ]
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
                        name: 'userManage',
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
                        name: 'authorityManage',
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
                        name: 'roleManage',
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
                    //创建广告 编辑广告
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

]
export default new Router({
    routes: [...main]
})
=======
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Buser from '@/components/Buser/index'

//////////////////////////组织管理///////////
/////////酒店组织
import hotelOrg from '@/components/Buser/organization/hotelOrgClass/hotelOrg'
//集团/酒店/部门等信息
import orgDetailedInfo from '@/components/Buser/organization/hotelOrgClass/orgDetailedInfo'
////////复创组织//////////
import fortrunOrg from '@/components/Buser/organization/fortrunOrgClass/fortrunOrg'
import fortrunInfo from '@/components/Buser/organization/fortrunOrgClass/fortrunInfo'
////////其他组织//////////
import elseOrg from '@/components/Buser/organization/elseOrg'


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


Vue.use(Router)

const main=[{
    path: '/buser',
    name: 'Home',
    component: Home,
    children:[
        //B端用户----2级路由
        {
            path: '/',
            name: 'Buser',
            component: Buser,
            children:[
                //组织管理----3级路由
                {
                    path: 'hotelOrg',
                    name: 'hotelOrg',
                    component: hotelOrg,
                    children:[
                        //treeInfo----4级路由
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
                    name: 'fortrunOrg',
                    component: fortrunOrg,
                    children:[
                        //treeInfo----4级路由
                        {
                            path: '/',
                            name: 'fortrunInfo',
                            component: fortrunInfo
                        }
                    ]
                },
                //其他组织
                {
                    path: 'elseOrg',
                    name: 'elseOrg',
                    component: elseOrg,
                    children:[
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
                    name: 'userManage',
                    component: userManage,
                    children:[
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
                    name: 'authorityManage',
                    component: authorityManage,
                    children:[
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
                    name: 'roleManage',
                    component: roleManage,
                    children:[
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
        }
    ]
}]
export default new Router({
    routes: [...main]
})
>>>>>>> 9483c4063517aac9e428d98d4b57e7ad5e87f1c1
