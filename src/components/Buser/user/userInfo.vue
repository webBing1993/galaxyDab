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
        <el-table-column property="phone" label="手机号"></el-table-column>
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
        <el-form-item label="酒店">
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
        <el-form-item>
          <el-button @click="showAddNew = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </el-form-item>
      </el-form>

      <el-form label-width="120px" v-if="resetPwdStatus">
        <el-form-item label="姓名">
          <el-input v-model="resetInfo.name"  disabled placeholder="输入账号"></el-input>
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
            count: '11111241',
            name: '王小虎',
            phone: '18723555234',
            depart: '技术部',
            duty: '前端',
            certificateQY: '是',
            role: '前端',
          }, {
            count: '11111241',
            name: '王小虎',
            phone: '18723555234',
            depart: '技术部',
            duty: '前端',
            certificateQY: '是',
            role: '前端',
          },
          {
            count: '11111241',
            name: '王小虎',
            phone: '18723555234',
            depart: '技术部',
            duty: '前端',
            certificateQY: '是',
            role: '前端',
          },
          {
            count: '11111241',
            name: '王小虎',
            phone: '18723555234',
            depart: '技术部',
            duty: '前端',
            certificateQY: '是',
            role: '前端',
          },
          {
            count: '11111241',
            name: '王小虎',
            phone: '18723555234',
            depart: '技术部',
            duty: '前端',
            certificateQY: '是',
            role: '前端',
          },
        ],
        dialogVisible: false,
        selectItemList: [],
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
        let fields = {}
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
          }
        })
      },

      submitReset() {
        if (this.resetInfo.pwd == this.resetInfo.repwd) {
          this.resetPwd({
            id: '1111',
//            id: this.resetInfo.id,
            password: this.resetInfo.pwd,
            onsuccess: body => {
              this.$message({
                type: 'warning',
                message: '修改失败!'
              });
              this.showAddNew = false

            },
            onFail: body => {
              this.$message({
                type: 'warning',
                message: '删除失败!'
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

      openCertificate() {
        this.$confirm('是否生成企业微信凭证?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '生成成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
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

      handleReset() {
        this.showAddNew = true
        this.title = '重置密码'
        this.resetPwdStatus = true

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
        this.selectItemList = val;
        console.log('selectItemList', this.selectItemList)

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
