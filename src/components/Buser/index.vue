<!--B端用户tab页面-->
<template>
  <div class="second_wrap">
    <div class="row">
      <!--aside-->
        <div class="aside">
          <el-row class="tac">
              <el-menu
                :router="true"
                @open="handleOpen"
                @close="handleClose"
                :default-openeds="openeds"
                :default-active="onRoutes"
                class="el-menu-admin" router>
                <el-menu-item index="/userListDetail">
                  <i class="el-icon-document"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
                <!--合并ecard-dashboard开始-->
                <el-submenu index="2-1">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>设备管理</span>
                  </template>
                  <el-menu-item index="/run">
                    <i class="el-icon-menu"></i>
                    <span slot="title">运行设备</span>
                  </el-menu-item>
                  <el-menu-item>
                    <i class="el-icon-menu" index="/notrun"></i>
                    <span slot="title">在库设备</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2-2">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>施工管理</span>
                  </template>
                  <el-menu-item index="/firmwarelist">
                    <i class="el-icon-menu"></i>
                    <span slot="title">固件列表</span>
                  </el-menu-item>
                  <el-menu-item index="/constructionlist">
                    <i class="el-icon-menu"></i>
                    <span slot="title">施工任务</span>
                  </el-menu-item>
                  <el-menu-item index="/constructors">
                    <i class="el-icon-menu"></i>
                    <span slot="title">施工人员</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2-3">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>空间管理</span>
                  </template>
                  <el-menu-item index="/hotelConfig">
                    <i class="el-icon-menu"></i>
                    <span slot="title">酒店配置</span>
                  </el-menu-item>
                  <el-menu-item index="/zoneAndDevice">
                    <i class="el-icon-menu"></i>
                    <span slot="title">空间和设备点配置</span>
                  </el-menu-item>
                </el-submenu>
                <!--合并ecard-dashboard结束-->
                <el-col :span="24"  v-for="item in userPermissionsShow.subPermissions" :key="item.id">
                  <el-submenu index="1" v-if="item.subPermissions != null">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span>{{item.name}}</span>
                    </template>
                    <el-menu-item :index="tag.description" v-for="tag in item.subPermissions" :key="tag.id">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{tag.name}}</span>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item :index="item.description" v-if="item.subPermissions == null">
                  <i class="el-icon-document"></i>
                  <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                  <!--用户列表详情-->
                </el-col>

              </el-menu>

          </el-row>
        </div>
      <!--右边内容-->
        <div class="mainContent">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        name: 'Buser',
        data () {
            return {
              userPermissionsShow:{},
              isShowPermission:true,
              openeds:["1","2","3","4"]

            }
        },
        methods:{
            ...mapActions([
                'goto'
            ]),
          handleOpen (key, keyPath) {
            // console.log(key, keyPath)
          },
          handleClose (key, keyPath) {
            // console.log(key, keyPath)
          },
        },
        mounted(){
          // console.log('ceshi',this.$store.state.userPermissions)
          if(this.$store.state.userPermissions!=null){
            this.userPermissionsShow = this.$store.state.userPermissions
          }
          console.log('测试当前路由路径',this.$route.path.replace('/', ''))
        },
        computed: {
          getuserPermissions () {
            return this.$store.state.userPermissions;
          },
          onRoutes () {
            if (this.$route.path.replace('/', '') == 'hotelOrg') {
              return 'hotelOrg';
            }
            else if (this.$route.path.replace('/', '') == 'fortrunOrg') {
              return 'fortrunOrg'
            }
            else if (this.$route.path.replace('/', '') == 'elseOrg') {
              return 'elseOrg'
            }
            else if (this.$route.path.replace('/', '') == 'userManage') {
              return 'userManage'
            }
            else if (this.$route.path.replace('/', '') == 'authorityManage') {
              return 'authorityManage'
            }
            else if (this.$route.path.replace('/', '') == 'roleManage') {
              return 'roleManage'
            }
            else if (this.$route.path.replace('/', '') == 'roleModuleManage') {
              return 'roleModuleManage'
            }
            else {

            }
          }
        },
        watch:{
          getuserPermissions(val){
            this.userPermissionsShow = val
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
