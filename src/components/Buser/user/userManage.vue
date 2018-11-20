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
          :data="userManageTreeDate"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :highlight-current="true"
          ref="tree" @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="rightWrap">
      <!--<router-view></router-view>-->
      <div v-if="showNodeDetailForEdit">
        <user-Info
          :currendNode="currendNode"
          :parentNode="parentNode"
          :NodeId="currentAddNodeParentId"></user-Info>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import userInfo from './userInfo.vue'

  export default {
    components: {
      userInfo: userInfo,
    },
    name: 'hotelInfo',

    data() {
      return {
        addNodeName: '',
        addNodeType: '',
        dialogVisible: false,
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
        showAddNew: false,
        orgDialogClass: 'dialogOrg',

        currentAddNodeParentType: '',
        currentAddNodeParentId: '',
        currendNode: {},
        parentNode: [],
        showNodeDetailForEdit: false,
      }
    },
    computed: {
      ...mapState({}),
    },
    methods: {
      ...mapActions([
        'UserManageTree',
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
      getUserManageTree() {
        this.UserManageTree({
          onsuccess: body => {
            if (body.data) {
              this.userManageTreeDate[0].subOrganizations = body.data;
              this.parentNode = body.data;
            } else {
            }
          }
        })
      },

//    树节点点击
      handleNodeClick(item, node, aaa) {
        item.orgId = item.id
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
      this.getUserManageTree();
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
