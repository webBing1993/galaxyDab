<template>
  <div style="height:100%">
    <el-header style='line-height: 60px'>
      <div class="headerone">
        <span style="margin-left:15px;font-weight:600;font-size:21px">生态酒店总控平台</span>
        <span style="flex:3">
          <router-link to="/two">首页</router-link>
          <router-link to="/one">硬件管理</router-link>
         </span>
        <span style="flex:1">您好！jie <i>退出</i></span>
      </div>
    </el-header>

    <el-container style="height:100%;padding-bottom:0px; border: 1px solid #eee">
      <router-view></router-view>
    </el-container>

  </div>
</template>

<script>

  export default {}
</script>

<style>
  body,html{
    margin: 0px;
    color: #5a5e66;
    font-weight: 500;
    height: 100%
  }
  .el-container{
    padding-bottom:0px;
    background-color: #eee;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }


  a {
    color: #42b983;
  }
  .headerone{display: flex;width: 100%;text-align: center}
  /*.headerone>span{flex:1;}*/
</style>
