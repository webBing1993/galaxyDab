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
        <el-table-column property="orgName" label="组织名称"></el-table-column>
        <el-table-column label="是否引用模板">
          <template slot-scope="scope">
            {{scope.row.synchronization?"是":"否"}}
          </template>
        </el-table-column>
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
      <!--<el-table :data="authTableDate" border stripe @selection-change="handleSelectAuth">-->
        <!--<el-table-column v-if="setAuthStatus"-->
                         <!--type="selection"-->
                         <!--width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column property="permissionId" label="权限Id"></el-table-column>-->
        <!--<el-table-column property="name" label="权限名称"></el-table-column>-->
        <!--<el-table-column property="description" label="权限描述"></el-table-column>-->
      <!--</el-table>-->
      <el-tree
        class="filter-tree"
        :data="AuthNodeTree"
        :props="defaultProps"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :highlight-current="true"
        :default-checked-keys="haveSetedAuth"
        ref="tree"
        node-key="id"
        default-expand-all
        show-checkbox
        @check="handelNodeChecked"
        >
      </el-tree>
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
        haveSetedAuth:[],
        AuthNodeTree:[
          {
            "foreignId": "",
            "creator": null,
            "deleted": false,
            "name": "顶级权限",
            "type": "ROOT",
            "parentId": "0",
            "id": "0",
            "status": null,
            "subPermissions": [],
             disabled: true
          }
        ],
        defaultProps: {
          children: 'subPermissions',
          label: 'name',
          id: 'id'
        },
        usernamePermiss:'',
        passwordPermiss:'',
        authorityJudge:'',
        userPermissionsJudge:'',
        configPermissionsJudge:''


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
        'authTree',
        'loginIN',
        'goto',
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
      loginShow(){
        this.loginIN({
          account: this.usernamePermiss,
          password: this.passwordPermiss,
          onsuccess: body => {
            if(body.data.permissions.length == 0){
              this.$message({
                type: 'error',
                message: '没有权限!',
                duration:1000,
                showClose: true,
              });
              return false;
            }
            this.authorityJudge = body.data.permissions[0].subPermissions
            if(this.authorityJudge.length == 1){
              if(this.authorityJudge[0].name=='B端用户管理'){
                this.userPermissionsJudge = this.authorityJudge[0]
                this.$store.commit("getUserPermissions", this.userPermissionsJudge);
                //动态路由
                let path;
                if((this.authorityJudge[0].subPermissions[0].description == '')||(this.authorityJudge[0].subPermissions[0].description == null)){
                  path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description
                }
                else{
                  path = this.authorityJudge[0].subPermissions[0].description
                }
                this.$router.push({path:path})
              }
              else{
                this.userPermissionsJudge = ''
                this.$store.commit("getUserPermissions", this.userPermissionsJudge);
              }
              if(this.authorityJudge[0].name=='配置管理'){
                this.configPermissionsJudge =  this.authorityJudge[0]
                this.$store.commit("getConfigPermissions", this.configPermissionsJudge);
                let path;
                path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description

                this.$router.push({path:path})
              }
              else{
                this.configPermissionsJudge =  ''
                this.$store.commit("getConfigPermissions", this.configPermissionsJudge);
              }
            }
            if(this.authorityJudge.length == 2){
              let path;
              if((this.authorityJudge[0].subPermissions[0].description == '') || (this.authorityJudge[0].subPermissions[0].description == null)){
                path = this.authorityJudge[0].subPermissions[0].subPermissions[0].description
              }
              else{
                path = this.authorityJudge[0].subPermissions[0].description
              }
              this.$router.push({path:path})
              for(var i = 0; i< this.authorityJudge.length;i++){
                if(this.authorityJudge[i].name=='B端用户管理'){
                  this.userPermissionsJudge = this.authorityJudge[i]
                  this.$store.commit("getUserPermissions", this.userPermissionsJudge);
                }
                else if(this.authorityJudge[i].name=='配置管理'){
                  this.configPermissionsJudge =  this.authorityJudge[i]
                  this.$store.commit("getConfigPermissions", this.configPermissionsJudge);
                }

              }
            }

          },
          onfail: body => {
          }
        })

      },

      submitSetAuth() {
        // console.log('测试77777',this.selectedAuthId)
        let fields = {
          roleId: this.currentRoleItemId,
          pemissionIds: this.selectedAuthId,
        }
        this.setAuth({
          fields: fields,
          onsuccess: body => {
//            this.roleTableList = body.data
            this.getTableRoleList()
            this.showSetAuth = false
            this.loginShow()

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
              this.getTableRoleList()
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
              this.getTableRoleList()

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
        this.title = '编辑角色'
        this.showAddNew = true
        this.editStatus = true
//        数据归整
        this.addRoleInfo.id = parm.id
        this.addRoleInfo.name = parm.name
        this.addRoleInfo.alias = parm.alias
        this.addRoleInfo.description = parm.description
      },
      //所有权限树
      getAllAuthTree(){
        this.authTree({
          onsuccess: body => {
            if (body.data) {
              this.AuthNodeTree[0].subPermissions = body.data
              let temp=[]
              let tempPermissions = []
              this.authTableDate.map(item=>{
                tempPermissions.push(item.permissionId)

                let parentNodeDelete = (item.name!='管理后台') && (item.name!='B端用户管理') && (item.name!='组织管理') && (item.name!='配置管理') && (item.name!='酒店配置管理') && (item.name!='发现') && (item.name!='系统配置');
                let parentNodeDelete1 = (item.name!='企业微信') && (item.name!='人证通') && (item.name!='E卡通') && (item.name!='酒店服务') && (item.name != '酒店设置')
                if(parentNodeDelete && parentNodeDelete1){
                  temp.push(item.permissionId)
                 }
              })
              this.selectedAuthId = tempPermissions
              this.$nextTick(function () {
                this.haveSetedAuth = temp
              })
            } else {
            }
          }
        })
      },
      handleSetAuth(parm) {
        this.authTitle = '设置权限'
        this.showSetAuth = true
        this.setAuthStatus = true
        this.currentRoleItemId = parm.id
        this.getAuthByAuth({
          roleId: parm.id,
          onsuccess: body => {
             // console.log('设置权限列表',body.data)
            this.authTableDate = body.data
            this.haveSetedAuth=[]
            this.getAllAuthTree();
          }
        })
      },
      handleViewAuth(parm) {
        this.authTitle = '查看权限'
        this.showSetAuth = true
        this.setAuthStatus = false
        this.getAuthByAuth({
          roleId: parm.id,
          onsuccess: body => {
            // console.log('查看权限列表',body.data)
            this.authTableDate = body.data
            this.haveSetedAuth=[]
            this.getAllAuthTree()

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
        this.selectedTemplateId = []
        this.selectedTemplate.map(item => {
          this.selectedTemplateId.push(item.id)
        })
      },
      handelNodeChecked(parm1,parm2){
           if(parm2.halfCheckedKeys.length != 1){
             parm2.halfCheckedKeys.splice(0,1)
             this.selectedAuthId = parm2.halfCheckedKeys.concat(parm2.checkedKeys)
           }
           else{

             this.selectedAuthId = parm2.checkedKeys
           }

      },
    },

    mounted() {
      this.orgId = this.NodeId;
      this.getCurrendNode = this.currendNode;
      this.getTableRoleList()
      this.usernamePermiss = this.$store.state.usernamePermissions
      this.passwordPermiss = this.$store.state.passwordPermissions

    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getTableRoleList()
      },
      currendNode(val) {
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
