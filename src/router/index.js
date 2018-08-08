import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Buser from '@/components/Buser/index'

//////////////////////////组织管理///////////
/////////酒店组织
import hotelOrg from '@/components/Buser/organization/hotelOrgClass/hotelOrg'
//集团信息
import groupInfo from '@/components/Buser/organization/hotelOrgClass/groupInfo'
//酒店信息
import hotelInfo from '@/components/Buser/organization/hotelOrgClass/hotelInfo'
//部门信息

////////复创组织//////////
import fortrunOrg from '@/components/Buser/organization/fortrunOrg'

////////其他组织//////////
import elseOrg from '@/components/Buser/organization/elseOrg'


/////////////////////////用户管理///////////
import userManage from '@/components/Buser/user/userManage'


/////////////////////////权限管理///////////
import authorityManage from '@/components/Buser/authority/authorityManage'


/////////////////////////角色管理///////////
import roleManage from '@/components/Buser/role/roleManage'


/////////////////////////角色模板管理////////
import roleModuleManage from '@/components/Buser/roleModule/roleModuleManage'


Vue.use(Router)

const main=[{
    path: '/',
    name: 'Home',
    component: Home,
    children:[
        //B端用户----2级路由
        {
            path: 'buser',
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
                            name: 'groupInfo',
                            component: groupInfo
                        }
                    ]
                },
                //复创组织
                {
                    path: 'fortrunOrg',
                    name: 'fortrunOrg',
                    component: fortrunOrg
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
                },
                //权限管理
                {
                    path: 'authorityManage',
                    name: 'authorityManage',
                    component: authorityManage,
                },
                //角色管理
                {
                    path: 'roleManage',
                    name: 'roleManage',
                    component: roleManage,
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
