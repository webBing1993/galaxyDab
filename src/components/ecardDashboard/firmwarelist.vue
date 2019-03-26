<template id="aaa">
  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">

      <span class="oheader_span">固件列表</span>
    </el-header>
    <el-main class="ocontainer">
      <div class="opagination1">
        <el-pagination
          style="width: 200px;float: left;"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-size='num'
          :total="nums"
          :page-count="total">
        </el-pagination>
        <router-link to="/firmwareup">
          <el-button style="float: right"  type="primary" size="small">上传固件</el-button>
        </router-link>
        <el-button class="obutton1" type="primary" size="small" @click="filter">筛选</el-button>
        <el-select v-model="deviceTypeList1" placeholder="请选择" class="oselect1" size="small">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.name"
            :value="item.type">
          </el-option>
        </el-select>
        <el-input placeholder="请输入内容" class="oinput1" size="small" prefix-icon="el-icon-search" v-model="deviceTypeList2"></el-input>

      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe element-loading-text="加载中" :header-row-style="rowClass">
          <el-table-column prop="firmwareVersion" label="固件版本" width="180"></el-table-column>
          <el-table-column prop="firmwareDescribe" label="固件描述" width="180"></el-table-column>
          <!--<el-table-column prop="firmwareHash" label="MD5值"></el-table-column>-->
          <el-table-column prop="devTypeStr" label="使用设备类型"></el-table-column>
          <el-table-column  label="固件状态">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status' >{{i.stop}}</span>
              <span v-else>{{i.enable}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadTime" label="上传时间"></el-table-column>
          <el-table-column prop="uploadUserName" label="上传人"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status' @click='enableUser(scope.row.deviceId,scope.$index)' class="state">{{i.enable}}</span>
              <span v-else class="state" @click="stopUser(scope.row.deviceId,scope.$index)">{{i.stop}}</span>
              <!--<span class="toempty_span">|</span>-->
              <!--<span style="color:#16D032" >编辑</span>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="clear:both">
          <span class="demonstration"></span>
          <el-pagination
            style="margin-top:15px"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size='num'
            :total="nums"
            :page-count="total"
          >
          </el-pagination>
        </div>
      </template>
      <el-dialog title="绑定企业微信" :visible.sync="dialogFormVisible" style="overflow: auto;" width="20%">
        <div id="qrcode" ref="qq"></div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import firmwarelisturl from '../../common.js'
  export default {
    data () {
      return {
        dialogFormVisible:false,
        tableData: [],
        input21: '',
        page: 1,
        num: 10,
        loading: false,
        total: 0,
        nums: 0,
        n:2,
        search: 1,
        options:[],
        deviceTypeList1:'',
        deviceTypeList2:'',
        state: [
          {
            enable: '启用',
            stop: '停用'
          }
        ]
      }
    },
    methods: {
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      //绑定企业微信
      bangding () {

      },
      //启用禁用
      enableUser: function (val,index) {
        this.loading=true
        var ableFirmware=firmwarelisturl.url().ableFirmware
        this.$http.get(ableFirmware,
          {
            params: {
              id: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData[index].status=0
            this.$message.success('停用成功')
            this.loading=false
          }else{
            this.$message.error('停用失败')
          }
        }, (response) => {
        })
      },
      stopUser: function (val,index) {
        this.loading=true
        var unableFirmware=firmwarelisturl.url().unableFirmware
        this.$http.get(unableFirmware,
          {
            params: {
              id: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData[index].status=1
            this.$message.success('启动成功')
            this.loading=false
          }else{
            this.$message.error('停用失败')
          }
        }, (response) => {
        })
      },
      //筛选
      filter () {
        var deviceTypeList1 = this.deviceTypeList1
        var deviceTypeList2 = this.deviceTypeList2
        var searchfirmware=firmwarelisturl.url().searchfirmware
        var page = this.page
        var num = this.num
        this.$http.post(searchfirmware,
          {
            firmwareVersion: deviceTypeList2,
            devType: deviceTypeList1
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.loading=false
            this.n=1
            let data=response.data.data
            this.nums=data.nums
            let list=data.list
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total= Math.ceil(nums/num)*num
            }
            this.tableData=list
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },

      handleSizeChange(val) {
        this.tableData=this.tableData.splice(0,0)
        var firmwarelist=firmwarelisturl.url().firmwarelist
        var deviceTypeList1 = this.deviceTypeList1
        var deviceTypeList2 = this.deviceTypeList2
        var page=this.page
        var num=val
        if(this.n==2){
          this.$http.get(firmwarelist,
            {
              params: {
                page: page,
                num: num
              }
            },
            {
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              let data=response.data.data
              let list=data.list
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              this.tableData=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })
        }else {
          var searchfirmware=firmwarelisturl.url().searchfirmware
          this.$http.post(searchfirmware,
            {
              firmwareVersion: deviceTypeList2,
              devType: deviceTypeList1
            },
            {
              params: {page: page,num: num},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              let data=response.data.data
              this.nums=data.nums
              let list=data.list
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              this.tableData=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })
        }
      },
      handleCurrentChange(val) {
        this.loading=true
        let firmwarelist=firmwarelisturl.url().firmwarelist
        this.tableData=this.tableData.splice(0,0)
        var deviceTypeList1 = this.deviceTypeList1
        var deviceTypeList2 = this.deviceTypeList2
        let page=val
        let num=this.num
        if(this.n==2){
          this.$http.get(firmwarelist,
            {
              params: {
                page: page,
                num: num
              }
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              let data=response.data.data
              let list=data.list
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              this.tableData=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })
        }else {
          var searchfirmware=firmwarelisturl.url().searchfirmware
          this.tableData=this.tableData.splice(0,0)
          let page=val
          let num=this.num
          this.$http.post(searchfirmware,
            {
              firmwareVersion: deviceTypeList2,
              devType: deviceTypeList1
            },
            {
              params: {page: page,num: num},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              this.n=1
              let data=response.data.data
              this.nums=data.nums
              let list=data.list
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              this.tableData=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })

        }
      },
      del: function (val,index) {

      }
    },
    beforeMount: function () {
      this.loading=true
    },
    mounted: function () {
      //固件列表
      let firmwarelist=firmwarelisturl.url().firmwarelist
      let page=this.page
      let num=this.num
      this.loading=true
      this.$http.get(firmwarelist,
        {
          params: {
            page: page,
            num: num
          }
        },
        {
          headers: {},
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          console.log(response.data.data)
          let data=response.data.data;
          let list=data.list
          this.nums=data.nums
          let nums=data.nums
          if(nums%num==0){
            this.total=(nums/num)*num
          }else{
            this.total=Math.ceil(nums/num)*num
          }
          this.tableData=list

        }else{
          this.loading=false
          this.$message.error(response.data.msg)
        }
      }, (response) => {
        this.$message('请求出错')
      })
      //固件下拉
      let deviceTypeList=firmwarelisturl.url().deviceTypeList
      this.$http.get(deviceTypeList,
        {
          headers: {},
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          this.options=response.data.data
        }else{
          this.loading=false
          this.$message.error(response.data.msg)
        }
      }, (response) => {
        this.$message('请求出错')
      })
    }
  }
</script>
<style>
  .el-form-item{margin-bottom: 0px}
  .state{cursor:pointer;color:#16D032}
  .ocontainer{
    background-color:#fff
  }
  .oselect1{
    width: 200px;
    float:right;
    margin-right: 10px
  }
  .oinput1{
    width: 200px;
    float:right;
    margin-right: 10px
  }
  /*.cell{text-align: center}*/
</style>
