<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>角色列表</h4>
    </div>
    <div class="centerContent">
      <div class="item role">
        <el-row>
          <el-input
            v-model="searchVal" @keyup.13.native="searchRoleList"
            placeholder="筛选角色">
          </el-input>
          <el-button type="success" @click="handleAdd">添加角色</el-button>
          <el-button type="primary" @click="handelCopeTemplate">从模板复制</el-button>
          <el-button type="warning" @click="handelLinkTemplate">从模板引用</el-button>
        </el-row>
      </div>

      <el-table :data="roleTableList" border stripe @selection-change="handleSelectionChange" style="margin-top: 20px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="id" label="id"></el-table-column>
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="" label="组织名称"></el-table-column>
        <el-table-column property="duty" label="是否引用模板"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="handleChange(scope.row)" type="text" class="handel">修改</span>
            <span @click="handleSetAuth(scope.row)" type="text" class="handel">设置权限</span>
            <span @click="handleViewAuth(scope.row)" type="text" class="handel">查看权限</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="showAddNew"
      width="40%"
    >
      <el-form ref="form" label-width="120px">
        <el-form-item label="组织名">
          <el-input v-model="getCurrendNode.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="addRoleInfo.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="addRoleInfo.alias" placeholder="输入别名"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addRoleInfo.description" placeholder="输入描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showAddNew = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="templateTitle"
      :visible.sync="showSetRole"
      width="40%">
      <el-table :data="templateList" border stripe @selection-change="handleSelectTemplate">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="id" label="角色ID"></el-table-column>
        <el-table-column property="name" label="角色名称"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="showSetRole = false">取 消</el-button>
        <el-button type="primary" @click="submitSaveTemplate">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="authTitle"
      :visible.sync="showSetAuth"
      width="40%">
      <!---->
      <el-table :data="authTableDate" border stripe @selection-change="handleSelectAuth">
        <el-table-column v-if="setAuthStatus"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column property="permissionId" label="权限Id"></el-table-column>
        <el-table-column property="name" label="权限名称"></el-table-column>
        <el-table-column property="description" label="权限描述"></el-table-column>
      </el-table>
      <div style="margin-top: 20px" v-if="setAuthStatus">
        <el-button @click="showSetAuth = false">取 消</el-button>
        <el-button type="primary" @click="submitSetAuth">保 存</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'roleInfo',
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
        templateTitle: '',
        authTitle: '',
        checkAll: false,
        editStatus: false,
        setAuthStatus: false,
        checkedCities: ['上海', '北京'],
        isIndeterminate: true,
        showSetRole: false,
        showSetAuth: false,
        showAddNew: false,
        searchVal: '',
        roleTableList: [],
        dialogVisible: false,
        selectItemList: [],
        selectItemList_id: [],
        selectedTemplate: [],
        selectedTemplateId: [],
        selectedAuthId: [],
        orgId: '',
        getCurrendNode: {},
        addRoleInfo: {
          id: '',
          name: '',
          alias: '',
          description: '',
        },
        resetInfo: {
          id: '',
          name: '',
          pwd: '',
          repwd: '',
        },
        roleItems: [],
        copeStatus: false,
        templateList: [],
        authTableDate: [],
        currentRoleItemId: '',
      }
    },
    methods: {
      ...mapActions([
        'roleList',
        'addrole',
        'changeRole',
        'roleroleItems',
        'thisOrgRoleList',
        'copyroletemp',
        'refersroletemp',
        'roleTemplateList',
        'getAuthByAuth',
        'setAuth',
        'searchRole',
      ]),
      searchRoleList() {
        this.searchRole({
          orgid: this.orgId,
          name: this.searchVal,
          onsuccess: body => {
            this.roleTableList = body.data
          }
        })
      },

      getTemplateList() {
        this.roleTemplateList({
          onsuccess: body => {
            this.templateList = body.data
          },
        })
      },

      getTableRoleList() {
        this.roleList({
          orgid: this.orgId,
          onsuccess: body => {
            this.roleTableList = body.data
          }

        })
      },

      submitAdd() {
        if (this.editStatus) {
          this.changeRole({
            roleId: this.addRoleInfo.id,
            name: this.addRoleInfo.name,
            alias: this.addRoleInfo.alias,
            description: this.addRoleInfo.description,
            onsuccess: body => {
              this.getTableRoleList()
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
        } else {
          this.addrole({
            orgId: this.orgId,
            name: this.addRoleInfo.name,
            alias: this.addRoleInfo.alias,
            description: this.addRoleInfo.description,
            onsuccess: body => {
              this.getTableRoleList()
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
        }
      },

      submitSetAuth() {
        let fields = {
          roleId: this.currentRoleItemId,
          pemissionIds: this.selectedAuthId,
        }
        this.setAuth({
          fields: fields,
          onsuccess: body => {
            this.roleTableList = body.data
            this.showSetAuth = false
          },
          onfail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });
            this.showSetAuth = false
          },
        })
      },

      submitSaveTemplate() {
        let fields = {
          orgId: this.orgId,
          tempIds: this.selectedTemplateId
        }
        if (this.copeStatus) {
          this.copyroletemp({
            fields: fields,
            onsuccess: body => {
              this.showSetRole = false
            },
            onfail: body => {
              this.showSetRole = false
            },
          })
        } else {
          this.refersroletemp({
            fields: fields,
            onsuccess: body => {
              this.showSetRole = false
            },
            onfail: body => {
              this.showSetRole = false
            },
          })
        }
      },

      handleAdd() {
        this.title = '新增角色'
        this.showAddNew = true
        this.editStatus = false
//        数据初始化
        this.addRoleInfo.id = ''
        this.addRoleInfo.name = ''
        this.addRoleInfo.alias = ''
        this.addRoleInfo.description = ''
      },

      handelCopeTemplate() {
        this.showSetRole = true
        this.getTemplateList()
        this.copeStatus = true
        this.templateTitle = '从模板复制'
      },

      handelLinkTemplate() {
        this.showSetRole = true
        this.getTemplateList()
        this.copeStatus = false
        this.templateTitle = '从模板引用'

      },

      handleChange(parm) {
        console.log(parm)
        this.title = '编辑角色'
        this.showAddNew = true
        this.editStatus = true
//        数据归整
        this.addRoleInfo.id = parm.id
        this.addRoleInfo.name = parm.name
        this.addRoleInfo.alias = parm.alias
        this.addRoleInfo.description = parm.description
      },

      handleSetAuth(parm) {
        this.authTitle = '设置权限'
        this.showSetAuth = true
        this.setAuthStatus = true
        this.currentRoleItemId = parm.id
        this.getAuthByAuth({
          roleId: parm.id,
          onsuccess: body => {
            this.authTableDate = body.data
          }
        })
      },

      handleViewAuth(parm) {
        this.authTitle = '查看权限'
        this.showSetAuth = true
        this.setAuthStatus = false

        console.log(parm)
        this.getAuthByAuth({
          roleId: parm.id,
          onsuccess: body => {
            this.authTableDate = body.data
          }
        })
      },

      handleSelectionChange(val) {
        console.log(val)
        this.selectItemList = val;
        this.selectItemList_id = []
        this.selectItemList.map(item => {
          this.selectItemList_id.push(item.id)
        })
      },
      handleSelectTemplate(val) {
        this.selectedTemplate = val;
        console.log('选择的模板', this.selectedTemplate)
        this.selectedTemplateId = []
        this.selectedTemplate.map(item => {
          this.selectedTemplateId.push(item.id)
        })
      },
      handleSelectAuth(val) {
        this.selectedAuthId = []
        val.map(item => {
          this.selectedAuthId.push(item.permissionId)
        })

      },
      handleClose() {
      },
    },

    mounted() {
      this.orgId = this.NodeId;
      this.getCurrendNode = this.currendNode;
      this.getTableRoleList()


    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getTableRoleList()
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
