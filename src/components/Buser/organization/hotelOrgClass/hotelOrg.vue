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
          :data="data3"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :check-on-click-node="true"
          :highlight-current="true"
          ref="tree2"
          @node-click="handleNodeClick"
        >
          <!--@check-change="choseNode(item,node,aaa)"-->
          <span class="custom-tree-node" slot-scope="{node, data}">
                <span>{{ node.label }}</span>
                <span class="addBtn">
                  <el-button
                    size="mini"
                    @click.stop="handelAdd">
                    +
                  </el-button>
              </span>
            </span>
        </el-tree>
      </div>
    </div>
    <div class="rightWrap">
      <router-view></router-view>
      <orgDetailed-Info></orgDetailed-Info>
    </div>
    <!--新增弹窗-->
    <div id="orgDialog">
      <el-dialog
        title="新增"
        :visible.sync="showAddNew"
        width="40%" :custom-class="orgDialogClass">
        <div>
          <span class="right">名称：</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span class="right">类型：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="bottomContent" v-if="value=='group'">
          <h4>集团信息</h4>
          <div class="item">
            <span class="right">企业名称：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">账户编码：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业简称：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业官网：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人姓名：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人职务：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人电话：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!--添加酒店-->
        <div class="bottomContent" v-if="value=='hotel'">
          <h4>酒店信息</h4>
          <div class="item">
            <span class="right">所属品牌：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">门店类型：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">门店名称：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">门店编码：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业微信id：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item address">
            <span class="right">门店地址：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">详细地址：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">地址编码：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">前台电话：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人姓名：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人职务：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人电话：</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import orgDetailedInfo from './orgDetailedInfo.vue'

  export default {
    components: {
      orgDetailedInfo: orgDetailedInfo,

    },
    name: 'hotelInfo',

    data() {
      return {
        dialogVisible: false,
        filterText: '',
        input: '',
        hotelOrgTreeDate: [],
        data3: [
          {
            "name": "权限列表",
            "subPermissions": [
              {
                "permissionId": "1",
                "name": "第一权限",
                "tag": "root:one",
                "icon": null,
                "description": null,
                "nodeType": "MENU",
                "sortCode": null,
                "subPermissions": [
                  {
                    "name": "第一权限子权限",
                    "tag": "root:one:one",
                    "icon": null,
                    "description": null,
                    "nodeType": "URL",
                    "sortCode": null,
                    "subPermissions": [],
                    "permissionId": "3"
                  }
                ],
              },
              {
                "permissionId": "2",
                "name": "第二权限",
                "tag": "root:two",
                "icon": null,
                "description": null,
                "nodeType": "MENU",
                "sortCode": null,
                "subPermissions": [],
              }, {
                "name": "第三权限",
                "tag": "root:two",
                "icon": null,
                "description": null,
                "nodeType": "MENU",
                "sortCode": null,
                "subPermissions": [],
                "permissionId": "2"
              }]
          }
        ],
        defaultProps: {
          children: 'subPermissions',
          label: 'name'
        },
        checkedNode: {},
        showAddNew: false,
        orgDialogClass: 'dialogOrg',
        options: [{
          value: 'group',
          label: '集团'
        }, {
          value: 'hotel',
          label: '酒店'
        }, {
          value: '选项3',
          label: '部门'
        }, {
          value: '选项4',
          label: '旅业'
        }],
        value: ''
      }
    },
    computed: {
      ...mapState({}),
    },
    methods: {
      ...mapActions([
        'hotelOrgTree',
        'addHotelOrgTreeNode',
        'hotelOrgNodeDetail',
        'modifyHotelOrgTreeNode',
      ]),
      handelAdd() {
//      @click="() => append(data)" v-show="node===checkedNode"
        this.showAddNew = true
      },
//      获取组织树
      getHotelOrgTree() {
        this.hotelOrgTree({
          onsuccess: body => {
            console.log(body.data)
          }
        })
      },

//      添加节点
      addTreeNode() {
        let fields = {
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
            logoUrl: "qwewrerere1222", "memo": "", "website": "www.baidu.com"
          }
        }
        this.addHotelOrgTreeNode({
          fields: fields,
          onsuccess: body => {
            this.getHotelOrgTree()
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
        this.modifyHotelOrgTreeNode({
          fields: fields,
          onsuccess: body => {
            this.getHotelOrgTree()
          }
        })
      },

      handleNodeClick(item, node, aaa) {
        console.log('item:', item);
        console.log('node:', node);
        console.log('aaa:', aaa);
      },
      //树节点点击

      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      append(data) {
        this.showAddNew = true
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.subPermissions || parent.data;
        const index = children.findIndex(d => d.permissionId === data.permissionId);
        children.splice(index, 1);
      },
    },
    mounted() {
      this.getHotelOrgTree()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
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
          width: 25%;
          .el-input {
            width: 100%;
          }
        }
      }
    }
  }
</style>
