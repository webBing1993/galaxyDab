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
          :data="hotelOrgTreeDate"
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
        <orgDetailed-Info
          @modify-hotel-org-treeNode="modifyNode"
          :currendNode="currendNode"
          :NodeId="currentAddNodeParentId"
          :Nav="BreadcrumbNavigation"
          :parentNodeList="allHotelOrgNode"
        ></orgDetailed-Info>
        <div v-if="this.currendNode.type=='GROUP'">
          <brand-Info
            :currendNode="currendNode"
            :NodeId="currentAddNodeParentId"></brand-Info>
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
                  v-for="item in BrandList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门店类型">
              <el-select v-model="hotelInfo.shopType" placeholder="请选择">
                <el-option
                  v-for="item in shopTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="门店名称">-->
              <!--<el-input v-model="hotelInfo.shopName" placeholder="请输入内容"></el-input>-->
            <!--</el-form-item>-->
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
            <!--<el-form-item label="前台电话">-->
              <!--<el-input v-model="hotelInfo.stageTel" placeholder="请输入内容"></el-input>-->
            <!--</el-form-item>-->
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
  import brandInfo from './brandInfo.vue'
  import area from '../../../../assets/json/area'

  export default {
    components: {
      orgDetailedInfo: orgDetailedInfo,
      brandInfo: brandInfo,

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
        hotelOrgTreeDate: [
          {
            "foreignId": "",
            "creator": null,
            "deleted": false,
            "name": "酒店组织",
            "type": "ROOT",
            "subOrganizations": [],
            "parentId": "0",
            "orgId": "1",
            "status": null
          }
        ],
        defaultProps: {
          children: 'subOrganizations',
          label: 'name',
          id: 'orgId'
        },
        AdressProps: {
          value: "label",
          label: "label",
          children: "children",
        },
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
        shopTypeList: [
          {
            value: 'UNION',
            label: '联体酒店'
          }, {
            value: 'GENERAL',
            label: '普通酒店'

          }
        ],
        currentAddNodeParentType: '',
        currentAddNodeParentId: '',
        currendNode: {},
        BrandList: [],
        showNodeDetailForEdit: false,
        allHotelOrgNode: [],
        BreadcrumbNavigation:''
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
        'hotelBrandList',
      ]),
      adressChange(value) {
        this.hotelInfo.shopAdress = value
      },
      handelAdd(data) {
        this.currentAddNodeParentType = data.type
        this.currentAddNodeParentId = data.orgId
        this.showAddNew = true
        this.getHotelBrandList()
//        添加初始化

        this.addNodeName = '';
        this.addNodeType = '';
        this.groupInfo.enterpriseName = '';
        this.groupInfo.accountName = '';
        this.groupInfo.enterpriseShorterName = '';
        this.groupInfo.enterpriseNet = '';
        this.groupInfo.linkmanName = '';
        this.groupInfo.linkmanJob = '';
        this.groupInfo.linkmanTel = '';

        this.hotelInfo.belongBrand = '';
        this.hotelInfo.shopType = '';
        this.hotelInfo.shopName = '';
        this.hotelInfo.shopCode = '';
        this.hotelInfo.shopAdress = '';
        this.hotelInfo.shopDetailAdress = '';
        this.hotelInfo.adressCode = '';
        this.hotelInfo.stageTel = '';
        this.hotelInfo.linkmanName = '';
        this.hotelInfo.linkmanJob = '';
        this.hotelInfo.linkmanTel = '';

      },
//      获取组织树
      getHotelOrgTree() {
        this.hotelOrgTree({
          onsuccess: body => {
            if (body.data) {
              this.hotelOrgTreeDate[0].subOrganizations = body.data
              this.$nextTick(() => {
                var temp = []
                this.getALLNode(this.hotelOrgTreeDate[0], temp)
                temp.push({
                  "name": "顶级组织",
                  "type": "ROOT",
                  "orgId": "0",
                })
                temp.map(item => {
                  if (item.type == 'SEGMENT' || item.type == "ROOT"||item.type == "GROUP") {
                    this.allHotelOrgNode.push(item)
                  }
                })
              })


            } else {
            }
          }
        })
      },

