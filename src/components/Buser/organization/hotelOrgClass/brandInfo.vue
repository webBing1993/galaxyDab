<!--集团信息，第四级包裹-->
<template>
  <div>
    <!--品牌管理列表-->
    <div v-show="choseType.value=='group'">
      <divider></divider>
      <h4 style="margin-bottom:2rem;">
        品牌管理
        <div style="float: right">
          <el-button type="success" plain @click="handelAdd">添加品牌</el-button>
        </div>
      </h4>
      <el-table :data="brandList" border stripe>
        <el-table-column property="index" label="序号" width="50"></el-table-column>
        <el-table-column property="pmsCode" label="品牌代码"></el-table-column>
        <el-table-column property="name" label="品牌名称"></el-table-column>
        <el-table-column property="logoUrl" label="品牌logo">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.logoUrl" alt="" width="150px"height="100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handelEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加品牌弹窗-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="品牌代码">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'brandInfo',
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
        choseType: {name: '集团', value: 'group'},
        title: '',
        brandList: [],
        dialogVisible: false,
        input: '',
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
        value: '',
        orgId: ''
      }
    },
    methods: {
      ...mapActions([
        'BrandList',
      ]),
      handelAdd() {
        this.dialogVisible = true
        this.title = '添加品牌'
      },
      handelEdit(parm) {
        this.dialogVisible = true
        this.title = '修改品牌'

      },
      getBrandList() {
        this.BrandList({
          groupId: this.orgId,
          onsuccess: body => {
            this.brandList = body.data
          }
        })
      },
    },
    mounted() {
      this.orgId = this.NodeId;
    },
    watch: {
      NodeId(val) {
        this.orgId = val;
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
