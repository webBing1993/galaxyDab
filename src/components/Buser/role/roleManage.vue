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
      <div style="margin-top:1rem">
        <el-tree
          class="filter-tree"
          :data="roleManageTreeDate"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :highlight-current="true"
          ref="tree2" @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="rightWrap">
      <!--<router-view></router-view>-->
      <div v-if="showNodeDetailForEdit">
        <role-Info
          :currendNode="currendNode"
          :NodeId="currentAddNodeParentId"></role-Info>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import roleInfo from './roleInfo.vue'

  export default {
    components: {
      roleInfo: roleInfo,
    },
    name: 'roleMamage',

    data() {
      return {
        addNodeName: '',
        addNodeType: '',
        dialogVisible: false,
        filterText: '',
        roleManageTreeDate: [
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
                "name": "酒店1",
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
                "name": "酒店1",
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

        currentAddNodeParentType: '',
        currentAddNodeParentId: '',
        currendNode: {},
        showNodeDetailForEdit: false,
      }
    },
    computed: {
      ...mapState({}),
    },
    methods: {
      ...mapActions([
        'roleManageTree',
      ]),

      adressChange(value) {
        this.hotelInfo.shopAdress = value
      },

      handelAdd(data) {
        this.currentAddNodeParentType = data.type
        this.currentAddNodeParentId = data.orgId
        this.showAddNew = true

      },
//      获取树
      getroleManageTree() {
        this.roleManageTree({
          onsuccess: body => {
            if (body.data) {
              this.roleManageTreeDate[0].subOrganizations = body.data

            } else {
            }
          }
        })
      },

//    树节点点击
      handleNodeClick(item, node, aaa) {
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
      },

    },
    mounted() {
      this.getroleManageTree();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="less" scoped>
  .third_wrap{

  }
  .el-button--mini{
    padding: 2px 10px;
    text-align: center;
  }
  .el-button--primary{
    background: #0eb4eb;
    border: 1px solid #0eb4eb;
  }
</style>
