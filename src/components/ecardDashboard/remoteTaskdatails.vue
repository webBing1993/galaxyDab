<template>
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/remoteTask' }">远程任务</el-breadcrumb-item>
        <el-breadcrumb-item>远程任务详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form"  label-width="100px">
        <el-form-item label="任务名称" prop="name" class="ocontainer_item_label">
          <span>{{planTitle}}</span>
        </el-form-item>
        <el-form-item label="任务类型" prop="password" class="ocontainer_item_label">
          <span size='small' class="ocontainer_item_input">{{planType}}</span>
        </el-form-item>
        <el-form-item label="任务状态" class="ocontainer_item_label">
          <span size='small' class="ocontainer_item_input" >{{planStatus}}</span>
        </el-form-item>
        <el-form-item label="任务时间" class="ocontainer_item_label">
          <span size='small' class="ocontainer_item_input">{{executeDate}}</span>
        </el-form-item>
      </el-form>
      <template>
        <el-table ref="multipleTable" :data="tableData3" stripe tooltip-effect="dark"  style="width: 100%;" :header-row-style="rowClass" v-loading='loading'>
          <el-table-column  label="设备mac地址" prop="mac" width="120"></el-table-column>
          <el-table-column  prop="wifiSsid" label="wifi名字"  width="120" ></el-table-column>
          <el-table-column  prop="hardwareVersion"  label="固件版本号" ></el-table-column>
          <el-table-column  prop="productionBatch"  label="生产批次"></el-table-column>
          <el-table-column  prop="devType"  label="设备类型" ></el-table-column>
          <el-table-column  prop="devElectricity"  label="电池余量"></el-table-column>
          <el-table-column  prop="devStatus"  label="设备状态" ></el-table-column>
          <el-table-column  prop="deviceAttributes"  label="设备属性"></el-table-column>
        </el-table>

        <div class="block" style="clear:both">
          <span class="demonstration"></span>
        </div>
      </template>
    </el-main>
  </el-container>
</template>

<script>
  import plandatailsUrl from '../../common.js'
  export default {
    data () {
      return {
        loading: false,
        planid: '',
        planTitle:'',
        planType: 0,
        planStatus: 0,
        executeDate: null,
        tableData3: []
      }
    },
    beforeMount:function() {
      this.planid=this.$route.params.val
    },
    methods: {
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      }
    },
    computed: {


    },
    mounted: function () {
      var planId=this.planid
      var plandatails=plandatailsUrl.url().plandatails
      this.loading = true
      this.$http.get(plandatails,
        {
          params: {
            planId: planId
          }
        },
        {
          headers: {},
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          var data = response.data.data
          this.planTitle=data.planTitle
          this.tableData3=data.devList
        }
      }, (response) => {
        this.$message('请求出错')
      })
    }
  }
</script>

<style>
  .spancolor {
    color: #929292;
  }
  .el-upload-list {
    height: 100px;
    width: 20%;
    overflow: auto;
    float: left;
    position: absolute;
    left: 138px;
    top: 0px;
  }
  .el-upload-list__item:first-child{
    margin-top:0px
  }
  .ocontainer{
    background-color:#fff
  }
  .ocontainer_item_input{
    width:350px
  }
  .ocontainer_item_label{
    margin-bottom: 14px
  }
  /*.cell{text-align: center}*/
</style>
