<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>集团 > 品牌 > 酒店</h4>
    </div>

    <div class="centerContent">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="ID">
          <el-input v-model="getCurrendNode.orgId" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="getCurrendNode.name"></el-input>
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
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'fortrunInfo',
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
        changeBrandRelation: false,
        dialogVisible: false,
        input: '',
        AdressProps: {
          value: "label",
          label: "label",
          children: "children",
        },

        orgId: '',
        currentNodeDetail: {},
        getCurrendNode: {},
//        disableEditType:"",

      }
    },
    computed: {
      ...mapState({}),
      disableEditType(){
        if(this.getCurrendNode.type=='UNION')return '子公司'
        if(this.getCurrendNode.type=='GENERAL')return '部⻔'

      },

    },
    methods: {
      ...mapActions([
        'modifyFortrun',
      ]),

//      获取当前详情
//      getCurrentDetail() {
//        this.hotelOrgNodeDetail({
//          orgid: this.orgId,
//          onsuccess: body => {
//            this.currentNodeDetail = body.data
//            let typelist = [
//              {value: 'GROUP', label: '集团'}, {value: 'HOTEL', label: '酒店'}, {
//                value: 'SEGMENT', label: '分组'
//              }, {value: 'DEPT', label: ' 部门'}]
//            typelist.map(item => {
//              if (item.value == this.currentNodeDetail.type) {
//                this.disableEditType = item.label
//              }
//            })
//
//          },
//          onfail: body => {
//            this.$message({
//              message: body.data.errmsg,
//              type: 'error'
//            });
//          }
//        })
//      },

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

//      修改节点
      submitModify() {
        this.modifyFortrun({
          id:this.getCurrendNode.orgId,
          name:this.getCurrendNode.name,
//          parentId:this.currentAddNodeParentId,
          parentId:this.getCurrendNode.parentId,
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
      this.getCurrendNode = this.currendNode
      console.log('---->',this.getCurrendNode)
    },
    watch: {
      NodeId(val) {
        this.orgId = val;
//        this.getCurrentDetail()
      },
      currendNode(val) {
        this.getCurrendNode = val
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bottomContent {
    .el-cascader {
      width: 100%;
    }
  }


</style>
