<template>
  <el-container class="container_header">
    <!--<el-header class="container_header1">-->
      <!--<div class="headerone">-->
         <!--<span class="headerone_span" style="text-align: left;">-->
          <!--<img class="headerone_img" src="https://iotdev.fortrun.cn/static/img/LOGO.1937726.png">-->
          <!--<span style="margin-left:10px;" >E卡通管理平台</span>-->
         <!--</span>-->
        <!--<span>-->
         <!--</span>-->
        <!--<span class="headerone_span1">您好！{{name}}， <i class="signout" @click='signout'>退出</i></span>-->
      <!--</div>-->
    <!--</el-header>-->
    <!-- <el-header style='line-height: 60px'>首页</el-header> -->
    <!--<el-container class="container_body">-->
      <!--<el-aside style="overflow:hidden;width:200px;border-right: 1px solid #eee;" class="container_body_aside">-->
        <!--<el-menu :default-openeds="['1','2', '3','4','5']" :default-active="thisurl"   style="height:100%;width:215px;overflow-y: auto;overflow-x: hidden;" >-->

          <!--<el-submenu index="1">-->
            <!--<template slot="title">设备管理</template>-->
            <!--<span @click="rundevice"><el-menu-item index="5">运行设备</el-menu-item></span>-->
            <!--<span @click="notRundevice"><el-menu-item index="6">在库设备</el-menu-item></span>-->
            <!--&lt;!&ndash;<router-link to="/device/run"><el-menu-item index="5" >运行设备</el-menu-item></router-link>-->
            <!--<router-link to="/device/notrun"><el-menu-item index="6">在库设备</el-menu-item></router-link>&ndash;&gt;-->
          <!--</el-submenu>-->

          <!--<el-submenu index="2">-->
            <!--<template slot="title">施工管理</template>-->
            <!--<router-link to="/device/firmwarelist"><el-menu-item index="7">固件列表</el-menu-item></router-link>-->
            <!--&lt;!&ndash;<router-link to="/device/remoteTask"><el-menu-item index="8">远程任务</el-menu-item></router-link>&ndash;&gt;-->
            <!--<router-link to="/device/constructionlist"><el-menu-item index="13">施工任务</el-menu-item></router-link>-->
            <!--<router-link to="/device/constructors"><el-menu-item index="12">施工人员</el-menu-item></router-link>-->
          <!--</el-submenu>-->

          <!--&lt;!&ndash;<el-submenu index="3">&ndash;&gt;-->
          <!--&lt;!&ndash;<template slot="title">权限管理</template>&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link to="/device/role"><el-menu-item index="9">角色列表</el-menu-item></router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link to="/device/userlist"><el-menu-item index="10">用户列表</el-menu-item></router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->

          <!--&lt;!&ndash;<el-submenu index="4">&ndash;&gt;-->
          <!--&lt;!&ndash;<template slot="title">区域管理</template>&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<router-link to="/device/datapanel"><el-menu-item index="11">区域管理</el-menu-item></router-link>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<span @click="quyu"><el-menu-item index="11">区域管理</el-menu-item></span>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
          <!--<el-submenu index="5">-->
            <!--<template slot="title">空间管理</template>-->
            <!--<span @click="goto({name:'hotelConfig'})"><el-menu-item index="14">酒店配置</el-menu-item></span>-->
            <!--<span @click="goto({name:'zoneAndDevice'})"><el-menu-item index="15">空间和设备点配置</el-menu-item></span>-->
          <!--</el-submenu>-->
        <!--</el-menu>-->
      <!--</el-aside>-->
      <!--<router-view></router-view>-->
    <!--</el-container>-->
    <!--<router-view></router-view>-->
  </el-container>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        name: '',
        thisurl: "5"
      }
    },
    methods: {

      // select: function (index,indexPath) {
      //   return { "backgroundColor": "#16D032","text-color":"#fff"}
      //
      // },
      // signout: function () {
      //   localStorage.removeItem('mydata')
      //   this.$router.push({ path: '/login' })
      // },
      // quyu(){
      //   //  window.location.reload()
      //   this.$router.push({ name: 'datapanel'})
      //
      // }
      // ,rundevice(){
      //   // window.location.reload()
      //   this.$router.push({ name: 'run'})
      // }
      // ,notRundevice(){
      //   // window.location.reload()
      //   this.$router.push({ name: 'notrun'})
      // }
    },
    mounted: function () {
      // this.name=JSON.parse(localStorage.mydata)
      //
      // if (this.$route.path=="/device/notrun" || this.$route.path=='/addDevMessage'||this.$route.name=='seedetails') {
      //   this.thisurl='6'
      // }else if (this.$route.path=="/device/firmwarelist" || this.$route.path=='/firmwareup') {
      //   this.thisurl='7'
      // }else if (this.$route.path=="/device/remoteTask" || this.$route.path=='/newRemoteTask') {
      //   this.thisurl='8'
      // }else if (this.$route.path=="/odevicene/role" || this.$route.path=='/newrole') {
      //   this.thisurl='9'
      // }else if (this.$route.path=="/device/userlist" || this.$route.path=='/newuser'|| this.$route.name=='updatauser') {
      //   this.thisurl='10'
      // }else if(this.$route.path=="/device/datapanel" || this.$route.name=='gotoentranceguardPoint'){
      //   this.thisurl='11'
      // }else if(this.$route.name=="constructors"){
      //   this.thisurl='12'
      // }else if(this.$route.name=='constructionlist'||this.$route.name=='constructionTask'||this.$route.name=='construnctionEdit'){
      //   this.thisurl='13'
      // }
    }
  }
</script>

<style>
  /*body,html{*/
    /*margin: 0px;*/
  /*}*/
  /*.el-container{*/
    /*padding: 15px;*/
    /*padding-bottom: 0px;*/
    /*background-color: #eee;*/
  /*}*/

  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/


  /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
  /*}*/
  /*ul li{*/
    /*list-style:none*/
  /*}*/

  /*a {*/
    /*color: #16D032;*/
  /*}*/
  /*.el-container{*/
    /*padding: 15px;*/
    /*padding-bottom:0px;*/
    /*background-color: #eee;*/
  /*}*/

  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/

  /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
  /*}*/


  /*a {*/
    /*color: #16D032;*/
  /*}*/
  /*.headerone{display: flex;width: 100%;text-align: center}*/
  /*#app{*/
    /*height:100%*/
  /*}*/
  /*.el-menu-item.is-active {*/
    /*color: #fff;*/
    /*background-color: #16D032;*/
  /*}*/
  /*.container_header{*/
    /*padding:0px;*/
    /*height:100%*/
  /*}*/
  /*.container_header1{*/
    /*line-height: 60px;*/
    /*background-color:#fff*/
  /*}*/
  /*.headerone_span{*/
    /*margin-left:15px;*/
    /*font-weight:600;*/
    /*font-size:21px*/
  /*}*/
  /*.headerone_img{*/
    /*width:86px;*/
    /*height:23px;*/
    /*vertical-align: middle;*/
  /*}*/
  /*.headerone_span{*/
    /*flex:1;*/
    /*right:0px;*/
    /*text-align: right;*/
    /*padding-right:50px*/
  /*}*/
  /*.signout{*/
    /*cursor: pointer;*/
    /*font-style: normal;*/
    /*color: #16d032;*/
  /*}*/
  /*.container_body{*/
    /*height: 100%;*/
    /*border: 1px solid #eee*/
  /*}*/
  /*.container_body_aside{*/
    /*background-color: rgb(238, 241, 246)*/
  /*}*/
</style>
