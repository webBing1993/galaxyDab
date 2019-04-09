<!--dashboard用户tab页面-->
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
                  <span>人证通数据统计</span>
                </template>
                <el-menu-item index="/OperateAllStatistics">
                  <i class="el-icon-menu"></i>
                  <span slot="title">有证/无证统计</span>
                </el-menu-item>
                <el-menu-item index="/CertificateStatistics">
                  <i class="el-icon-menu"></i>
                  <span slot="title">有证使用统计</span>
                </el-menu-item>
                <el-menu-item index="/UndocumentedStatistics">
                  <i class="el-icon-menu"></i>
                  <span slot="title">无证使用统计</span>
                </el-menu-item>
                <el-menu-item index="/InterfaceStatistics">
                  <i class="el-icon-menu"></i>
                  <span slot="title">设备无证接口统计</span>
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
    mounted(){

    },
    watch:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
