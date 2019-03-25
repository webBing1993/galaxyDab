<template>

  <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
    <el-breadcrumb-item :to="{ path: '/device/run' }">运行设备</el-breadcrumb-item>

  </el-breadcrumb>

</template>
<script>
  export default {
    props:['theheaderone'],
    data () {
      return {

      }
    },
    mounted: function () {
      console.log(this.theheaderone)
    }
  }
</script>
<style>
  .oheader{
    text-align: left;
    font-size: 12px;
    height: 30px;
    margin-bottom:5px;
    border-bottom: 1px solid #eee;
  }
  .oheader_span{
    font-size:17px;
    font-weight: 600;
  }
</style>
