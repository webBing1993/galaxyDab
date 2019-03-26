<template id="aaa">
  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">

      <span class="oheader_span">角色列表</span>
    </el-header>

    <el-main class="ocontainer">
      <div class="opagination">
        <div class="block" style="clear:both">
          <span class="demonstration"></span>
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
        </div>
        <router-link to="/newrole"><el-button style="float: right" type="primary" size="small">新建角色</el-button></router-link>
        <el-input placeholder="请输入内容" @keyup.enter.native="show($event)" class="opagination_input" size="small" prefix-icon="el-icon-search" v-model="input21"></el-input>

      </div>

      <template>
        <el-table :data="tableData" style="width: 100%" v-loading='loading' stripe :header-row-style="rowClass">
          <el-table-column prop="groupName" label="角色名字" width="180"></el-table-column>
          <el-table-column prop="groupDescribe" label="角色描述" width="180"></el-table-column>
          <el-table-column prop="powerName" label="角色权限" width="180"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status'>{{i.stop}}</span>
              <span v-else >{{i.enable}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最近操作时间"></el-table-column>
          <el-table-column prop="optionUser" label="操作人"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status' @click='enableUser(scope.row.id,scope.$index)' class="state">{{i.enable}}</span>
              <span v-else class="state" @click="stopUser(scope.row.id,scope.$index)">{{i.stop}}</span>
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
  import rolelistUrl from '../../common.js'
  export default {
    data () {
      return {
        tableData: [],
        input21: '',
        page: 1,
        num: 10,
        total:1,
        search: 1,
        loading: 'false',
        nums: 0,
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
      show: function (ev) {
        if(ev.keyCode==13){
          let searchrole=rolelistUrl.url().searchrole
          this.tableData=this.tableData.splice(0,0)
          let page=this.page
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.search=2
          this.$http.post(searchrole,
            {
              s: '[{"condition":"Contain", "field":"group_name", "data":"'+nickname+'"}]'
            },
            {
              params: {page: page,num: num},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              let data=response.data.data;
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              this.nums=nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData.push(list[i])
              // }
              this.tableData=list
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }
      },
      enableUser: function (val,index) {
        this.loading=true
        let enablegroupId=rolelistUrl.url().enablegroupId;
        this.$http.get(enablegroupId,
          {
            params: {
              groupId: val
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
        let stopgroupId=rolelistUrl.url().stopgroupId;
        this.$http.get(stopgroupId,
          {
            params: {
              groupId: val
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
      handleSizeChange (val) {
        this.tableData=this.tableData.splice(0,0)
        let roleUrl=rolelistUrl.url().rolelist;
        let page=this.page
        let num=val
        this.loading=true
        var search=this.search
        if(search==1){
          this.$http.get(roleUrl,
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
            this.loading=false
            if (response.data.code==0) {
              let data=response.data.data
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData.push(list[i])
              // }
              this.tableData=list
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }else {
          let searchrole=rolelistUrl.url().searchrole
          this.tableData=this.tableData.splice(0,0)
          let page=this.page
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.$http.post(searchrole,
            {
              s: '[{"condition":"Contain", "field":"groupName", "data":"'+nickname+'"}]'
            },
            {
              params: {page: page,num: num},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              let data=response.data.data;
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              this.nums=nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData.push(list[i])
              // }
              this.tableData=list
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }
      },
      handleCurrentChange(val) {
        let roleUrl=rolelistUrl.url().rolelist;
        this.tableData=this.tableData.splice(0,0)
        let page=val
        let num=this.num
        var search=this.search
        if(search==1){
          this.$http.get(roleUrl,
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
              let data=response.data.data;
              let list=data.list
              // list=list.splice(0,num)
              let listlength=list.length
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData.push(list[i])
              //   this.loading=false
              // }
              this.tableData=list
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
          })
        }else {
          let searchrole=rolelistUrl.url().searchrole
          this.tableData=this.tableData.splice(0,0)
          let page=val
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.$http.post(searchrole,
            {
              s: '[{"condition":"Contain", "field":"groupName", "data":"'+nickname+'"}]'
            },
            {
              params: {page: page,num: num},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              let data=response.data.data;
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              this.nums=nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData.push(list[i])
              // }
              this.tableData=list
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }
      }
    },
    mounted: function () {
      let roleUrl=rolelistUrl.url().rolelist;
      let page=this.page
      let num=this.num
      this.loading=true
      this.$http.get(roleUrl,
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
          let data=response.data.data
          let list=data.list
          let listlength=list.length
          let nums=data.nums
          this.nums=nums
          if(nums%num==0){
            this.total=(nums/num)*num
          }else{
            this.total=Math.ceil(nums/num)*num
          }
          this.tableData=list
          this.loading=false
        }else{
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
  .opagination_input{
    width: 200px;
    float:right;
    margin-right: 10px
  }
  /*.cell{text-align: center}*/
</style>
