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
            v-model="searchVal" @keyup.13.native="searchUserList"
            placeholder="筛选员工">
          </el-input>
          <el-button type="success" @click="handleAdd">添加新员工</el-button>
          <el-button type="primary" :disabled="selectItemList.length==0" @click="handelSetRole">设置角色</el-button>
          <el-button type="warning" :disabled="selectItemList.length==0" @click="openCertificate">生成企业微信凭证</el-button>
        </el-row>
      </div>

      <el-table :data="employeeTableList" border stripe @selection-change="handleSelectionChange"
                style="margin-top: 20px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="account" label="账号"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="mobile" label="手机号"></el-table-column>
        <el-table-column property="depart" label="部门"></el-table-column>
        <el-table-column property="position" label="职务"></el-table-column>
        <el-table-column property="certificateQY" label="企业微信凭证">
          <template slot-scope="scope">
            {{scope.row.hasWechatWorkCredential ? '有' : '无'}}
          </template>
        </el-table-column>
        <el-table-column property="roleNames" label="角色">
          <template slot-scope="scope">
            {{scope.row.roleNames ? scope.row.roleNames.join(' , ') : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <span @click="handleDel(scope.row)" type="text" class="handel">删除</span>
            <span @click="handleView(scope.row)" type="text" class="handel">查看</span>
            <span @click="handleEdit(scope.row)" type="text" class="handel">编辑</span>
            <span @click="handleReset(scope.row)" type="text" class="handel">重置密码</span>
            <span @click="handleChange(scope.row)" type="text" class="handel">修改所属酒店</span>
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
          <el-input v-model="addEmployeeInfo.name" :disabled="viewStatus" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="addEmployeeInfo.EnglishName" :disabled="viewStatus" placeholder="输入英文名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addEmployeeInfo.tel" :disabled="viewStatus" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="addEmployeeInfo.position" :disabled="viewStatus" placeholder="输入职务"></el-input>
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

    <el-dialog
      :title="title"
      :visible.sync="showChangeNode"
      width="60%"
    >
      <div class="clearfix">
        <div class="fl dialog_left">
          <el-input
            placeholder="输入关键字进行筛选"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="parentNode"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :highlight-current="true"
            ref="tree"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div class="fr dialog_right">
          {{getCurrendNode.name}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangeNode = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </span>
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
      parentNode: {
        type: [Object, Array,String],
        default: () => []
      }
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
        showChangeNode: false,
        filterText: '',
        userManageTreeDate: [
          {
            "foreignId": "",
            "creator": null,
            "deleted": false,
            "name": "顶级组织",
            "type": "ROOT",
            "subOrganizations": [],
            "parentId": "0",
            "orgId": "0",
            "status": null
          }
        ],
        defaultProps: {
          children: 'subOrganizations',
          label: 'name',
          id: 'orgId'
        },
        interimList: {}, // 临时数据   点击修改公司
        searchVal: '',
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
          picUrl: '',
          position:''
        },
        resetInfo: {
          id: '',
          name: '',
          pwd: '',
          repwd: '',
        },
        alternativeRoleList: [],
        editStatus: false
      }
    },
    computed: {
      ...mapState([]),
      scriptUpload() {
        return "/galaxy-front/brands/logo/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
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
        'computerChange',
        'setRoles',
        'modifyuser',
        'resetPwd',
        'readyRoleList',
        'searchUser',
      ]),
      searchUserList() {
        this.searchUser({
          orgid: this.orgId,
          name: this.searchVal,
          onsuccess: body => {
            this.employeeTableList = body.data
          }
        })
      },

      // 修改所属公司确定事件  剩下传值
      submitChange() {
        this.computerChange({
          userId: this.interimList.userId,
          name: this.interimList.name,
          orgId: this.getCurrendNode.orgId,
          onsuccess: body => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.showChangeNode = false;
            this.orgId = this.getCurrendNode.orgId;
            this.getEmployeeList()

          },
          onfail: body => {
            this.$message({
              type: 'warning',
              message: '修改失败!'
            });
            this.showChangeNode = false;
          }
        })
      },

      //    树节点点击
      handleNodeClick(item, node, aaa) {
        item.orgId = item.id;
        if (item.orgId == "0") {
          this.$message({
            message: "顶级组织不可编辑",
            type: 'error'
          });
          return false
        } else if (item.type == "HOTEL") {
          this.getCurrendNode = item;
        }
      },
      //  节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      // 修改所属公司
      handleChange(val) {
        this.interimList = val;
        this.title = '修改所属公司';
        this.showChangeNode = true;

      },

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
        if (!(/[a-zA-Z0-9]/.test(this.addEmployeeInfo.account))) {
          this.$message({
            message: "账号不符合规则",
            type: 'error'
          });
          return false
        } else if (this.addEmployeeInfo.name == "") {
          this.$message({
            message: "请填写用户姓名",
            type: 'error'
          });
          return false
        }
        else if (!(/^1[3456789]\d{9}$/.test(this.addEmployeeInfo.tel))) {
          this.$message({
            message: "手机号不合法",
            type: 'error'
          });
          return false
        }

        if (this.editStatus) {
          let fields = {
            userId: this.addEmployeeInfo.userId,
            orgId: this.orgId,
            name: this.addEmployeeInfo.name,
            account: this.addEmployeeInfo.account,
            mobile: this.addEmployeeInfo.tel,
            englishName: this.addEmployeeInfo.EnglishName,
            avatar: this.addEmployeeInfo.picUrl,
            position:this.addEmployeeInfo.position
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
        } else {
          let fields = {
            orgId: this.orgId,
            name: this.addEmployeeInfo.name,
            account: this.addEmployeeInfo.account,
            mobile: this.addEmployeeInfo.tel,
            englishName: this.addEmployeeInfo.EnglishName,
            avatar: this.addEmployeeInfo.picUrl,
            position:this.addEmployeeInfo.position

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
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      handleCheckAllChange(val) {
        this.checkedRoles = val ? this.allCheckedId : [];
        this.isIndeterminate = false;
      },

      handlecheckedRolesChange(value) {
        this.haveCheckedId = value
//        this.checkedRoles=value
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.alternativeRoleList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.alternativeRoleList.length;
      },

      handelSetRole() {
        this.checkedRoles=[]
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
        this.addEmployeeInfo.picUrl = ''
        this.addEmployeeInfo.position = ''
        this.editStatus = false

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
        this.addEmployeeInfo.position = parm.position
        this.editStatus = false
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
        this.addEmployeeInfo.position = parm.position
        this.editStatus = true

      },

      handleReset(parm) {
        this.showAddNew = true
        this.title = '重置密码'
        this.resetPwdStatus = true
        this.resetInfo.id = parm.userId
        this.resetInfo.name = parm.name
        this.editStatus = false

      },

      handleDel(parm) {
        this.editStatus = false

        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        this.selectItemList = val;
        this.selectitem_id_list = [];
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
      this.getEmployeeList();

    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getEmployeeList()
      },
      currendNode(val) {
        this.getCurrendNode = val
      },
      filterText(val) {
        this.$refs.tree.filter(val);
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

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .dialog_left {
    width: 50%;
    overflow: scroll;
    max-height: 300px;
    border-right: 1px solid gray;
  }

  .dialog_right {
    width: 49.5%;
    padding-left: 30px;
    display: inline-block;
  }


</style>
