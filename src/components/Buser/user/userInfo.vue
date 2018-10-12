<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>员工列表</h4>
    </div>
    <div class="centerContent">
      <div class="item user">
        <el-row>
          <el-input
            placeholder="筛选员工"
            v-model="filterText">
          </el-input>
          <el-button type="success" @click="handleAdd">添加新员工</el-button>
          <el-button type="primary" :disabled="selectItemList.length==0" @click="handelSetRole">设置角色</el-button>
          <el-button type="warning" :disabled="selectItemList.length==0" @click="openCertificate">生成企业微信凭证</el-button>
        </el-row>
      </div>

      <el-table :data="employeeTableList" border stripe @selection-change="handleSelectionChange" style="margin-top: 20px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="account" label="账号"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="mobile" label="手机号"></el-table-column>
        <el-table-column property="depart" label="部门"></el-table-column>
        <el-table-column property="duty" label="职务"></el-table-column>
        <el-table-column property="certificateQY" label="企业微信凭证">
          <template slot-scope="scope">
            {{scope.row.hasWechatWorkCredential ? '有' : '无'}}
          </template>
        </el-table-column>
        <el-table-column property="roleNames" label="角色"></el-table-column>
        <el-table-column label="操作"width="180" >
          <template slot-scope="scope">
            <span @click="handleDel(scope.row)" type="text" class="handel">删除</span>
            <span @click="handleView(scope.row)" type="text" class="handel">查看</span>
            <span @click="handleEdit(scope.row)" type="text" class="handel">编辑</span>
            <span @click="handleReset(scope.row)" type="text" class="handel">重置密码</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="showAddNew"
      width="40%"
    >
      <el-form ref="form" label-width="120px" v-if="!resetPwdStatus">
        <el-form-item label="组织名称">
          <el-input v-model="getCurrendNode.name" disabled placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="addEmployeeInfo.account" :disabled="viewStatus" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addEmployeeInfo.name" :disabled="viewStatus"placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="addEmployeeInfo.EnglishName" :disabled="viewStatus"placeholder="输入英文名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addEmployeeInfo.tel":disabled="viewStatus" placeholder="输入手机号"></el-input>
        </el-form-item>
        <!--<el-form-item label="头像">-->
        <!--<el-input v-model="addEmployeeInfo.tel" placeholder="输入头像"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="头像信息" v-if="addEmployeeInfo.picUrl">
          <img :src="addEmployeeInfo.picUrl" alt="" width="200px" height="100px">
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="upload-demo el-right"
            :action="scriptUpload"
            :show-file-list=false
            :headers="setHeader"
            name="file"
            :on-success="filterScriptSuccess"
            list-type="picture-card">
            <el-button size="small" type="primary" :disabled="viewStatus">头像上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="!viewStatus">
          <el-button @click="showAddNew = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </el-form-item>
      </el-form>

      <el-form label-width="120px" v-if="resetPwdStatus">
        <el-form-item label="姓名">
          <el-input v-model="resetInfo.name" disabled placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="resetInfo.pwd" type="password" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="resetInfo.repwd" type="password" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showAddNew = false">取 消</el-button>
          <el-button type="primary" @click="submitReset">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-dialog
      title="请选择角色"
      :visible.sync="showSetRole"
      width="40%"
    >
      <div v-if="alternativeRoleList && alternativeRoleList.length>0">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedRoles" @change="handlecheckedRolesChange">
          <el-checkbox v-for="item in alternativeRoleList" :label="item.id" :key="item.id">{{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="alternativeRoleList && alternativeRoleList.length===0">暂无数据</div>
      <el-button @click="showSetRole = false">取 消</el-button>
      <el-button type="primary" @click="submitSetRole">确 定</el-button>
    </el-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'userInfo',
    props: {
      NodeId: {
        type: [String],
        default: ''
      },
      currendNode: {
        type: [Object, Array],
        default: () => {
        }
      },
    },
    data() {
      return {
        title: '',
        checkAll: false,
        viewStatus: false,
        resetPwdStatus: false,
        checkedRoles: [],
        allCheckedId: [],
        haveCheckedId: [],
        isIndeterminate: true,
        showSetRole: false,
        showAddNew: false,
        filterText: '',
        employeeTableList: [],
        dialogVisible: false,
        selectItemList: [],
        selectitem_id_list: [],
        orgId: '',
        getCurrendNode: {},
        addEmployeeInfo: {
          userId: "",
          hotel: "",
          account: "",
          name: "",
          EnglishName: "",
          tel: "",
          picUrl: ''
        },
        resetInfo: {
          id: '',
          name: '',
          pwd: '',
          repwd: '',
        },
        alternativeRoleList: [],
        editStatus:false
      }
    },
    computed: {
      ...mapState([]),
      scriptUpload() {
        return "/galaxy-front/brands/logo/upload";
      },
      setHeader() {
        return {
//          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      }
    },
    methods: {
      ...mapActions([
        'userList',
        'adduser',
        'delUser',
        'qyWeath',
        'setRoles',
        'modifyuser',
        'resetPwd',
        'readyRoleList',
      ]),

      getRoleList() {
        this.readyRoleList({
          orgid: this.orgId,
          onsuccess: body => {
            this.allCheckedId = []
            this.alternativeRoleList = body.data
            this.alternativeRoleList.map(item => {
              this.allCheckedId.push(item.id)
            })
          },
        })
      },

      getEmployeeList() {
        this.userList({
          orgid: this.orgId,
          onsuccess: body => {
            this.employeeTableList = body.data
          }

        })
      },

      submitAdd() {
        if(this.editStatus){
          let fields = {
            userId:  this.addEmployeeInfo.userId,
            orgId: this.orgId,
            name: this.addEmployeeInfo.name,
            account: this.addEmployeeInfo.account,
            mobile: this.addEmployeeInfo.tel,
            englishName: this.addEmployeeInfo.EnglishName,
            avatar: this.addEmployeeInfo.picUrl
          }
          this.modifyuser({
            fields: fields,
            onsuccess: body => {
              this.getEmployeeList()
              this.showAddNew = false
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            },
            onfail: body => {
              this.$message({
                message: body.data.errmsg,
                type: 'error'
              });
              this.showAddNew = false
            }
          })
        }else {
          let fields = {
            orgId: this.orgId,
            name: this.addEmployeeInfo.name,
            account: this.addEmployeeInfo.account,
            mobile: this.addEmployeeInfo.tel,
            englishName: this.addEmployeeInfo.EnglishName,
            avatar: this.addEmployeeInfo.picUrl

          }
          this.adduser({
            fields: fields,
            onsuccess: body => {
              this.getEmployeeList()
              this.showAddNew = false

            },
            onfail: body => {
              this.$message({
                message: body.data.errmsg,
                type: 'error'
              });
              this.showAddNew = false
            }
          })
        }
      },

      submitReset() {
        if (this.resetInfo.pwd == this.resetInfo.repwd) {
          this.resetPwd({
            userId: this.resetInfo.id,
            password: this.resetInfo.pwd,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.showAddNew = false
              this.getEmployeeList()
            },
            onFail: body => {
              this.$message({
                type: 'warning',
                message: '修改失败!'
              });
              this.showAddNew = false
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '密码和重复密码不同!'
          });
        }

      },

      submitSetRole() {
        this.setRoles({
          userIds: this.selectitem_id_list,
          roleIds: this.haveCheckedId,
          onsuccess: body => {
            this.$message({
              type: 'success',
              message: '设置成功!'
            });
            this.showSetRole = false
            this.getEmployeeList()

          },
          onfail: body => {
            this.$message({
              type: 'warning',
              message: '设置失败!'
            });
            this.showSetRole = false
          }
        })
      },

      openCertificate() {
        this.$confirm('是否生成企业微信凭证?', '提示', {
          confirmButtonText: '取消',
          cancelButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }).catch(() => {
          this.qyWeath({
            userIds: this.selectitem_id_list,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '生成成功!'
              });
              this.getEmployeeList()
            },
          })
        });
      },

      handleCheckAllChange(val) {
        console.log('all', val)
        this.checkedRoles = val ? this.allCheckedId : [];
        this.isIndeterminate = false;
      },

      handlecheckedRolesChange(value) {
        console.log('--->', value)
        this.haveCheckedId = value
//        this.checkedRoles=value
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.alternativeRoleList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.alternativeRoleList.length;
      },

      handelSetRole() {
        this.showSetRole = true;
        this.getRoleList();
      },

      handleAdd() {
        this.title = '新增用户'
        this.showAddNew = true
        this.viewStatus = false
        this.resetPwdStatus = false
//        初始化
//        this.addEmployeeInfo.hotel=''
        this.addEmployeeInfo.account = ''
        this.addEmployeeInfo.name = ''
        this.addEmployeeInfo.EnglishName = ''
        this.addEmployeeInfo.tel = ''

        this.editStatus=false

      },

      handleView(parm) {
        this.title = '查看用户'
        this.showAddNew = true
        this.viewStatus = true
        this.resetPwdStatus = false
//        数据整理
        this.addEmployeeInfo.account = parm.account
        this.addEmployeeInfo.name = parm.name
        this.addEmployeeInfo.EnglishName = parm.englishName
        this.addEmployeeInfo.tel = parm.mobile
        this.addEmployeeInfo.picUrl = parm.avatar

        this.editStatus=false
      },

      handleEdit(parm) {
        this.title = '编辑用户'
        this.showAddNew = true
        this.viewStatus = false
        this.resetPwdStatus = false
//        数据整理
        this.addEmployeeInfo.userId = parm.userId
        this.addEmployeeInfo.account = parm.account
        this.addEmployeeInfo.name = parm.name
        this.addEmployeeInfo.EnglishName = parm.englishName
        this.addEmployeeInfo.tel = parm.mobile
        this.addEmployeeInfo.picUrl = parm.avatar

        this.editStatus=true

      },

      handleReset(parm) {
        this.showAddNew = true
        this.title = '重置密码'
        this.resetPwdStatus = true
        this.resetInfo.id = parm.userId
        this.resetInfo.name = parm.name
        this.editStatus=false

      },

      handleDel(parm) {
        this.editStatus=false

        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(parm)
          this.delUser({
            userId: parm.userId,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getEmployeeList()
            },
            onfail: body => {
              this.$message({
                type: 'warning',
                message: '删除失败!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      handleSelectionChange(val) {
//        console.log('valvalval',val)
        this.selectItemList = val;
        this.selectitem_id_list = []
        this.selectItemList.map(item => {
          this.selectitem_id_list.push(item.userId)
        })


      },

      filterScriptSuccess(res, file, list) {
        if (res.data) {
          this.addEmployeeInfo.picUrl = res.data;
        }
      },
    },

    mounted() {
      this.orgId = this.NodeId;
      this.getCurrendNode = this.currendNode;
      this.getEmployeeList()


    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getEmployeeList()
      },
      currendNode(val) {
        console.log(this.getCurrendNode)
        this.getCurrendNode = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .third_wrap .rightWrap .rightInfo .centerContent .item {
    width: 100%;
  }

  .third_wrap .rightWrap .rightInfo .centerContent .item .el-input {
    width: 30%;
    margin-right: 2rem;

  }

  .handel {
    cursor: pointer;
    color: #42c640;
    text-decoration: underline;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    .el-checkbox {
      margin-left: 30px;
    }
  }
  /deep/ .el-upload--picture-card {
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 40px;
    vertical-align: top;
  }

  /deep/ .el-upload {
    display: flex;
  }

</style>
