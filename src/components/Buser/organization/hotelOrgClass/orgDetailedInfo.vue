<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>酒店组织详情</h4>
    </div>

    <div class="centerContent">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="currentNodeDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="disableEditType" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--集团信息-->
    <div class="bottomContent" v-if="currentNodeDetail.type=='GROUP'">
      <h4>集团信息</h4>
      <el-form label-width="100px" label-position="left">
        <el-form-item label="企业名称">
          <el-input v-model="currentNodeDetail.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="账户编码">
          <el-input v-model="currentNodeDetail.info.code" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input v-model="currentNodeDetail.info.memo" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="企业官网">
          <el-input v-model="currentNodeDetail.info.website" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="联系人姓名">
          <el-input v-model="currentNodeDetail.info.contactName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务">
          <el-input v-model="currentNodeDetail.info.contactPosition" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="currentNodeDetail.info.contactPhone" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--酒店信息-->
    <div class="bottomContent" v-if="currentNodeDetail.type=='HOTEL'">
      <h4>酒店信息</h4>
      <el-form label-width="100px" label-position="left">
        <el-form-item label="所属品牌：">
          <el-select v-model="currentNodeDetail.info.brandId" placeholder="请选择">
            <el-option
              v-for="item in BrandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店类型：">
          <el-select v-model="currentNodeDetail.info.type" placeholder="请选择">
            <el-option
              v-for="item in shopTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="门店名称：">-->
          <!--<el-input v-model="currentNodeDetail.name" placeholder="请输入内容"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="门店编码：">
          <el-input v-model="currentNodeDetail.info.code" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="门店地址：">
          <el-cascader
            v-model="shopAdress"
            @change="adressChange"
            :props="AdressProps"
            :options="area"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="currentNodeDetail.info.address" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地址编码：">
          <el-input v-model="currentNodeDetail.info.addressCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!--<el-form-item label="前台电话：">-->
          <!--v-model="currentNodeDetail.info.tel"-->
          <!--<el-input  placeholder="请输入内容"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="联系人姓名：">
          <el-input v-model="currentNodeDetail.info.contactName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务：">
          <el-input v-model="currentNodeDetail.info.contactPosition" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：">
          <el-input v-model="currentNodeDetail.info.contactPhone" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

    </div>
    <!--确认按钮-->
    <div>
      <el-button type="success" plain @click="submitModify">保存</el-button>
      <!--:disabled="currentNodeDetail.type!='HOTEL'"-->
      <el-button type="primary" plain disabled="" @click="changeBrandRelation=true">修改所属关系</el-button>
    </div>

    <!--修改所属关系-->
    <!--<el-dialog-->
    <!--title="修改所属关系"-->
    <!--:visible.sync="changeBrandRelation"-->
    <!--width="30%">-->

    <!--<div class="dialog_item">-->
    <!--<span class="left">酒店ID：</span><span>{{orgId}}</span>-->
    <!--</div>-->
    <!--<div class="dialog_item">-->
    <!--<span class="left">酒店名称：</span><span>{{currendNode.name}}</span>-->
    <!--</div>-->
    <!--<div class="dialog_item">-->
    <!--<span class="left">父节点：</span>-->
    <!--<el-select v-model="toParentId" placeholder="请选择">-->
    <!--<el-option-->
    <!--v-for="item in alternativeParentNode"-->
    <!--:key="item.value"-->
    <!--:label="item.name"-->
    <!--:value="item.orgId">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click.native="changeBrandRelation = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="changebelongRelation">确 定</el-button>-->
    <!--</span>-->

    <!--</el-dialog>-->


    <el-dialog
      :visible.sync="changeBrandRelation"
      width="80%"
      title="修改所属关系"
    >

      <div class="clearfix">
        <!--  酒店列表-->
        <div class="fl dialog_left">

          <el-tree
            class="filter-tree"
            :data="alternativeParentNode"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :highlight-current="true"
            @node-click="handleNodeClick">
          </el-tree>

        </div>

        <!-- 选中的所属酒店-->
        <div class="fr dialog_right">
          <div class="currentList">
            {{getCurrendNode.name}}
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click.native="changeBrandRelation = false">取 消</el-button>
        <el-button type="primary" @click="changebelongRelation">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import area from '../../../../assets/json/area'

  export default {
    name: 'orgDetailedInfo',
    props: {

      NodeId: {
        type: [String],
        default: ''
      },

      Nav: {
        type: [String],
        default: ''
      },
      currendNode: {
        type: [Object, Array,String],
        default: () => {
        }
      },
      parentNodeList: {
        type: [Object, Array,String],
        default: () => []
      }
    },
    data() {
      return {
        choseType: {name: '集团', value: 'group'},
        gridData: [],
        changeBrandRelation: false,
        dialogVisible: false,
        input: '',
        area: area,
        shopAdress:[],
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
        shopTypeList: [
          {
            value: 'UNION',
            label: '联体酒店'
          }, {
            value: 'GENERAL',
            label: '普通酒店'

          }
        ],
        BrandList: [],
        value: '',

        orgId: '',
        currentNodeDetail: {},
        getCurrendNode: {},
        disableEditType: '',
        alternativeParentNode: [],//备选父节点
        toParentId: '',

      }
    },
    computed: {
      ...mapState({}),
      disableEditType(){
        if(this.currentNodeDetail.type=='HOTEL') return "酒店"
        if(this.currentNodeDetail.type=='GROUP') return "集团"
        if(this.currentNodeDetail.type=='DEPT') return "部门"
        if(this.currentNodeDetail.type=='SEGMENT') return "分组"
      }

    },
    methods: {
      ...mapActions([
        'hotelOrgNodeDetail',
        'modifyHotelOrgTreeNode',
        'changeRelationship',
        'hotelBrandList',
      ]),
//      获取所属品牌
      getHotelBrandList() {
        this.hotelBrandList({
          orgId: this.orgId,
          onsuccess: body => {
            this.BrandList = body.data
          }

        })
      },
//      获取当前详情
      getCurrentDetail() {
        this.hotelOrgNodeDetail({
          orgid: this.orgId,
          onsuccess: body => {
            this.currentNodeDetail = body.data
            if(this.currentNodeDetail.type=='HOTEL'){
              this.getHotelBrandList()
            }
            this.shopAdress.push(this.currentNodeDetail.info.province)
            this.shopAdress.push(this.currentNodeDetail.info.city)
            this.shopAdress.push(this.currentNodeDetail.info.area)
            let typelist = [
              {value: 'GROUP', label: '集团'}, {value: 'HOTEL', label: '酒店'}, {
                value: 'SEGMENT', label: '分组'
              }, {value: 'DEPT', label: ' 部门'}]
            typelist.map(item => {
              if (item.value == this.currentNodeDetail.type) {
                this.disableEditType = item.label
              }
            })

          },
          onfail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });
          }
        })
      },

