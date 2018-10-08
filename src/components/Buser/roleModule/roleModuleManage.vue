<template>
  <div style="padding: 1rem">
    <h2 class="roleModuleTitle">角色模板列表</h2>
    <div style="text-align: left;margin-bottom: 2rem">
      <el-button type="primary" @click="HandelAdd">新增角色模板</el-button>
    </div>
    <el-table :data="gridData" border stripe @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column property="orgId" label="ID" width="150"></el-table-column>
      <el-table-column property="name" label="名称"></el-table-column>
      <el-table-column property="alias" label="别名"></el-table-column>
      <el-table-column property="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handeMmodify(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">设置权限</el-button>
          <el-button type="text" size="small">查看权限</el-button>
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
        gridData: [],
        dialogVisible: false,
        defaultProps: {
          children: 'subPermissions',
          label: 'name'
        },
        addInfo:{
          id:'',
          name:'',
          alias:'',
          description:'',
        },
        dialogTitle: '',
        selectItemList: '',
      }
    },
    methods: {
      ...mapActions([
        'roleTemplateList',
        'addRole',
        'modifyRole',
      ]),

      getList(){
        this.roleTemplateList({
          onsuccess: body => {
            this.gridData=body.data
          },
        })
      },
      submitAddOrChange(){
        if(this.dialogTitle == '修改角色模板'){
            this.modifyRole({
              id:this.addInfo.id,
              name:this.addInfo.name,
              alias:this.addInfo.alias,
              description:this.addInfo.description,
              onsuccess: body => {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.getList()
                this.showAddNew=false;
              },
            })
        }else {
//          添加
          this.addRole({
            name:this.addInfo.name,
            alias:this.addInfo.alias,
            description:this.addInfo.description,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.getList()
              this.showAddNew=false;
            },
          })
        }

      },
    HandelAdd(){
      this.showAddNew=true;
      this.dialogTitle='新增角色模板'
      this.addInfo.name=''
      this.addInfo.alias=''
      this.addInfo.description=''
      this.addInfo.id=''
    },
      handeMmodify(parm) {
        this.addInfo.name=parm.name
        this.addInfo.alias=parm.alias
        this.addInfo.description=parm.description
        this.addInfo.id=parm.orgId

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
    watch: {
    }
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
    text-align: left;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 2rem;
    padding-bottom: 2rem
  }
</style>
