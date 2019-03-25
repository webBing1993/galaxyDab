<!--施工任务-->
<template>
  <el-container class="ocontainer" style="background-color:#fff">
    <el-header class="oheader" style="height: 30px;">
      <span class="oheader_span">施工人员</span>
    </el-header>

    <el-container style="background-color:#fff" v-loading='loading' >
      <el-aside class="elaside" width="350px">
        <el-input placeholder="搜索组织名" size="small" prefix-icon="el-icon-search" style="width: 280px;margin:10px"  v-model="search"></el-input>
        <span class="tianjia" @click="add1(false,false)">+</span>
        <template>
          <el-table :data="searchData" style="width: 100%;padding-left: 10px" :highlight-current-row = 'true'  :show-header="false" @row-click="clickDisplay">
            <el-table-column prop="organizeName" label="施工组织" width="160" height="40px" lineheight="40px"></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <a class="cursor" @click="add1(scope.row.id,scope.$index,scope.row.organizeName,scope.row.licenseNum)">编辑</a>
                <a class="cursor" @click="deldata(scope.row.id,scope.$index)">
                  <!--删除-->
                  <el-button type="text" @click="deldata">删除</el-button>
                </a>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="grouptitle" :visible.sync="dialogFormVisible1" width="40%" >
            <el-form :label-position="left" label-width="100px">
              <el-form-item label="组织名称" height="40px" lineheight="40px">
                <el-input style="width:36%;display: inline-block" maxlength="30" v-model="setContent" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="营业执照号">
                <el-input style="width:36%;display: inline-block" v-model="setBusiness" maxlength="30" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-button type="primary" size="small" @click="tosure(tosureval)">确定</el-button>
            </el-form>
          </el-dialog>
        </template>
      </el-aside>
      <el-main class="elmain">
        <el-input placeholder="搜索施工人员姓名或者手机号" size="small" prefix-icon="el-icon-search" style="width: 95%;margin:0 11px 20px 0px;"  v-model="search1"></el-input>
        <span class="tianjia" @click="add2(false,false)">+</span>
        <template>
          <el-table :data="searchData1" stripe tooltip-effect="dark" :header-row-style="rowClass" style="width: 100%">
            <el-table-column prop="id" label="用户ID" width="110" align=left></el-table-column>
            <el-table-column prop="nameCn"label="姓名"  align=left></el-table-column>
            <el-table-column prop="phone"label="手机号"  align=left></el-table-column>
            <el-table-column prop="status"label="状态"  align=left>
              <template slot-scope="scope" v-for='(i,j) in state'>
                <span  v-if='scope.row.status'>{{i.stop}}</span>
                <span class="" v-else >{{i.enable}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operate"label="操作"  align=left>
              <template slot-scope="scope" v-for='(i,j) in state'>
                <a v-if='scope.row.status' @click='enableUser(scope.row.id,scope.$index)' class="state cursor">{{i.enable}}</a>
                <a v-else class="state cursor" @click="stopUser(scope.row.id,scope.$index)">{{i.stop}}</a>
                <span @click="resetPassword(scope.row.password,scope.row.phone)" class="color032">修改密码</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="password" label="修改密码"  align=left>-->
            <!--<template slot-scope="scope">-->
            <!--<span @click="resetPassword(scope.row.password,scope.row.phone)" class="color032">修改密码</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </template>
        <el-dialog title="添加施工人员" :visible.sync="dialogFormVisible2" width="40%" height="40px" lineheight="40px">
          <el-form :label-position="left" label-width="100px">
            <el-form-item label="姓名">
              <el-input style="width:36%;display: inline-block" v-model="thename" maxlength="30" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input style="width:36%;display: inline-block" v-model="phone"  maxlength="11" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="所属组织">
              <el-input style="width:36%;display: inline-block" :disabled="true" v-model="affiliatedOrganization" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="tosure1(tosureval1)">确定</el-button>
          </el-form>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible3" height="40px" lineheight="40px" width="40%" >
          <el-form :label-position="left" label-width="130px">
            <el-form-item label="请输入手机号码">
              <el-input style="width:36%;display: inline-block" v-model="showPhone" readonly="true" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码">
              <el-input style="width:36%;display: inline-block" v-model="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="replayWord()">确定</el-button>
          </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import rolelistUrl from '../common.js'

  export default {
    data() {
      return {
        search:'',
        search1:'',
        theid:'',
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        loading:false,
        left:'left',
        setContent:'',
        setBusiness:'',
        tosureval:0,
        tosureval1:0,
        thename:'',
        phone:'',
        showPhone:'',
        password:'',
        affiliatedOrganization:'',
        tableData: [],
        tableData1: [],
        firstId:1,
        rowId:'',
        state: [
          {
            enable: '启用',
            stop: '停用'
          }
        ],
        grouptitle:'',
        typeCall:false
      }
    },
    computed: {
      searchData: function() {
        var search = this.search;
        if (search) {
          var _arr=this.tableData
          return _arr.filter(function(tableData) {
            return Object.keys(tableData).some(function(key) {
              if(String(tableData.organizeName).indexOf(search) > -1){
                return true
              }


            })
          })
        }
        return this.tableData
      },
      searchData1: function() {
        var search = this.search1;
        if (search) {
          var _arr=this.tableData1
          return _arr.filter(function(tableData1) {
            return Object.keys(tableData1).some(function(key) {
              if(String(tableData1.nameCn).indexOf(search) > -1||String(tableData1.phone).indexOf(search) > -1){
                return true
              }
            })
          })
        }
        return this.tableData1
      }
    },
    methods: {
      //表头背景
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      //删除组织
      deldata(theid,index){
        this.$confirm('删除组织会删除组织下的所有施工人员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除组-调取接口
          let deleteGroupUrl=rolelistUrl.url().deleteGroup;
          this.loading=true
          this.$http.post(deleteGroupUrl,
            {
              id:theid
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              this.init();
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
      //确定组织
      tosure(val){
        if(!this.setContent){
          this.$message.error('组织名称不能为空')
          return;
        }
        if(!this.setBusiness){
          this.$message.error('营业执照号不能为空')
          return;
        }
        if(val==0){
          //添加组织
          let addGroupUrl=rolelistUrl.url().addGroup;
          this.loading=true
          this.$http.post(addGroupUrl,
            {
              organizeName:this.setContent ,
              licenseNum: this.setBusiness
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.init();
              this.loading=false
            }else{
              this.loading=false
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })

          this.dialogFormVisible1=false
          return;
        }else {
          //编辑组织
          let updateOrganizeUrl=rolelistUrl.url().updateOrganize;
          this.loading=true
          this.$http.post(updateOrganizeUrl,
            {
              organizeName:this.setContent ,
              licenseNum: this.setBusiness,
              id:this.theid
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.init();
              this.loading=false
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
          this.dialogFormVisible1=false
        }

      },
      //确定人员
      tosure1(val){
        if(val==0){
          //添加施工人员
          // console.log(this.rowId)
          let addPersonUrl=rolelistUrl.url().addPerson;
          //每点击组织默认添加到第一个组织中

          if(!this.rowId){
            this.rowId = this.firstId
          }

          if(!this.thename){
            this.$message.error("姓名不能为空")
            return false;
          }
          //手机验证
          if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))){
            this.$message.error("请输入正确的手机号")
            return false;
          }
          this.loading=true
          this.$http.post(addPersonUrl,
            {
              nameCn: this.thename,
              phone: this.phone,
              buildId: this.rowId
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              // console.log(response.data.data)
              let data = response.data.data
              this.tableData1 = data
              this.initgetOrgAllPerson(this.rowId)
              this.loading=false
            }else{
              this.loading=false
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })

          this.dialogFormVisible2=false
          return;
        }
        //编辑
        this.dialogFormVisible2=false

      },
      //点击组织列表
      clickDisplay(row, column, cell, event){
        this.typeCall = true;
        let getOrgAllPersonUrl=rolelistUrl.url().getOrgAllPerson;
        this.affiliatedOrganization = row.organizeName
        this.rowId = row.id
        this.loading=true
        this.$http.post(getOrgAllPersonUrl,
          {
            nameCn: "", //nameCn属于模糊搜索字段，适用姓名和手机
            buildId: row.id //状态判断 如果为0则表示模糊搜索成员，不为0表示一个组织下所有成员
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            let data=response.data.data
            this.tableData1=data
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })


      },
      //添加组织
      add1(theid,index,name,licenseNum){
        this.tosureval=0
        // console.log(theid,index)
        if(!theid && !index){
          //添加
          this.dialogFormVisible1=true
          this.setContent = ''
          this.setBusiness = ''
          this.grouptitle = '添加组织'
          return;
        }
        //编辑
        this.tosureval=1
        this.dialogFormVisible1=true
        this.theid=theid
        this.grouptitle = '编辑组织'

        //编辑默认的信息
        this.setContent = name
        this.setBusiness = licenseNum

      },
      //添加人员
      add2(theid,index){
        this.thename = ''
        this.phone = ''
        this.tosureval=0
        if(!theid && !index){
          if(this.tableData.length == 0){
            this.$message.error("请添加施工组织")
            return false;
          }
          this.affiliatedOrganization = this.affiliatedOrganization =='' ? this.tableData[0].organizeName : this.affiliatedOrganization
          //添加
          this.dialogFormVisible2=true
          return;
        }
        //编辑
        this.tosureval=1
        this.dialogFormVisible2=true
        this.thename=theid

      },
      //组织成员初使数据
      initgetOrgAllPerson(id){
        let getOrgAllPersonUrl = rolelistUrl.url().getOrgAllPerson;
        this.loading = true
        this.$http.post(getOrgAllPersonUrl,
          {
            nameCn: "", //nameCn属于模糊搜索字段，适用姓名和手机
            buildId: id  //状态判断 如果为0则表示模糊搜索成员，不为0表示一个组织下所有成员
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.tableData1 = data
            this.loading = false
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //组织列表数据
      init(a){
        let searchOrganizeGroupUrl=rolelistUrl.url().searchOrganizeGroup;
        this.loading=true
        if(!a){
          a=''
        }
        this.$http.post(searchOrganizeGroupUrl,
          {
            organizeName: a
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.loading=false
            let data=response.data.data
            this.firstId = data.length>0? data[0].id : 999999
            this.tableData=data;
            this.initgetOrgAllPerson(this.firstId)

          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      enableUser: function (val,index) {
        this.loading=true
        let enablegroupUrl=rolelistUrl.url().updateStatus;
        this.$http.post(enablegroupUrl,
          {
            id:val,
            type:1,    //1表示修改状态，2表示修改操作
            status:0   //0表示启动，1表示停用
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData1[index].status=0
            this.$message.success('启用成功')
            this.loading=false
          }else{
            this.$message.error('启用失败')
          }
        }, (response) => {})
      },
      stopUser: function (val,index) {
        this.loading=true
        let updateStatusUrl=rolelistUrl.url().updateStatus;
        this.$http.post(updateStatusUrl,
          {
            id:val,
            type:1,    //1表示修改状态，2表示修改操作
            status:1   //0表示启动，1表示停用
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.tableData1[index].status=1

            this.$message.success('停用成功')
            this.loading=false
          }else{
            this.$message.error('停用失败')
          }
        }, (response) => {})
      },
      resetPassword(password,phone){
        // console.log(password)
        // this.passWord = password
        this.showPhone = phone
        this.password = ''
        this.dialogFormVisible3 = true;
      },
      replayWord(){
        if(!this.password){
          this.$message.error("密码不能为空")
          return;
        }
        let resetPasswordUrl=rolelistUrl.url().resetPassword;
        this.loading=true
        this.$http.post(resetPasswordUrl,
          {
            password:this.password,
            mobile: this.showPhone
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.dialogFormVisible3 = false;
            this.loading=false
            this.$message.success('修改成功')
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })

      }

    },
    mounted(){
      this.init();
      if(this.typeCall == false){
        // let progroupLi = document.getElementsByClassName("el-table__row")[0];
        // document.getElementsByClassName("el-table__row")[0].style('bacgroundColor','red');
      }
    }

  }
</script>
<style>
  .elaside {
    border:1px solid #D3DCE6;
    color: #333;
    margin-right: 10px;
    padding-top: 10px;
  }

  .elmain {
    border:1px solid #D3DCE6;
    color: #333;
  }
  .tianjia{
    color:#16D032;
    cursor: pointer;
    font-size: 20px;
  }
  .color032{
    color:#16D032;
    cursor: pointer;
  }
  .warning-row{
    background-color: beige;
  }
  .el-table::before{
    height: 0;
  }
  .el-form-item{
    margin-bottom: 5px;
  }
  .el-table_1_column_2{
    text-align: right;
  }
  .el-form-item__content, .el-form-item__label{
    line-height: 40px;
  }

</style>