//      添加节点
      submitAdd() {
        if(this.addNodeType==null||this.addNodeType==""){
          this.$message({
            message:"请选择组织类型",
            type: 'error'
          });
          return false
        }else if(this.addNodeName==""){
          this.$message({
            message:"组织名称不可为空",
            type: 'error'
          });
          return false
        }

        let fields = {}
        if (this.addNodeType == 'GROUP') {
          fields = {
            name: this.addNodeName || "",
            type: this.addNodeType || "",
//            parentId: this.currentAddNodeParentId,
            parentId: '1',
            info: {
              name: this.groupInfo.enterpriseName,
              type: this.addNodeType,
              code: this.groupInfo.enterpriseName,
              addressCode: this.groupInfo.enterpriseName,
              tel: this.groupInfo.enterpriseName,
              province: this.hotelInfo.shopAdress[0] || '',
              city: this.hotelInfo.shopAdress[1] || '',
              area: "",
              address: this.groupInfo.shopDetailAdress,
              logoUrl: '',
              contactName:this.groupInfo.linkmanName,
              contactPhone:this.groupInfo.linkmanTel,
              contactPosition:this.groupInfo.linkmanJob,
              memo:this.groupInfo.enterpriseShorterName||"",
              website:this.groupInfo.enterpriseNet||"",
            }
          }
        }
        else if (this.addNodeType == 'HOTEL') {
          fields = {
            name: this.addNodeName || "",
            type: this.addNodeType || "",
            parentId: this.currentAddNodeParentId,
            info: {
              name: this.hotelInfo.shopName || '',
              type: this.hotelInfo.shopType || '',
              code: this.hotelInfo.shopCode || '',
//              addressCode: this.hotelInfo.shopAdress?this.hotelInfo.shopAdress.join(',') : '',
              addressCode: this.hotelInfo.adressCode,
              tel: this.hotelInfo.shopName,
              province: this.hotelInfo.shopAdress[0] || '',
              city: this.hotelInfo.shopAdress[1] || '',
              area: "",
              address: this.hotelInfo.shopDetailAdress,
              logoUrl: "",
//
              contactName:this.hotelInfo.linkmanName,
              contactPhone:this.hotelInfo.linkmanTel,
              contactPosition:this.hotelInfo.linkmanJob,
              brandId:this.hotelInfo.belongBrand,
            }
          }
        }
        else {
          fields = {
            name: this.addNodeName || "",
            type: this.addNodeType || "",
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
        this.modifyHotelOrgTreeNode({
          fields: fields,
          onsuccess: body => {
            this.getHotelOrgTree()
          }
        })
      },

//    树节点点击
      handleNodeClick(item, node, aaa) {
        console.log('nodenode', item)
//        let temp = []
//        let temp2=[]
//        this.getParNode(node, temp)
//        let len=temp.length
//        for (var i=len;i>0;i--){
//          temp2.push(temp[i])
//        }
//        console.log('temp2',temp2)
//        this.BreadcrumbNavigation=temp2.join(' > ').slice(0,len-3)


        if (item.orgId == "1") {
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

      getParNode(node, parentList) {
        if (!node.parent) {
          return
        } else {
          parentList.push(node.parent.data.name)
          this.getParNode(node.parent, parentList)
          return parentList
        }
      },

      getALLNode(tree, nodeList) {
        if (!tree.subOrganizations) {
          return
        } else {
          for (var i = 0; i < tree.subOrganizations.length; i++) {
            nodeList.push(tree.subOrganizations[i])
            this.getALLNode(tree.subOrganizations[i], nodeList)
          }
          return nodeList
        }

      },

//  节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      getHotelBrandList() {
        this.hotelBrandList({
          orgId: this.currentAddNodeParentId,
          onsuccess: body => {
            this.BrandList = body.data
          }

        })
      },
      modifyNode() {
        this.getHotelOrgTree();
      }

    },
    mounted() {
      this.getHotelOrgTree();


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
        width: 60%;
      }
    }
  }
</style>
