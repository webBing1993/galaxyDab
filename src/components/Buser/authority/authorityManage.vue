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
          :data="authTreeDate"
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
        <auth-Info
          @reLoadAuthTree="reLoadAuthTree"
          :currendNode="currendNode"
          :NodeId="currentAddNodeParentId"></auth-Info>
      </div>
    </div>
    <div id="orgDialog">
      <el-dialog
        title="新增权限"
        :visible.sync="showAddNew"
        width="40%">
        <el-form ref="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="authInfo.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="TAG">
            <el-input v-model="authInfo.tag" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图标地址">
            <el-input v-model="authInfo.iconAdress" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="authInfo.linkAdress" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-select v-model="authInfo.requestMethods" placeholder="请选择">
              <el-option
                v-for="item in requestType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="authInfo.describe" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="showAddNew = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import authInfo from './authorityInfo.vue'

  export default {
    components: {
      authInfo: authInfo,
    },
    name: 'hotelInfo',

    data() {
      return {
        filterText: '',
        authTreeDate: [
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
          }
        ],
        defaultProps: {
          children: 'subPermissions',
          label: 'name',
          id: 'id'
        },
        authInfo:{
          name:'',
          tag:'',
          iconAdress:'',
          linkAdress:'',
          requestMethods:'',
          describe:'',
        },
        showAddNew: false,

        currentAddNodeParentType: '',
        currentAddNodeParentId: '',
        currendNode: {},

        showNodeDetailForEdit: false,

        requestType: [{
          value: 'GET',
          label: 'GET'
        }, {
          value: 'POST',
          label: 'POST'
        },
          {
            value: 'DELETE',
            label: 'DELETE'
          },
          {
            value: 'PUT',
            label: 'PUT'
          }],
      }
    },
    computed: {
      ...mapState({}),
      shopType() {
        if (this.currentAddNodeParentType == 'GROUP') {
//          去除集团
          return [{value: 'HOTEL', label: '酒店'}, {value: 'SEGMENT', label: '分组'}, {value: 'DEPT', label: ' 部门'}]
        }
        if (this.currentAddNodeParentType == 'SEGMENT') {
//          去除集团
          return [{value: 'HOTEL', label: '酒店'}, {value: 'SEGMENT', label: '分组'}, {value: 'DEPT', label: ' 部门'}]
        }
        if (this.currentAddNodeParentType == 'DEPT') {
          return [{value: 'DEPT', label: ' 部门'}]
        }
        if (this.currentAddNodeParentType == 'HOTEL') {
          return [{value: 'DEPT', label: ' 部门'}]
        }
        if (this.currentAddNodeParentType == 'ROOT') {
          return [{value: 'GROUP', label: '集团'}, {value: 'HOTEL', label: '酒店'}]
        }
      },
    },
    methods: {
      ...mapActions([
        'authTree',
        'addauth',
//        'authNodeDetail',
//        'modifyauthTreeNode',
//        'hotelBrandList',
      ]),
      reLoadAuthTree(){
        this.getauthTree()
      },

      adressChange(value) {
        this.hotelInfo.shopAdress = value
      },
      handelAdd(data) {
        this.currentAddNodeParentType = data.type
        this.currentAddNodeParentId = data.id
        this.showAddNew = true

//        数据初始化
        this.authInfo.name='';
        this.authInfo.tag='';
        this.authInfo.iconAdress='';
        this.authInfo.linkAdress='';
        this.authInfo.requestMethods='';
        this.authInfo.describe='';

      },
//      获取组织树
      getauthTree() {
        this.authTree({
          onsuccess: body => {
            if (body.data) {
              this.authTreeDate[0].subPermissions = body.data
            } else {
            }
          }
        })
      },

//      添加节点
      submitAdd() {
        let fields = {
          "parentId":this.currentAddNodeParentId,
          "name":this.authInfo.name,
          "requestMethod":this.authInfo.requestMethods,
          "description":this.authInfo.describe,
          "tag":this.authInfo.tag,
          "nodeType":'',
          "url":this.authInfo.linkAdress,

        }
        this.addauth({
          fields: fields,
          onsuccess: body => {
            this.getauthTree()
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
      modifyTreeNode() {
        let fields = {
          id: "1000000100",
          name: "组织一",
          type: "GROUP",
          parentId: "1234567",
          info: {
            name: "组织一",
            type: "GENERAL",
            code: "ABC",
            addressCode: "SHANGHAI",
            tel: "021-56387283",
            province: "SHANGHAI",
            city: "SHANGHAI",
            area: "HUANGPU",
            address: "KONGJIANG ROAD 1555 HUANGPU SHANGHAI", "contactName": "name", "contactPhone": "182877373",
            logoUrl: "qwewrerere1222", "memo": "",
            website: "www.baidu.com",
//   比添加多四个字段
            contactName: "name",
            contactPhone: "182877373",
            memo: "",
          }
        }
        this.modifyauthTreeNode({
          fields: fields,
          onsuccess: body => {
            this.getauthTree()
          }
        })
      },

//    树节点点击
      handleNodeClick(item, node, aaa) {
        if (item.id == "0") {
          this.$message({
            message: "顶级组织不可编辑",
            type: 'error'
          });
          return false
        } else {
          this.showNodeDetailForEdit = true
          this.currentAddNodeParentId = item.id
          this.currendNode = item
        }
      },


//  节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },


      modifyNode() {
        this.getauthTree();
      }

    },
    mounted() {
      this.getauthTree();

    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="less" scoped>
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
    .el-select{
      width: 60%;
    }
    .el-input {
      width: 60%;
      /*margin-bottom: 1rem;*/
    }
  }
</style>
