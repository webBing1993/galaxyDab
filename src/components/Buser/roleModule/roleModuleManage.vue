<template>
  <div style="padding: 1rem">
    <h4 class="roleModuleTitle">角色模板列表</h4>
    <div style="text-align: left;margin-bottom: 2rem">
      <el-button type="primary" @click="HandelAdd">新增角色模板</el-button>
    </div>
      <el-table :data="roleTemplateTableList" border stripe @selection-change="handleSelectionChange">
        <el-table-column property="id" label="ID" width="150"></el-table-column>
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="alias" label="别名"></el-table-column>
        <el-table-column property="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handeMmodify(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="handleSetAuth(scope.row)" type="text" size="small">设置权限</el-button>
            <el-button @click="handleViewAuth(scope.row)" type="text" size="small">查看权限</el-button>
          </template>
        </el-table-column>
      </el-table>


    <el-dialog
      :title="dialogTitle"
      :visible.sync="showAddNew"
      width="40%"
    >
      <div class="moduleItem">
        <span>名称</span>
        <el-input v-model="addInfo.name" placeholder="请输入内容"></el-input>
      </div>
      <div class="moduleItem">
        <span>别名</span>
        <el-input v-model="addInfo.alias" placeholder="请输入内容"></el-input>
      </div>
      <div class="moduleItem">
        <span>描述</span>
        <el-input v-model="addInfo.description" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="showAddNew = false">取 消</el-button>
            <el-button type="primary" @click="submitAddOrChange">确 定</el-button>
          </span>
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
    name: 'roleModuleManage',
    data() {
      return {
        input: false,
        showAddNew: false,
        roleTemplateTableList: [],
        dialogVisible: false,
        defaultProps: {
          children: 'subPermissions',
          label: 'name'
        },
        addInfo: {
          id: '',
          name: '',
          alias: '',
          description: '',
        },
        dialogTitle: '',
        selectItemList: '',
        authTitle: '',
        showSetAuth: false,
        authTableDate: [],
        selectedAuthId: [],
        currentTempItemId: [],
        setAuthStatus: false,

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
            disabled: false
          }
        ],
        defaultProps: {
          children: 'subPermissions',
          label: 'name',
          id: 'id'
        },

      }
    },
    methods: {
      ...mapActions([
        'roleTemplateList',
        'addRole',
        'modifyRole',
        'getAuthByTemp',
        'setTempAuth',
        'authTree',
      ]),
//      handleSelectAuth(val) {
//        this.selectedAuthId = []
//        val.map(item => {
//          this.selectedAuthId.push(item.permissionId)
//        })
//      },
      handelNodeChecked(parm1,parm2){
        // this.selectedAuthId = parm2.checkedKeys

        console.log('选中ID11111111',parm2);
        if(parm2.halfCheckedKeys.length != 1){
          parm2.halfCheckedKeys.splice(0,1)
          this.selectedAuthId = parm2.halfCheckedKeys.concat(parm2.checkedKeys)
        }
        else{

          this.selectedAuthId = parm2.checkedKeys
        }
        console.log('选中ID',this.selectedAuthId);
      },
      handleSetAuth(parm) {
        this.authTitle = '设置权限'
        this.showSetAuth = true
        this.setAuthStatus = true
        this.currentTempItemId = parm.id
        // this.getAuthByTemp({
        //   tempid: parm.id,
        //   onsuccess: body => {
        //     this.authTableDate = body.data
        //     console.log(this.authTableDate);
        //     this.authTree({
        //       onsuccess: body => {
        //         if (body.data) {
        //           this.AuthNodeTree[0].subPermissions = body.data
        //           let temp=[]
        //           this.authTableDate.map(item=>{
        //             temp.push(item.id)
        //           })
        //           this.$nextTick(function () {
        //              this.haveSetedAuth = temp
        //           })
        //         } else {
        //         }
        //
        //       }
        //     })
        //   }
        // })
        this.getAllAuthTree(parm)
      },

      handleViewAuth(parm) {
        this.authTitle = '查看权限'
        this.showSetAuth = true
        this.setAuthStatus = false

        console.log(parm)
//        this.getAuthByTemp({
//          tempid: parm.id,
//          onsuccess: body => {
//            this.authTableDate = body.data
//          }
//        })
        this.getAllAuthTree(parm)


      },
      getAllAuthTree(parm){
        this.getAuthByTemp({
          tempid: parm.id,
          onsuccess: body => {
            this.authTableDate = body.data
            this.authTree({
              onsuccess: body => {
                // if (body.data) {
                //   this.AuthNodeTree[0].subPermissions = body.data
                //   let temp=[]
                //   this.authTableDate.map(item=>{
                //     temp.push(item.id)
                //   })
                //   this.$nextTick(function () {
                //     this.haveSetedAuth = temp
                //   })
                // } else {
                // }
                if (body.data) {
                  this.AuthNodeTree[0].subPermissions = body.data
                  let temp=[]
                  let tempPermissions = []
                  console.log("选中zhiaiqn",this.authTableDate );
                  this.authTableDate.map(item=>{
                    if(item!=null){
                      console.log('1111111111',item.name);
                      tempPermissions.push(item.permissionId)
                      let parentNodeDelete = (item.name!='管理后台') && (item.name!='B端用户管理') && (item.name!='组织管理') && (item.name!='配置管理') && (item.name!='酒店配置管理') && (item.name!='发现') && (item.name!='系统配置');
                      let parentNodeDelete1 = (item.name!='企业微信') && (item.name!='人证通') && (item.name!='E卡通') && (item.name!='酒店服务') && (item.name != '酒店设置')&& (item.name != '客房中心')&& (item.name != '双屏权限')&& (item.name != '小程序商城')
                      let parentNodeDelete2 = (item.name!='独立支付') && (item.name!='收款') && (item.tag!='independent_trade_deposit') && (item.name!='独立支付-交易记录')
                      console.log(parentNodeDelete && parentNodeDelete1);
                      if(parentNodeDelete && parentNodeDelete1 && parentNodeDelete2){
                        temp.push(item.id)
                        console.log('temp',temp);
                      }
                    }

                  })
                  this.selectedAuthId = tempPermissions
                  this.$nextTick(function () {
                    this.haveSetedAuth = temp
                    console.log("选中",this.haveSetedAuth );
                  })
                }
              }
            })
          }
        })
      },
      getList() {
        this.roleTemplateList({
          onsuccess: body => {
            this.roleTemplateTableList = body.data
          },
        })
      },
      submitAddOrChange() {
        if (this.dialogTitle == '修改角色模板') {
          this.modifyRole({
            roleId: this.addInfo.id,
            name: this.addInfo.name,
            alias: this.addInfo.alias,
            description: this.addInfo.description,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.getList()
              this.showAddNew = false;
            },
          })
        } else {
//          添加
          this.addRole({
            name: this.addInfo.name,
            alias: this.addInfo.alias,
            description: this.addInfo.description,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.getList()
              this.showAddNew = false;
            },
          })
        }

      },

      submitSetAuth() {
        let fields = {
          roleTempId: this.currentTempItemId,
          pemissionIds: this.selectedAuthId,
        }
        this.setTempAuth({
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
      HandelAdd() {
        this.showAddNew = true;
        this.dialogTitle = '新增角色模板'
        this.addInfo.name = ''
        this.addInfo.alias = ''
        this.addInfo.description = ''
        this.addInfo.id = ''
      },
      handeMmodify(parm) {
        this.addInfo.name = parm.name
        this.addInfo.alias = parm.alias
        this.addInfo.description = parm.description
        this.addInfo.id = parm.id

        this.showAddNew = true;
        this.dialogTitle = '修改角色模板'
      },
      handleSelectionChange(val) {
        this.selectItemList = val;
        console.log('selectItemList', this.selectItemList)

      },
    },
    mounted() {
      this.getList()
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-dialog__header {
    text-align: left;
  }

  .moduleItem {
    text-align: left;
    span {
      display: inline-block;
      width: 4rem;
      text-align: right;
      margin-right: 1rem;
      margin-bottom: 2rem;
    }
    .el-input {
      width: 60%;
    }
  }

  .roleModuleTitle {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 2rem;
    padding-bottom: 2rem
  }
</style>
