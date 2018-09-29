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
          node-key="id"
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
                    @click.stop="handelAdd(data)">
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

        <!--添加酒店-->
        <el-form label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="addNodeName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addNodeType" placeholder="请选择">
              <el-option
                v-for="item in shopType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <div class="bottomContent" v-if="addNodeType=='GROUP'">
            <h4>集团信息</h4>
            <el-form-item label="企业名称">
              <el-input v-model="groupInfo.enterpriseName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="账户编码">
              <el-input v-model="groupInfo.accountName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="企业简称">
              <el-input v-model="groupInfo.enterpriseShorterName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="企业官网">
              <el-input v-model="groupInfo.enterpriseNet" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <el-input v-model="groupInfo.linkmanName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人职务">
              <el-input v-model="groupInfo.linkmanJob" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input v-model="groupInfo.linkmanTel" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="bottomContent" v-if="addNodeType=='HOTEL'">
            <h4>酒店信息</h4>
            <el-form-item label="所属品牌">
              <el-select v-model="hotelInfo.belongBrand" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门店类型">
              <el-select v-model="hotelInfo.shopType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门店名称">
              <el-input v-model="hotelInfo.shopName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="门店编码">
              <el-input v-model="hotelInfo.shopCode" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="门店地址">
              <!--<el-input v-model="hotelInfo.shopAdress" placeholder="请输入内容"></el-input>-->
                <el-cascader
                  @change="adressChange"
                  :props="AdressProps"
                  :options="area"
                  change-on-select
                ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="hotelInfo.shopDetailAdress" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="地址编码">
              <el-input v-model="hotelInfo.adressCode" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="前台电话">
              <el-input v-model="hotelInfo.stageTel" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <el-input v-model="hotelInfo.linkmanName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人职务">
              <el-input v-model="hotelInfo.linkmanJob" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input v-model="hotelInfo.linkmanTel" placeholder="请输入内容"></el-input>
            </el-form-item>


          </div>
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
  import orgDetailedInfo from './orgDetailedInfo.vue'
  import area from '../../../../assets/json/area'

  export default {
    components: {
      orgDetailedInfo: orgDetailedInfo,

    },
    name: 'hotelInfo',

    data() {
      return {
        addNodeName: '',
        addNodeType: '',
        hotelInfo: {
          belongBrand: '',
          shopType: '',
          shopName: '',
          shopCode: '',
          shopAdress: '',
          shopDetailAdress: '',
          adressCode: '',
          stageTel: '',
          linkmanName: '',
          linkmanJob: '',
          linkmanTel: '',
        },
        groupInfo: {
          enterpriseName: '',
          accountName: '',
          enterpriseShorterName: '',
          enterpriseNet: '',
          linkmanName: '',
          linkmanJob: '',
          linkmanTel: '',
        },
        area: area,
        dialogVisible: false,
        filterText: '',
        input: '',
        hotelOrgTreeDate: [
          {
            id: "rootNodeId",
            parentId: "0",
            foreignId: "AAAA",
            name: "顶级组织",
            type: "ROOT",
            subOrgs: []
          }
        ],
        data3: [
          {
            id: "rootNodeId",
            parentId: "0",
            foreignId: "AAAA",
            name: "顶级组织",
            type: "ROOT",
            subOrgs: [{
              id: "1223",
              parentId: "6665",
              foreignId: "AAAA",
              name: "集团1",
              type: "GROUP",
              subOrgs: [
                {
                  id: "7788",
                  parentId: "345678",
                  foreignId: "AAAA",
                  name: "酒店1",
                  type: "HOTEL",
                  subOrgs: []
                }, {
                  id: "565667",
                  parentId: "345678",
                  foreignId: "AAAA",
                  name: "分组1",
                  type: "SEGMENT",
                  subOrgs: [{
                    id: "4656576",
                    parentId: "345678",
                    foreignId: "AAAA",
                    name: "部门1",
                    type: "DEPT",
                    subOrgs: []
                  }]
                }
              ]
            }]
          }

        ],
        defaultProps: {
          children: 'subOrgs',
          label: 'name'
        },
        AdressProps: {
          value: "label",
          label: "label",
          children: "children",
        },
        checkedNode: {},
        showAddNew: false,
        orgDialogClass: 'dialogOrg',

        defaultShopType: [
          {
            value: 'GROUP',
            label: '集团'
          }, {
            value: 'HOTEL',
            label: '酒店'
          }, {
            value: 'SEGMENT',
            label: '分组'
          }, {
            value: 'DEPT',
            label: ' 部门'
          }],
        currentAddNodeParentType: '',
        currentAddNodeParentId:'',
        options: []
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
        'hotelOrgTree',
        'addHotelOrgTreeNode',
        'hotelOrgNodeDetail',
        'modifyHotelOrgTreeNode',
      ]),
      adressChange(value) {
        console.log(value)
        this.hotelInfo.shopAdress = value
      },
      handelAdd(data) {
        console.log(data)
        this.currentAddNodeParentType = data.type
        this.currentAddNodeParentId = data.id
        this.showAddNew = true
      },
//      获取组织树
      getHotelOrgTree() {
        this.hotelOrgTree({
          onsuccess: body => {
            console.log(body.data)
            if (body.data) {
              this.hotelOrgTreeDate[0].subOrgs = body.data
            } else {
            }
          }
        })
      },

//      添加节点
      submitAdd() {

        console.log('this.addNodeType', this.addNodeType)
        if (this.addNodeType == 'GROUP') {
          let fields = {
            name: this.addNodeName||"",
            type: this.addNodeType||"",
            parentId: this.currentAddNodeParentId,
            info: {
              name: this.groupInfo.enterpriseName,
              type: this.groupInfo.enterpriseName,
              code: this.groupInfo.enterpriseName,
              addressCode: this.groupInfo.enterpriseName,
              tel: this.groupInfo.enterpriseName,
              province: '省',
              city:'省',
              area: '省',
              address: '地址明细',
              logoUrl: '',
            }
          }
        }
        else if(this.addNodeType == 'HOTEL'){
          let fields = {
            name: this.addNodeName||"",
            type: this.addNodeType||"",
            parentId: this.currentAddNodeParentId,
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
        }
        else {
          let fields = {
            name: this.addNodeName||"",
            type: this.addNodeType||"",
            parentId: this.currentAddNodeParentId,
            info: {
              name: "",
              type: "",
              code: "",
              addressCode: "",
              tel: "",
              province: "",
              city: "",
              area: "",
              address: "",
              logoUrl: ""
            }
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

//    树节点点击
      handleNodeClick(item, node, aaa) {
        console.log('item:', item);
        console.log('node:', node);
        console.log('aaa:', aaa);
      },

//  节点过滤
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
          width: 60%;
          .el-input {
            width: 100%;
          }
        }
      }
      .el-select-dropdown__list {
        padding-bottom: 20px;
      }
      .el-cascader{
        width: 100%;
      }
    }
  }
</style>
