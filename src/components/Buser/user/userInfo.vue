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
          <el-button type="primary" :disabled="selectItemList.length==0" @click="showSetRole=true">设置角色</el-button>
          <el-button type="warning" :disabled="selectItemList.length==0" @click="openCertificate">生成企业微信凭证</el-button>
        </el-row>
      </div>

      <el-table :data="employeeTableList" border stripe @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="count" label="账号"></el-table-column>
        <el-table-column property="mobile" label="手机号"></el-table-column>
        <el-table-column property="depart" label="部门"></el-table-column>
        <el-table-column property="duty" label="职务"></el-table-column>
        <el-table-column property="certificateQY" label="企业微信凭证"></el-table-column>
        <el-table-column property="role" label="角色"></el-table-column>
        <el-table-column label="操作">
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
          <el-input v-model="addEmployeeInfo.name" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="addEmployeeInfo.EnglishName" placeholder="输入英文名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addEmployeeInfo.tel" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="addEmployeeInfo.tel" placeholder="输入头像"></el-input>
        </el-form-item>
        <el-form-item>
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
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="showSetRole = false">取 消</el-button>
      <el-button type="primary" @click="submitSetRole">确 定</el-button>
    </el-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  const cityOptions = ['上海', '北京', '广州', '深圳'];
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
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        showSetRole: false,
        showAddNew: false,
        filterText: '',
        employeeTableList: [
          {
            id: "100000021",
            name: "张三",
            account: "user001",
            mobile: "18673625164",
            avatar: "",
          },
          {
            id: "1000000222",
            name: "李四",
            account: "user001",
            mobile: "18673625164",
            avatar: "",
          },
          {
            id: "10000009999",
            name: "王二",
            account: "user001",
            mobile: "18673625164",
            avatar: "",
          },
        ],
        dialogVisible: false,
        selectItemList: [],
        selectitem_id_list: [],
        orgId: '',
        getCurrendNode: {},
        addEmployeeInfo: {
          hotel: "",
          account: "",
          name: "",
          EnglishName: "",
          tel: "",
        },
        resetInfo: {
          id: '',
          name: '',
          pwd: '',
          repwd: '',
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
      ]),

      getEmployeeList() {
        this.userList({
          orgid: this.orgId,
          onsuccess: body => {
//            this.employeeTableList = body.data
          }

        })
      },

      submitAdd() {
        let fields = {
//          "orgId":"10000000010", "name":"user", "account":"user001", "mobile":"18673625164", "avatar":"",
          orgId: "10000000010",
          name: this.addEmployeeInfo.name,
          account: this.addEmployeeInfo.name,
          mobile: this.addEmployeeInfo.name,
          avatar: this.addEmployeeInfo.name,
        }
        this.adduser({
          fields: fields,
          onsuccess: body => {
            this.getEmployeeList()
            this.showAddNew = false

          },
          onFail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });
            this.showAddNew = false
          }
        })
      },

      submitReset() {
        if (this.resetInfo.pwd == this.resetInfo.repwd) {
          this.resetPwd({
            id: this.resetInfo.id,
            password: this.resetInfo.pwd,
            onsuccess: body => {
              this.$message({
                type: 'warning',
                message: '修改成功!'
              });
              this.showAddNew = false

            },
            onFail: body => {
              this.$message({
                type: 'warning',
                message: '修改失败!'
              });
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '密码和重复密码不同!'
          });
        }

      },

      submitSetRole(){
        this.setRoles({
//          userId: params.userId,
//          roleIds: params.roleIds
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
            },
          })
        });
      },

      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleAdd() {
        this.title = '新增用户'
        this.showAddNew = true
        this.viewStatus = false
        this.resetPwdStatus = false


      },
      handleView() {
        this.title = '查看用户'
        this.showAddNew = true
        this.viewStatus = true
        this.resetPwdStatus = false
      },

      handleEdit() {
        this.title = '编辑用户'
        this.showAddNew = true
        this.viewStatus = false
        this.resetPwdStatus = false

      },

      handleReset(parm) {
        this.showAddNew = true
        this.title = '重置密码'
        this.resetPwdStatus = true
        this.resetInfo.id=parm.id
      },

      handleDel(parm) {
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(parm)
          this.delUser({
            userIds: parm.id,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getEmployeeList()
            },
            onFail: body => {
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
        console.log('valvalval',val)
        this.selectItemList = val;
        this.selectitem_id_list=[]
        this.selectItemList.map(item => {
          this.selectitem_id_list.push(item.id)
        })


      },
      handleClose() {
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


</style>
