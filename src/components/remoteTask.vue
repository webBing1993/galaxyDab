<template id="aaa">
  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">

      <span class="oheader_span">远程列表</span>
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
        <router-link to="/newRemoteTask">
          <el-button style="float: right"  type="primary" size="small">新建</el-button>
        </router-link>
        <el-button class="obutton1" type="primary" size="small" @click="dialogFormVisible = true">筛选</el-button>
        <!-- <el-input placeholder="请输入内容" @keyup.enter.native="show($event)" style="width: 200px;float:right;margin-right: 10px" size="small" prefix-icon="el-icon-search" v-model="input21"></el-input>
          -->
        <el-dialog title="筛选条件" :visible.sync="dialogFormVisible" style="overflow: auto;">
          <liste :remoteTask='remoteTask' @ievent = "ievent"></liste>
        </el-dialog>
      </div>
      <template>
        <el-table :data="tableData3" style="width: 100%" v-loading="loading" stripe element-loading-text="加载中" :header-row-style="rowClass">
          <el-table-column prop="planTitle" label="任务标题" width="180"></el-table-column>
          <el-table-column prop="planType" label="任务类型" width="180"></el-table-column>
          <el-table-column prop="executeTime" label="执行时间"></el-table-column>
          <el-table-column prop="devType" label="执行进度"></el-table-column>
          <el-table-column  label="任务状态">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.planStatus' >{{i.stop}}</span>
              <span v-else>{{i.enable}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="执行结果"></el-table-column>
          <el-table-column prop="updateTime" label="最近操作时间"></el-table-column>
          <el-table-column prop="optionUserName" label="操作人"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.planStatus' @click='enable(scope.row.planId,scope.$index)' class="state">{{i.enable}}</span>
              <span v-else class="state" @click="stop(scope.row.planId,scope.$index)">{{i.stop}}</span>
              <span class="toempty_span">|</span>
              <span class="state" @click="bangding(scope.row.planId)">查看详情</span>
              <span class="toempty_span">|</span>
              <span class="state" @click="del(scope.row.planId,scope.$index)">删除</span>
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
            :page-count="total">
          </el-pagination>
        </div>
      </template>

    </el-main>
  </el-container>
</template>

<script>
  import liste from './remotetaskwindow.vue'
  import planlisturl from '../common.js'
  export default {
    components: {
      liste
    },
    data () {
      return {
        dialogFormVisible:false,
        tableData3: [],
        input21: '',
        page: 1,
        num: 10,
        loading: false,
        total: 1,
        remoteTask:'',
        nums: 0,
        n:2,
        search: 1,
        planlistbtn:'',
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
      enable: function (val,index) {
        this.loading=true
        let startTask=planlisturl.url().startTask;
        this.$http.get(startTask,
          {
            params: {
              planId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData3[index].planStatus=0
            this.$message.success(response.data.msg)
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      },
      stop: function (val,index) {
        this.loading=true
        let stopTask=planlisturl.url().stopTask;
        this.$http.get(stopTask,
          {
            params: {
              planId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData3[index].planStatus=1
            this.$message.success(response.data.msg)
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      },
      //删除
      del: function (val,index) {
        this.loading=true
        let deletePlan=planlisturl.url().deletePlan
        this.$http.get(deletePlan,
          {
            params: {
              planId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData3.splice(index, 1)
            this.$message.success(response.data.msg)
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      },
      //查看详情
      bangding (val) {
        this.$router.push({name:'remoteTaskdatails',params:{val: val } })
      },
      ievent (data,val1,n,nums,add1) {
        this.dialogFormVisible=false
        this.total=val1
        this.n=1
        this.add2=add1
        this.tableData3=data
        this.nums=nums
      },
      //筛选
      handleSizeChange (val) {
        this.tableData3=this.tableData3.splice(0,0)
        let planlistUrl=planlisturl.url().planlist
        let page=this.page
        let num=val
        this.$http.get(planlistUrl,
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
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData3=list
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      handleCurrentChange(val) {
        this.loading=true
        this.tableData3=this.tableData3.splice(0,0)
        let page=val
        let num=this.num
        if(this.n==2){
          this.planlistbtn=planlisturl.url().planlist
        }else{
          this.planlistbtn=planlisturl.url().planlistsearch
        }
        this.$http.get(this.planlistbtn,
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
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total= Math.ceil(nums/num)*num
            }
            this.tableData3=list
          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      }
    },
    beforeMount: function () {
      this.loading=true
    },
    mounted: function () {
      let planlist=planlisturl.url().planlist
      let page=this.page
      let num=this.num
      this.loading=true
      //传给弹窗的url
      this.remoteTask=planlisturl.url().planlistsearch
      this.$http.get(planlist,
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
          var data=response.data.data;
          var list=data.list
          var listlength=list.length
          this.nums=data.nums
          var nums=data.nums
          if(nums%num==0){
            this.total=(nums/num)*num
          }else{
            this.total=Math.ceil(nums/num)*num
          }
          this.tableData3=list
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
  /*.cell{text-align: center}*/
</style>
