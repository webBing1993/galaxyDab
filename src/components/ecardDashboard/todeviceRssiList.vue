<template id="aaa">

  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="routername">{{name}}</el-breadcrumb-item>
        <el-breadcrumb-item>查看参数</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="ocontainer">
      <template>
        <el-table ref="multipleTable" :data="tableData" stripe tooltip-effect="dark"  style="width: 100%;" :header-row-style="rowClass">
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column  label="配置id" prop="id" width="120"></el-table-column>
          <el-table-column  prop="bluetoothName" label="蓝牙名字"  width="120" ></el-table-column>
          <el-table-column  prop="maxRssi"  label="信号强度阈值"></el-table-column>
          <el-table-column  prop="brand"  label="品牌" ></el-table-column>
          <el-table-column  prop="systemName"  label="系统（ios or android）"></el-table-column>
          <el-table-column  label="操作"  align=center>
            <template slot-scope="scope">
              <a class="cursor" @click="delRssi(scope.row.id,scope.$index)">删除rssi</a><span class="ospan_table">|</span>
              <router-link :to="{name:'updateRssiData',params:{val: mac,id: scope.row.id,name:thename } }" class="cursor">修改rssi</router-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <router-link :to="{name:'deviceRssiList',params:{val: mac,name:thename} }" style="color:#16D032;">
        <el-button type="primary" size='small' style="margin:20px">添加rssi</el-button>
      </router-link>

    </el-main>

  </el-container>
</template>
<script>
  import todeviceRssiListUrl from '../../common.js'
  export default {

    data () {
      return {
        tableData:[],
        mac:'',
        deviceRssiId:'',
        name:'',
        routername:{},
        thename:0
      }
    },
    methods: {
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      delRssi(id,index){
        var mac=this.mac
        var deleteRssiData1=todeviceRssiListUrl.url().deleteRssiData
        this.$http.post(deleteRssiData1,
          {
            id:id
          },
          {
            params: {
              mac:mac
            },
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.$message.success(response.data.msg)
            this.tableData.splice(index,1)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      }
    },
    mounted: function () {
      this.mac=this.$route.params.val
      var _name=this.$route.params.name
      this.thename=_name
      console.log(_name)
      if(_name==1){
        this.name='运行设备'
        this.routername={path: '/device/run'}
      }else{
        this.name='在库设备'
        this.routername={path: '/device/notrun'}
      }
      var mac=this.mac
      var deviceRssiList1=todeviceRssiListUrl.url().deviceRssiList
      this.$http.get(deviceRssiList1,
        {
          params: {
            mac:mac
          }
        },
        {
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          var data=response.data.data
          this.tableData=data
        }
      }, (response) => {
        this.$message('请求出错')
      })
    }
  }
</script>

<style>
  .el-dialog__body{
    overflow:auto
  }

  .ospan_table{
    margin:0px 0px 0px 2px
  }
  .ocontainer{
    background-color:#fff
  }
  /*.cell{text-align: center}*/
</style>