//      修改所属关系
      changebelongRelation() {
        let fields={
          id:this.orgId,//要更改所属关系的组织
          name:this.currendNode.name,//名称
          type:"HOTEL",//类型
          parentId:this.toParentId,//它将要更改到的组织orgId
          wxHotelId:this.currendNode.foreignId//如果是酒店，就把酒店详情info里的wxHotelId带上
        }
        this.changeRelationship({
          fields: fields,
          onsuccess: body => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
//            this.$emit('modify-hotel-org-treeNode')
          },
        })
        this.changeBrandRelation = false

      },

      adressChange(value) {
        this.shopAdress = value

      },

//      类型code转name
      typeCodeToName(parm) {
        let typelist = [{value: 'GROUP', label: '集团'}, {value: 'HOTEL', label: '酒店'}, {
          value: 'SEGMENT',
          label: '分组'
        }, {value: 'DEPT', label: ' 部门'}]
        typelist.map(item => {
          if (item.value == parm) {
            return item.label
          }
        })

      },

//    树节点点击
      handleNodeClick(item) {

        if (item.orgId == "1") {
          this.$message({
            message: "顶级组织不可编辑",
            type: 'error'
          });
          return false
        } else {
          this.showNodeDetailForEdit = true;
          this.currentAddNodeParentId = item.orgId;
          this.getCurrendNode = item;
        }
      },

//  节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },


