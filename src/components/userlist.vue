<template id="aaa">
  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">

      <span class="oheader_span">用户列表</span>
    </el-header>
    <el-main class="ocontainer">
      <div class="opagination">
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
        <router-link to="/newuser"><el-button style="float: right" type="primary" size="small">新建用户</el-button></router-link>
        <el-input placeholder="请输入内容" @keyup.enter.native="show($event)" class="containerInput" size="small" prefix-icon="el-icon-search" v-model="input21"></el-input>

      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe element-loading-text="加载中" :header-row-style="rowClass">
          <el-table-column prop="nickname" label="用户名字" width="180"></el-table-column>
          <el-table-column prop="groupName" label="角色" width="180"></el-table-column>
          <el-table-column prop="openid" label="企业微信关联"></el-table-column>
          <el-table-column  label="状态">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status' >{{i.stop}}</span>
              <span v-else>{{i.enable}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="optionTime" label="最近操作时间"></el-table-column>
          <el-table-column prop="optionNickname" label="操作人"></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope" v-for='(i,j) in state'>
              <span v-if='scope.row.status' @click='enableUser(scope.row.userId,scope.$index)' class="state">{{i.enable}}</span>
              <span v-else class="state" @click="stopUser(scope.row.userId,scope.$index)">{{i.stop}}</span>
              <span class="toempty_span">|</span><span class="state" @click="bangding(scope.row.userId)">绑定企业微信</span>
              <span class="toempty_span">|</span>
              <router-link :to="{name:'updatauser',params:{val: scope.row.userId,id:scope.row.nickname} }" style="color:#16D032">修改</router-link>
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
      <el-dialog title="绑定企业微信" :visible.sync="dialogFormVisible" style="overflow: auto;" width="20%">
        <div id="qrcode" ref="qq"></div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import userlist from '../common.js'
  import QRCode from 'qrcodejs2'
  export default {
    data () {
      return {
        dialogFormVisible:false,
        tableData: [],
        input21: '',
        page: 1,
        num: 10,
        loading: false,
        total: 1,
        nums: 0,
        search: 1,
        token: '',
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
      bangding (val) {
        this.dialogFormVisible=!this.dialogFormVisible
        var baseurl=userlist.url().baseurl1
        var buildBindAdminUserCode=userlist.url().buildBindAdminUserCode
        this.$nextTick(() => {
          var div = document.getElementById("qrcode")
          div.innerHTML = ""

        })
        this.$http.get(buildBindAdminUserCode,
          {
            params: {
              userId:val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.token = response.data.data
            var TOKEN=this.token
            var token=baseurl+'/ewechat.html#/backend/?id='+TOKEN
            var qrcode = new QRCode(document.getElementById("qrcode"), {
              text: token,
              width: 128,
              height: 128,
            });
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })


      },
      //筛选
      show: function (ev) {
        if(ev.keyCode==13){
          let searchUser=userlist.url().searchUser
          this.tableData=this.tableData.splice(0,0)
          let page=this.page
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.search=2
          this.$http.post(searchUser,
            {
              s: '[{"condition":"Contain", "field":"nickname", "data":"'+nickname+'"}]'
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
              for (let i=0; i<listlength; i++) {
                this.tableData.push(list[i])
              }
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }
      },
      handleSizeChange(val) {
        this.tableData=this.tableData.splice(0,0)
        let userlisturl=userlist.url().userlist;
        let page=this.page
        let num=val
        this.loading=true
        var search=this.search
        if(search==1){
          this.$http.get(userlisturl,
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
            this.$message('请求出错')
          })
        }else {
          let searchUser=userlist.url().searchUser
          this.tableData=this.tableData.splice(0,0)
          let page=this.page
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.$http.post(searchUser,
            {
              s: '[{"condition":"Contain", "field":"nickname", "data":"'+nickname+'"}]'
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
        this.loading=true
        let userlisturl=userlist.url().userlist;
        this.tableData=this.tableData.splice(0,0)
        let page=val
        let num=this.num
        var search=this.search
        if(search==1){
          this.$http.get(userlisturl,
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
          let searchUser=userlist.url().searchUser
          this.tableData=this.tableData.splice(0,0)
          let page=val
          let num=this.num
          let nickname=this.input21
          this.loading=true
          this.$http.post(searchUser,
            {
              s: '[{"condition":"Contain", "field":"nickname", "data":"'+nickname+'"}]'
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
        let enableUser=userlist.url().enableUser;
        this.$http.get(enableUser,
          {
            params: {
              userId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData[index].status=0
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      },
      stopUser: function (val,index) {
        this.loading=true
        let stopUser=userlist.url().stopUser;
        this.$http.get(stopUser,
          {
            params: {
              userId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData[index].status=1
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      },
      del: function (val,index) {
        this.loading=true
        let delUser=userlist.url().delUser;
        this.$http.get(delUser,
          {
            params: {
              userId: val
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
        })
      }
    },
    beforeMount: function () {
      this.loading=true
    },
    mounted: function () {

      let userlisturl=userlist.url().userlist
      let page=this.page
      let num=this.num
      this.loading=true
      this.$http.get(userlisturl,
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
          //   this.loading=false
          // }
          this.tableData=list
          this.loading=false
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

  .state{cursor:pointer;color:#16D032}
  .ocontainer{
    background-color:#fff
  }
  .containerInput{
    width: 200px;
    float:right;
    margin-right: 10px
  }
  /*.cell{text-align: center}*/
</style>
