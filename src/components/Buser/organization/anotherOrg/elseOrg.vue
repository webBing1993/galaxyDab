<!--酒店组织对应区域，第三级包裹-->
<template>
  <div class="third_wrap">
    <div class="treeWrap">
      <div class="orgTitle">
        <span class="catalogue">搜索</span>
        <el-input
          placeholder="输入关键字进行筛选"
          v-model="filterText">
        </el-input>
      </div>
      <div style="margin-top:1rem;float: left;min-width: 400px">
        <el-tree
          class="filter-tree"
          :data="otherOrgTreeDate"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :check-on-click-node="true"
          :highlight-current="true"
          ref="tree"
          @node-click="handleNodeClick"
        >
          <!--@check-change="choseNode(item,node,aaa)"-->
          <span class="custom-tree-node" slot-scope="{node, data}">
                <span>{{ node.label }}</span>
                <span class="addBtn">
                  <el-button
                    size="mini"
                    @click.stop="handelAdd(data)">
                    +
                  </el-button>
              </span>
            </span>
        </el-tree>
      </div>
    </div>
    <div class="rightWrap">
      <div v-if="showNodeDetailForEdit">
        <div class="rightInfo">
          <div class="topTitle">
            <h4>集团 > 品牌 > 酒店</h4>
          </div>
          <div class="centerContent">
            <el-form label-width="100px" label-position="left">
              <el-form-item label="ID">
                <el-input v-model="currendNode.orgId" disabled></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="currendNode.name"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-input v-model="disableEditType" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-button type="success" plain @click="submitModify">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--新增弹窗-->
    <div id="orgDialog">
      <el-dialog
        title="新增"
        :visible.sync="showAddNew"
        width="40%" :custom-class="orgDialogClass">
        <!--添加酒店-->
        <el-form label-width="100px">
          <el-form-item label="上级组织">
            <el-input v-model="currendNode.name" placeholder="请输入内容" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="addNodeName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addNodeType" placeholder="请选择">
              <el-option
                v-for="item in companyType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="showAddNew = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';


  export default {
    components: {

    },
    name: 'hotelInfo',

    data() {
      return {
        addNodeName: '',
        addNodeType: '',
        dialogVisible: false,
        filterText: '',
        otherOrgTreeDate: [
          {
            "foreignId": "",
            "creator": null,
            "deleted": false,
            "name": "顶级组织",
            "type": "ROOT",
            "subOrganizations": [
              {
                "foreignId": "",
                "creator": null,
                "deleted": false,
                "name": "国泰",
                "type": "GENERAL",
                "subOrganizations": [],
                "parentId": "0",
                "orgId": "1",
                "status": null
              },
              {
                "foreignId": "",
                "creator": null,
                "deleted": false,
                "name": "大江",
                "type": "GENERAL",
                "subOrganizations": [],
                "parentId": "0",
                "orgId": "2",
                "status": null
              }
            ],
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

        showAddNew: false,
        orgDialogClass: 'dialogOrg',
        companyType: [
          {
            value: 'UNION',
            label: '旅业'
          },
          {
            value: 'UNION1',
            label: '施工单位'
          },
          {
            value: 'GENERAL',
            label: '部⻔'
          }
        ],

        currentAddNodeParentType: '',
        currentAddNodeParentId: '',
        currendNode: {},
        showNodeDetailForEdit: false,
        disableEditType:'',
      }
    },
    computed: {
      ...mapState({}),
//      顶级组织可以是旅业或施工单位，旅业、施工单位下可创建部⻔，部⻔ 下面不能创建旅业和施工单位

    },
    methods: {
      ...mapActions([
        'otherTree',
        'addotherNode',
        'modifyother',

      ]),

      handelAdd(data) {
        this.currentAddNodeParentType = data.type
        this.currentAddNodeParentId = data.orgId
        this.showAddNew = true
        this.currendNode = data


      },
//      获取组织树
      getotherOrgTree() {
        this.otherTree({
          onsuccess: body => {
            if (body.data) {
//              this.otherOrgTreeDate[0].subOrganizations = body.data
            } else {
            }
          }
        })
      },

//      添加节点
      submitAdd() {
        this.addotherNode({
          name:this.addNodeName,
          parentId:this.currentAddNodeParentId,
          onsuccess: body => {
            this.getotherOrgTree()
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
      },

//      修改树节点
      submitModify() {
        this.modifyother({
          id: this.currendNode.orgId,
          name: this.currendNode.name,
          parentId: this.currendNode.parentId,
          onsuccess: body => {
            this.getotherOrgTree()
          }
        })
      },

//    树节点点击
      handleNodeClick(item, node, aaa) {
        console.log(item)
        if (item.orgId == "0") {
          this.$message({
            message: "顶级组织不可编辑",
            type: 'error'
          });
          return false
        } else {
          this.showNodeDetailForEdit = true
          this.currentAddNodeParentId = item.orgId
          this.currendNode = item
        }
      },


//  节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },
    mounted() {
      this.getotherOrgTree();


    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="less">
  .addBtn {
    display: none;
  }

  .custom-tree-node:hover .addBtn {
    display: block;
  }

  .third_wrap {

  }

  .el-button--mini {
    padding: 2px 10px;
    text-align: center;
  }

  .el-button--primary {
    background: #0eb4eb;
    border: 1px solid #0eb4eb;
  }

  .third_wrap {
    #orgDialog {
      .dialogOrg {
        text-align: left;
        .right {
          display: inline-block;
          text-align: right;
          width: 5.5rem;
        }
        .el-input {
          width: 60%;
          margin-bottom: 1rem;
        }
        .el-select {
          width: 60%;
          .el-input {
            width: 100%;
          }
        }
      }
      /deep/ .el-select-dropdown__list {
        padding-bottom: 20px;
      }
      .el-cascader {
        width: 100%;
      }
    }
  }
</style>
