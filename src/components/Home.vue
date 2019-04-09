<template>
  <div class="buser_app">
    <nav>
      <h2><img src="../assets/img/logo.png" /> 智慧酒店·微前台</h2>
      <div class="tab ">
        <el-tabs v-model="activeName" class="tab_style" @tab-click="handleClick" tab-position="bottom">
          <el-tab-pane label="B端用户管理" name="first" v-if="isShowTabUser"></el-tab-pane>
          <el-tab-pane label="配置管理" name="second" v-if="isShowTabManage"></el-tab-pane>
          <el-tab-pane label="E卡通" name="third" v-if="eUserId!=0"></el-tab-pane>
          <el-tab-pane label="运营中心" name="four"></el-tab-pane>
        </el-tabs>
      </div>
      <el-button class="exit" type="danger" round="" @click="exit()">退出</el-button>
    </nav>
    <div class="first_wrap">
      <router-view></router-view>
    </div>
    <el-dialog
      :visible.sync="logout"
      title="是否退出?"
      width="30%"
    >
      <el-button @click.native="logout = false">否</el-button>
      <el-button type="primary" @click="exitOut()" class="right">是</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    name: 'Home',
    data () {
      return {
        activeName:'',
        logout: false,
        isShowTabUser:false,
        isShowTabManage:false,
      }
    },
    methods:{
      ...mapActions([
        'goto'
      ]),
      handleClick(tab){
        console.log('tab名字',tab)
        if(tab.label=='B端用户管理'){
          let path ;
          console.log('测试tab栏',this.$store.state.userPermissions)
          if((this.$store.state.userPermissions.subPermissions[0].description == '') || (this.$store.state.userPermissions.subPermissions[0].description == null) ){
            path = this.$store.state.userPermissions.subPermissions[0].subPermissions[0].description
          }
          else{
            path = this.$store.state.userPermissions.subPermissions[0].description
          }
          this.$router.push({path:path})

        }else if(tab.label=='配置管理'){
          console.log('测试tab栏1',this.$store.state.configPermissions)
          // console.log('写进去path',this.$store.state.configPermissions.subPermissions[0].subPermissions[0].description)
          let path = this.$store.state.configPermissions.subPermissions[0].subPermissions[0].description
          this.$router.push({path:path})
        }
        else if(tab.label=='E卡通'){
          this.$router.push({path:'run'})
        }else if(tab.label=='运营中心'){
          this.$router.push({path:'OperateAllStatistics'})
        }

      },


      // 退出事件
      exit() {
        this.logout = true;
      },

      // 退出确定事件
      exitOut() {
        this.logout = false;
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration:1000,
          showClose: true,
        });
        sessionStorage.removeItem('session_id');
        localStorage.clear()
        sessionStorage.clear()
        this.goto('/login');
      }

    },
    computed:{
      getconfigPermissionsShow(){
        return this.$store.state.configPermissions;
      },
      getuserPermissionsShow(){
        return this.$store.state.userPermissions
      },
      ...mapState(['eUserId'])
    },
    mounted(){
      console.log('chakanZHANGMENGJIE',this.eUserId)
      if(this.$store.state.userPermissions!=''){
        this.isShowTabUser = true
      }
      else{
        this.isShowTabUser = false
      }
      // console.log('配置管理1',this.$store.state.configPermissions=='')
      if(this.$store.state.configPermissions!=''){
        this.isShowTabManage = true
      }
      else{
        this.isShowTabManage = false
      }
    },
    watch:{
      getconfigPermissionsShow(val){
        if(val!=''){
          this.isShowTabManage = true
        }
        else{
          this.isShowTabManage = false
        }
      },
      getuserPermissionsShow(val){
        if(val!=''){
          this.isShowTabUser = true
        }
        else{

          this.isShowTabUser = false
        }

      },
      $route(to,from){
        //尝试看
        let nextPath = to.path.replace('/', '')
        let routePath = ["hotelList","classify","content","advertising","configure","editContent","editAdvertising"]
        if(routePath.indexOf(nextPath) != -1){
          this.activeName = 'second'
        }
        let routePath1 = ["userListDetail","hotelOrg","fortrunOrg","elseOrg","userManage","authorityManage","roleManage","roleModuleManage"]
        if(routePath1.indexOf(nextPath) != -1){
          this.activeName = 'first'
        }
        if((routePath.indexOf(nextPath) == -1)&& (routePath1.indexOf(nextPath) == -1)){
          this.activeName = 'third'
        }

      },
      activeName(val) {
        let nowPath = this.$route.path.replace('/', '')
        console.log('===========')
        let routePath = ["hotelList","classify","content","advertising","configure","editContent","editAdvertising"]
        if(routePath.indexOf(nowPath) != -1){
          this.activeName = 'second'
        }
        let routePath1 = ["userListDetail","hotelOrg","fortrunOrg","elseOrg","userManage","authorityManage","roleManage","roleModuleManage"]
        if(routePath1.indexOf(nowPath) != -1){
          this.activeName = 'first'
        }
        let routePath2 = ["OperateAllStatistics","CertificateStatistics","UndocumentedStatistics","InterfaceStatistics"]
        if((routePath2.indexOf(nowPath) != -1)){
          this.activeName = 'four'
        }
        if((routePath.indexOf(nowPath) == -1)&& (routePath1.indexOf(nowPath) == -1) && (routePath2.indexOf(nowPath) == -1)){
          this.activeName = 'third'
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .buser_app{
    width: 100%;
    height: 100%;
    overflow: scroll;
    nav{
      position:fixed;
      height: 3.5rem;
      width: 100%;
      background-color: #ffffff;
      margin-bottom: 1rem;
      display: block;
      h2{
        display: flex;
        justify-content: center;
        background-color: #22d178;
        font-size: 15px;
        text-align: left;
        float: left;
        padding-top: 15px;
        width: 15%;
        height: 100%;
        color: #ffffff;
        img{
          display: inline-block;
          width: 25px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .tab{
        position: relative;
        float: left;
        top: 0.5rem;
        /*margin-top: 2rem;*/
        margin-left: 30rem;
        .el-tabs{
          .el-tabs__content{
            visibility: hidden;
          }
          #tab-first{
            .el-tabs__item{
              font-size: 18px;
              margin-bottom: 0;
            }
          }


        }
        .tab_style{
          .el-tabs__nav-wrap::after{
            background-color: #F5F8FA;
          }
        }

      }
      .exit {
        float: right;
        margin-top: 10px;
        margin-right: 30px;
      }
    }
    .first_wrap{
      margin-top:4.5rem;
      width: 100%;
      height: 88%;
      /*overflow: scroll;*/
      /*height:500px ;*/
      background: #F5F8FA;

    }

  }

  .right {
    float: right;
  }

</style>
