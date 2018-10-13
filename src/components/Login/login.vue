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
      loginToSystem() {
        this.loginIN({
          account: this.username,
          password: this.password,
          onsuccess: body => {
            this.$message({
              type: 'success',
              message: '登录成功!'
            });
            this.goto('/hotelOrg')
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
