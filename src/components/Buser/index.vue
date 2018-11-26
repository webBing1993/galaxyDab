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
                class="el-menu-admin">
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
                </el-col>

                <!--<el-menu-item index="1" @click="goto('./hotelOrg')">-->
                  <!--<i class="el-icon-menu"></i>-->
                  <!--<span slot="title">组织管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2" @click="goto('./hotelOrg')">-->
                  <!--<span slot="title" class="noIcon">酒店组织</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3" @click="goto('./fortrunOrg')">-->
                  <!--<span slot="title" class="noIcon" >复创组织</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="4" @click="goto('./elseOrg')">-->
                  <!--<span slot="title" class="noIcon">其他组织</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="5" @click="goto('./userManage')">-->
                  <!--<i class="el-icon-menu"></i>-->
                  <!--<span slot="title">用户管理</span>-->
                <!--</el-menu-item >-->
                <!--<el-menu-item index="6" @click="goto('./authorityManage')">-->
                  <!--<i class="el-icon-document"></i>-->
                  <!--<span slot="title">权限管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="7" @click="goto('./roleManage')">-->
                  <!--<i class="el-icon-setting"></i>-->
                  <!--<span slot="title">角色管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="8" @click="goto('./roleModuleManage')">-->
                  <!--<i class="el-icon-setting"></i>-->
                  <!--<span slot="title">角色模板管理</span>-->
                <!--</el-menu-item>-->
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
          console.log('ceshi',this.$store.state.userPermissions)
          if(this.$store.state.userPermissions!=null){
            this.userPermissionsShow = this.$store.state.userPermissions
          }


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