//      修改节点
      submitModify() {
        let fields = {}
        if (this.disableEditType == '集团') {
          fields = {
            id: this.currentNodeDetail.id || "",
            name: this.currentNodeDetail.name || "",
            type: this.currentNodeDetail.type || "",
            parentId: this.currentNodeDetail.parentId || "",
            info: {
              id: this.currentNodeDetail.info.id || "",
              name: this.currentNodeDetail.info.name||'',
              type: this.currentNodeDetail.info.type||"",
              code: this.currentNodeDetail.info.code||"",
              addressCode: this.currentNodeDetail.info.addressCode||"",
              tel: this.currentNodeDetail.info.tel||"",
              province: this.currentNodeDetail.info.province||"",
              city: this.currentNodeDetail.info.city||"",
              area: this.currentNodeDetail.info.area||"",
              address: this.currentNodeDetail.info.address||"",
              contactName: this.currentNodeDetail.info.contactName||"",
              contactPhone: this.currentNodeDetail.info.contactPhone||"",
              logoUrl: this.currentNodeDetail.info.logoUrl||"",
              memo: this.currentNodeDetail.info.memo||"",
              website: this.currentNodeDetail.info.website||"",
              wxOrgId: this.currentNodeDetail.info.wxOrgId||"",
            }
          }
        }else if(this.disableEditType == '酒店'){
          fields = {
            id: this.currentNodeDetail.id || "",
            name: this.currentNodeDetail.name || "",
            type: this.currentNodeDetail.type || "",
            parentId: this.currentNodeDetail.parentId || "",
            info: {
              id: this.currentNodeDetail.info.id || "",
              name: this.currentNodeDetail.info.name||'',
              type: this.currentNodeDetail.info.type||"",
              code: this.currentNodeDetail.info.code||"",
              addressCode: this.currentNodeDetail.info.addressCode||"",
              tel: this.currentNodeDetail.info.tel||"",
              province: this.currentNodeDetail.info.province||"",
              city: this.currentNodeDetail.info.city||"",
              area: this.currentNodeDetail.info.area||"",
              address: this.currentNodeDetail.info.address||"",
              contactName: this.currentNodeDetail.info.contactName||"",
              contactPhone: this.currentNodeDetail.info.contactPhone||"",
              logoUrl: this.currentNodeDetail.info.logoUrl||"",
              memo: this.currentNodeDetail.info.memo||"",
              website: this.currentNodeDetail.info.website||"",
              wxHotelId: this.currentNodeDetail.info.wxHotelId||"",

            }
          }
        }else {
          fields = {
            id: this.currentNodeDetail.id || "",
            name: this.currentNodeDetail.name || "",
            type: this.currentNodeDetail.type || "",
            parentId: this.currentNodeDetail.parentId || "",
            info: {
              name: '',
              type: "",
              code: "",
              addressCode: "",
              tel: "",
              province: "",
              city: "",
              area:"",
              address: "",
              contactName: "",
              contactPhone: "",
              logoUrl: "",
              memo: "",
              website: "",
            }
          }
        }
        this.modifyHotelOrgTreeNode({
          fields: fields,
          onsuccess: body => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$emit('modify-hotel-org-treeNode')
          },
          onfail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });

          }

        })
      },
    },
    mounted() {
      this.orgId = this.NodeId;
      this.getCurrentDetail();
      this.alternativeParentNode = JSON.parse(JSON.stringify(this.parentNodeList));
      this.alternativeParentNode.forEach((item,index) => {
        item.subOrganizations = [];
      });
      this.getCurrendNode = this.currendNode;
      console.log('this.alternativeParentNode', this.alternativeParentNode)
    },
    watch: {
      NodeId(val) {
        if(val){
          this.orgId = val;
          this.getCurrentDetail()
        }
      },
      currendNode(val) {
        console.log('====',val)
        if(val){
//          this.getCurrendNode = val
        }
      },
      parentNodeList(val) {
        if(val){
          this.alternativeParentNode = val

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bottomContent {
    h4{
      text-align: left;
    }
    .el-cascader {
      width: 100%;
    }
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .dialog_left {
    width: 50%;
    max-height: 300px;
    overflow-y: scroll;
    border-right: 1px solid gray;
    li a {
      display: block;
      color: #333;
    }
  }

  .dialog_left::-webkit-scrollbar {
    /*display: none;*/
  }

  .dialog_right {
    width: 49.5%;
    .currentList {
      padding-left: 30px;
    }
  }



</style>
