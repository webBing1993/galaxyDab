<!--login-->
<template>
  <div class="container">
    <div class="login">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="用户名：">
          <el-input v-model="username" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="password" type="password" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="loginToSystem">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    components: {
    },
    name: 'hotelInfo',

    data() {
      return {
        username: '',
        password: '',
        authorityJudge:[],
        userPermissionsJudge:{},
        configPermissionsJudge:{}
      }
    },
    computed: {
      ...mapState({}),

    },
    methods: {
      ...mapActions([
        'loginIN',
        'goto',
      ]),
      ...mapMutations ([
        'geteUserId',
      ]),
      loginToSystem() {
        this.loginIN({
          account: this.username,
          password: this.password,
          onsuccess: body => {
            // console.log('ceshizhang',body.data.eUserId)
            this.geteUserId(body.data.eUserId)
            this.$store.commit("getUsernamePermissions", this.username);
            this.$store.commit("getPasswordPermissions", this.password);
            if((!body.data.permissions) || (body.data.permissions.length==0)){
                this.$message({
                  type: 'error',
                  message: '没有权限!',
                  duration:1000,
                  showClose: true,
                });
                return false;
              }


            this.authorityJudge = body.data.permissions[0].subPermissions
            console.log('查看权限22222',this.authorityJudge)
            if(this.authorityJudge.length == 1){
              console.log('tag',this.authorityJudge[0].tag)
              if(this.authorityJudge[0].tag=='dab_user'){
                console.log(11111)
                //动态设置路由
                let path;
                if((this.authorityJudge[0].subPermissions[0].description == '')||(this.authorityJudge[0].subPermissions[0].description == null)){
                  path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description
                }
                else{
                  path = this.authorityJudge[0].subPermissions[0].description
                }
                this.userPermissionsJudge = this.authorityJudge[0]
                this.$store.commit("getUserPermissions", this.userPermissionsJudge);
                // this.goto('/hotelOrg')
                console.log('B端用户管理',path)
                this.$router.push({path:path})

              }
              else{
                this.userPermissionsJudge = ''
                this.$store.commit("getUserPermissions", this.userPermissionsJudge);
              }
              if(this.authorityJudge[0].tag=='dab_config'){
                console.log(22222222)
                //动态路由设置
                 let path;
                 path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description
                this.configPermissionsJudge =  this.authorityJudge[0]
                this.$store.commit("getConfigPermissions", this.configPermissionsJudge);
                 console.log('配置管理',path)
                this.$router.push({path:path})
              }
              else{
                this.configPermissionsJudge =  ''
                this.$store.commit("getConfigPermissions", this.configPermissionsJudge);
              }
            }
            if(this.authorityJudge.length == 2){
              console.log(333333)
              //动态路由配置
              let path;
              if((this.authorityJudge[0].subPermissions[0].description == '') || (this.authorityJudge[0].subPermissions[0].description == null)){
                path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description
              }
              else{
                path = this.authorityJudge[0].subPermissions[0].description
              }
              console.log('全部',path)
              this.$router.push({path:path})
              for(var i = 0; i< this.authorityJudge.length;i++){
                if(this.authorityJudge[i].tag=='dab_user'){
                  this.userPermissionsJudge = this.authorityJudge[i]
                  this.$store.commit("getUserPermissions", this.userPermissionsJudge);

                }
                else if(this.authorityJudge[i].tag=='dab_config'){
                  this.configPermissionsJudge =  this.authorityJudge[i]
                  this.$store.commit("getConfigPermissions", this.configPermissionsJudge);

                }

              }
            }

            this.$message({
              type: 'success',
              message: '登录成功!',
              duration:1000,
              showClose: true,
            });
            // this.goto('/hotelOrg')

          },
          onfail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });
          }
        })
      },
    },
    mounted() {

    },
    watch: {

    }
  }
</script>

<style lang="less" scoped>
    .container{
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      .login{
        width: 50%;
        margin-bottom: 50px;
        /deep/.el-button{
          width: 100%;
        }

      }
    }
</style>
