<!--B端用户tab页面-->
<template>
  <div class="second_wrap">
    <div class="row">
      <!--aside-->
        <div class="aside">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="goto('./hotelOrg')">
                  <i class="el-icon-menu"></i>
                  <span slot="title">组织管理</span>
                </el-menu-item>
                <el-menu-item index="2" @click="goto('./hotelOrg')">
                  <span slot="title" class="noIcon">酒店组织</span>
                </el-menu-item>
                <el-menu-item index="3" @click="goto('./fortrunOrg')">
                  <span slot="title" class="noIcon" >复创组织</span>
                </el-menu-item>
                <el-menu-item index="4" @click="goto('./elseOrg')">
                  <span slot="title" class="noIcon">其他组织</span>
                </el-menu-item>
                <el-menu-item index="5" @click="goto('./userManage')">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item >
                <el-menu-item index="6" @click="goto('./authorityManage')">
                  <i class="el-icon-document"></i>
                  <span slot="title">权限管理</span>
                </el-menu-item>
                <el-menu-item index="7" @click="goto('./roleManage')">
                  <i class="el-icon-setting"></i>
                  <span slot="title">角色管理</span>
                </el-menu-item>
                <el-menu-item index="8" @click="goto('./roleModuleManage')">
                  <i class="el-icon-setting"></i>
                  <span slot="title">角色模板管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      <!--右边内容-->
        <div class="mainContent">
          <router-view></router-view>
        </div>
    </div>
    <!--<el-row>-->
     <!---->
      <!--<el-col :span="4">-->
           <!---->
      <!--</el-col>-->
      <!---->
      <!--<el-col :span="20">-->
       <!---->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        name: 'Buser',
        data () {
            return {

            }
        },
        methods:{
            ...mapActions([
                'goto'
            ])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
