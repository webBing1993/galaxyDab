<!--施工人员-->
<template id="aaa">
  <el-container class="ocontainer" style="background-color:#fff">

    <el-header class="oheader" style="height: 30px;">
      <span class="oheader_span">施工任务</span>
    </el-header>
    <el-main class="ocontainer">
      <div class="opagination">
        <el-pagination
          style="width: 200px;float: left;"
          background
          layout="total,sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size='num'
          :total="nums"
          :page-count="total">
        </el-pagination>
        <router-link to="/constructionTask"><el-button style="float:right;margin-left: 15px;" type="primary" size="small">新建</el-button></router-link>

        <el-button style="float: right" type="primary" size="small" @click="dialogFormVisible">筛选</el-button>
        <el-input placeholder="请输入任务名称" class="oinput1" size="small" prefix-icon="el-icon-search" v-model="deviceTypeList2"></el-input>

      </div>
      <template v-loading='loading'>
        <el-table ref="multipleTable" :data="tableData" stripe tooltip-effect="dark"  style="width: 100%;" :header-row-style="rowClass" >
          <el-table-column  label="任务id" prop="taskId" width="120"></el-table-column>
          <el-table-column  prop="workerName" label="指定人员"  width="120"></el-table-column>
          <el-table-column  prop="taskTitle"  label="任务名称"></el-table-column>
          <el-table-column  prop="hotelName"  label="酒店名称"></el-table-column>
          <el-table-column  prop="status" width="100" label="状态">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span  v-if='scope.row.status==1'>{{i.enable}}</span>
              <span  v-if='scope.row.status==2'>{{i.overflow}}</span>
              <span  v-if='scope.row.status==4' >{{i.stop}}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="" width="200" label="操作">
            <template slot-scope="scope" >
                <span v-for='(i,j) in state'>
                  <span class="state cursor" v-if='scope.row.status==1' @click="recovery(scope.row.taskId,4,scope.$index)">{{i.stop}}</span>
                  <span class="state cursor" v-if="scope.row.status==4" @click="recovery(scope.row.taskId,1,scope.$index)">{{i.recovery}}</span>
                </span>
              <router-link to="/construnctionEdit">
                <!--<router-link :to="'/construnctionEdit/'+'rowId'">-->
                <span class="state cursor" @click="edit(scope.row.taskId,scope.row.status)" >编辑</span>
              </router-link>
              <span class="state cursor" @click="removeConstrList(scope.row.taskId)" >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-main>
  </el-container>
</template>
<router-view></router-view>
<script>
  import liste from './alertui.vue'
  // import theheader from './header.vue'
  import rolelistUrl from '../common.js'

  export default {
    components: {
      liste,
    },
    data () {
      return {
        loading:false,
        tableData: [],
        page: 1,
        num: 10,
        nums: 0,
        total: 1,
        options:[],
        deviceTypeList1:'',
        deviceTypeList2:'',
        statu:'',
        state: [
          {
            enable: '进行中',
            stop: '冻结',
            recovery:'恢复',
            overflow:'已完成'
          }
        ]

      }
    },
    computed: {
      // rowId(){
      //   return this.$route.params.rowId
      // }
    },
    methods: {
      dialogFormVisible(){
        // 筛选数据
        let screenListUrl = rolelistUrl.url().screenList;
        // this.loading = true
        this.$http.post(screenListUrl,
          {
            "s":this.deviceTypeList2
          },
          {
            params:{
              "page":this.page,
              "num":this.num,
            },
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            // console.log(response.data.data.nums)
            this.nums = response.data.data.nums
            let data = response.data.data
            this.tableData = data.list
            // console.log(data.list)
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      //初始列表数据
      initialList(page, num){
        let initialListUrl = rolelistUrl.url().initialList;
        this.loading = true
        this.$http.get(initialListUrl,
          {
            params:{
              page:page,
              num:num
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.nums = data.nums
            if( this.nums % this.num == 0 ){
              this.total=(this.nums/this.num)*this.num
            }else{
              this.total=Math.ceil(this.nums/this.num)*this.num
            }
            this.tableData = data.list
            this.loading = false
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.num = val
        this.initialList(this.page,this.num);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val
        this.initialList(this.page, this.num);
      },
      //状态修改
      recovery(id, status, index){
        if(status == 4){
          this.statu = 4
        }else {
          this.statu = 1
        }
        let taskStatusUrl = rolelistUrl.url().taskStatus;
        this.loading = true
        // console.log(id)
        this.$http.post(taskStatusUrl,
          {
            "id":id,
            "status":this.statu   //1进行中 2已完成 3已延期 4已冻结 5已审核
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData[index].status = status
            this.$message.success('操作成功')
            this.loading=false
            this.initialList(this.page,this.num);
          }else{
            this.$message.error('操作失败')
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //编辑
      edit(id,status){
        sessionStorage.setItem("taskId", id);
        sessionStorage.setItem("status", status);
      },
      //删除任务
      removeConstrList(theid,index){
        this.$confirm('是否要删除该任务', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除list-调取接口
          let deleteTaskUrl=rolelistUrl.url().deleteTask;
          this.loading=true
          this.$http.post(deleteTaskUrl,
            {
              taskId:theid
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              this.$message.success('删除成功')
              this.initialList(this.page,this.num);
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    },
    mounted: function () {
      this.initialList(this.page,this.num);
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
  .oinput1{
    width: 200px;
    float:right;
    margin-right: 10px
  }
  .state{
    color: #16D032;
  }
  /*.cell{text-align: center}*/
</style>
