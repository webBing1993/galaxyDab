<!--B端用户tab页面-->
<template>
  <div class="second_wrap">
    <div class="row">
      <!--aside-->
      <div class="aside">
        <el-row class="tac">
          <el-col :span="24">
           <el-menu
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            :default-openeds="openeds"
            :default-active="$route.path"
            class="el-menu-admin" router>
            <!--合并ecard-dashboard开始-->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>设备管理</span>
              </template>
              <el-menu-item index="/run">
                <i class="el-icon-menu"></i>
                <span slot="title">运行设备</span>
              </el-menu-item>
              <el-menu-item index="/notrun">
                <i class="el-icon-menu"></i>
                <span slot="title">在库设备</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
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
            <el-submenu index="3">
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
          </el-menu>
          </el-col>
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
        openeds:["0","1","2","3","4"],

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
    computed: {
      onRoutes () {
        if (this.$route.path.replace('/', '') == 'run') {
          return 'run';
        }
        else if (this.$route.path.replace('/', '') == 'notrun') {
          return 'notrun'
        }
        else if (this.$route.path.replace('/', '') == 'firmwarelist') {
          return 'firmwarelist'
        }
        else if (this.$route.path.replace('/', '') == 'constructionlist') {
          return 'constructionlist'
        }
        else if (this.$route.path.replace('/', '') == 'constructors') {
          return 'constructors'
        }
        else if (this.$route.path.replace('/', '') == 'hotelConfig') {
          return 'hotelConfig'
        }
        else if (this.$route.path.replace('/', '') == 'zoneAndDevice') {
          return 'zoneAndDevice'
        }

        else {

        }
      }

    },
    mounted(){

    },
    watch:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
