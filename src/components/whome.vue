<!--权限管理tab页面-->
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
              :default-active="onRoutes"
              class="el-menu-admin" router>
              <el-submenu :index="String(index)" v-for="(item,index) in configPermissionsShow.subPermissions" :key="item.id">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item :index="tag.description" v-for="tag in item.subPermissions" :key="tag.id">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{tag.name}}</span>
                </el-menu-item>
                <!--<el-menu-item index="hotelConfigList" v-if="item.name=='酒店配置管理'">-->
                  <!--<i class="el-icon-menu"></i>-->
                  <!--<span slot="title">酒店配置</span>-->
                <!--</el-menu-item>-->
              </el-submenu>
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
        configPermissionsShow:{},
        openArray:[],
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
      if(this.$store.state.configPermissions!=null){
        this.configPermissionsShow=this.$store.state.configPermissions
      }
    },
    computed:{
      getconfigPermissionsShow(){
        return this.$store.state.configPermissions;
      },
      onRoutes () {
        if (this.$route.path.replace('/', '') == 'hotelList') {
          return 'hotelList';
        }
        if (this.$route.path.replace('/', '') == 'hotelConfigList') {
          return 'hotelConfigList';
        }
        else if (this.$route.path.replace('/', '') == 'classify') {
          return 'classify'
        }
        else if (this.$route.path.replace('/', '') == 'content') {
          return 'content'
        }
        else if (this.$route.path.replace('/', '') == 'advertising') {
          return 'advertising'
        }
        else if (this.$route.path.replace('/', '') == 'configure') {
          return 'configure'
        }
        else if (this.$route.path.replace('/', '') == 'editContent') {
          return 'content'
        }
        else if (this.$route.path.replace('/', '') == 'editAdvertising') {
          return 'advertising'
        }
      }

    },
    watch:{
      getconfigPermissionsShow(val){
        this.configPermissionsShow = val
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
