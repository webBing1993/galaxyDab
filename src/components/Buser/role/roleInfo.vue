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
            placeholder="筛选角色"
            v-model="filterText">
          </el-input>
          <el-button type="success" @click="handleAdd">添加角色</el-button>
          <el-button type="primary" :disabled="selectItemList.length==0" @click="handelCopeTemplate">从模板复制</el-button>
          <el-button type="warning" :disabled="selectItemList.length==0" @click="handelLinkTemplate">从模板引用</el-button>
        </el-row>
      </div>

      <el-table :data="roleTableList" border stripe @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="count" label="id"></el-table-column>
        <el-table-column property="phone" label="名称"></el-table-column>
        <el-table-column property="depart" label="组织名称"></el-table-column>
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
      title="组织名称"
      :visible.sync="showSetRole"
      width="40%">
      <el-table :data="TemplateList" border stripe @selection-change="handleSelectTemplate">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="roleTemplateId" label="角色ID"></el-table-column>
        <el-table-column property="name" label="角色名称"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="showSetRole = false">取 消</el-button>
        <el-button type="primary" @click="submitSaveTemplate">保 存</el-button>
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
        checkAll: false,
        editStatus: false,
        checkedCities: ['上海', '北京'],
        isIndeterminate: true,
        showSetRole: false,
        showAddNew: false,
        filterText: '',
        roleTableList: [
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
        selectedTemplate: [],
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
        TemplateList:[],
        copeStatus:false
      }
    },
    methods: {
      ...mapActions([
        'roleList',
        'addrole',
        'changeRole',
        'roleTemplateList',
        'copyroletemp',
        'refersroletemp',
      ]),
      getTemplateList(){
        this.roleTemplateList({
          onsuccess: body => {
            this.TemplateList=body.data
          },
        })
      },
      getTableRoleList() {
        this.roleList({
          orgid: this.orgId,
          onsuccess: body => {
//            this.roleTableList = body.data
          }

        })
      },

      submitAdd() {
        if(this.editStatus){
          this.changeRole({
            id: this.addRoleInfo.id,
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
        }else {
          this.addrole({
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

      submitSaveTemplate(){
        if(this.copeStatus){
          this.copyroletemp({

          })
        }else {
          this.refersroletemp({

          })
        }
      },

      handleAdd() {
        this.title = '新增角色'
        this.showAddNew = true
        this.editStatus = false
//        数据初始化
        this.addRoleInfo.id=''
        this.addRoleInfo.name=''
        this.addRoleInfo.alias=''
        this.addRoleInfo.description=''
      },

      handelCopeTemplate(){
        this.showSetRole=true
        this.getTemplateList()
        this.copeStatus=true
      },
      handelLinkTemplate(){
        this.showSetRole=true
        this.getTemplateList()
        this.copeStatus=false

      },
      handleChange(parm) {
        console.log(parm)
        this.title = '编辑角色'
        this.showAddNew = true;
        this.editStatus = true
      },
      handleSetAuth(parm) {

      },
      handleViewAuth(parm) {

      },

      handleSelectionChange(val) {
        this.selectItemList = val;
        console.log('selectItemList', this.selectItemList)
      },
      handleSelectTemplate(val) {
        this.selectedTemplate = val;
        console.log('选择的模板',this.selectedTemplate)
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
