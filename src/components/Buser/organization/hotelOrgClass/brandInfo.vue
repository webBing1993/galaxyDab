<!--集团信息，第四级包裹-->
<template>
  <div>
    <!--品牌管理列表-->
    <div>
      <divider></divider>
      <h4 style="margin-bottom:2rem;">
        品牌管理
        <div style="float: right">
          <el-button type="success" plain @click="handelAdd">添加品牌</el-button>
        </div>
      </h4>
      <el-table :data="brandList" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column property="pmsCode" label="品牌代码"></el-table-column>
        <el-table-column property="name" label="品牌名称"></el-table-column>
        <el-table-column property="logoUrl" label="品牌logo">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.logoUrl" alt="" width="150px" height="100px"
                   v-if="scope.row.logoUrl!=''|| scope.row.logoUrl!=null">
              <div class="el-icon-picture-outline" width="150px" height="100px" v-else></div>
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
      <el-form label-width="100px" label-position="left">
        <el-form-item label="品牌代码">
          <el-input v-model="brandInfo.code" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="brandInfo.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="上传信息" v-if="brandInfo.logoUrl">

          <img :src="brandInfo.logoUrl" alt="" width="200px" height="100px">

        </el-form-item>

        <el-form-item label="品牌LOGO">
          <el-upload
            class="upload-demo el-right"
            :action="scriptUpload"
            :show-file-list=false
            :before-upload='beforeUploadfilter'
            :headers="setHeader"
            name="file"
            :on-success="filterScriptSuccess"
            :on-preview="handlePictureCardPreview"
            :onError="uploadError"
            :on-progress="uploadVideoProcess"
            list-type="picture-card">
            <el-button size="small" type="primary">上传logo</el-button>
          </el-upload>


        </el-form-item>
        <el-form-item>
          <el-button @click.native="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">
            {{editStatus ? '修改品牌' : '保存品牌'}}
          </el-button>
          <!--<el-button type="primary" @click="" v-if="title=='修改品牌'"></el-button>-->
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
        title: '',
        brandList: [],
        dialogVisible: false,
        orgId: '',
        brandInfo: {
          name: '',
          code: '',
          logoUrl: '',
        },
        editStatus: false,
        currentBrandId: '',
        currentBrandGroupId: '',
        getCurrendNode:{}
      }
    },
    computed: {
      ...mapState([]),
      scriptUpload() {
        return "/galaxy-front/brands/logo/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      }
    },
    methods: {
      ...mapActions([
        'BrandList',
        'addBrand',
        'modifyBrand',
      ]),

      handelAdd() {
        this.dialogVisible = true
        this.title = '添加品牌'
        this.editStatus = false

        this.brandInfo.name = "";
        this.brandInfo.code = "";
        this.brandInfo.logoUrl = "";
      },

      handelEdit(parm) {
        this.dialogVisible = true
        this.title = '修改品牌'
        this.editStatus = true
        this.currentBrandId = parm.id
        this.currentBrandGroupId = parm.groupId

        this.brandInfo.name = parm.name;
        this.brandInfo.code = parm.code;
        this.brandInfo.logoUrl = parm.logoUrl;
      },

      getBrandList() {
        this.BrandList({
          groupId: this.orgId,
          onsuccess: body => {
            this.brandList = body.data
          }
        })
      },

      submit() {

        if (this.editStatus) {
//          编辑
          let fields = {
            groupId: this.currentBrandGroupId,
            name: this.brandInfo.name || '',
            code: this.brandInfo.code || '',
            pmsId: "",
            pmsCode: "",
            logoUrl: this.brandInfo.logoUrl || ''
          }
          this.modifyBrand({
            fields: fields,
            brand_id: this.currentBrandId,
            onsuccess: body => {
              this.dialogVisible = false
              this.getBrandList()
            },
            onfail: body => {
              this.$message({
                message: body.data.errmsg,
                type: 'error'
              });
            }
          })
        } else {
//          保存
          let fields = {
            organizationId: this.orgId,
            groupId: this.getCurrendNode.foreignId,
            name: this.brandInfo.name || '',
            code: this.brandInfo.code || '',
            pmsId: "",
            pmsCode: "",
            logoUrl: this.brandInfo.logoUrl || ''
          }
          this.addBrand({
            fields: fields,
            onsuccess: body => {
              this.dialogVisible = false
              this.getBrandList()
            },
            onfail: body => {
              this.$message({
                message: body.data.errmsg,
                type: 'error'
              });
            }
          })
        }
      },
      beforeUploadfilter(file) {
      },

      uploadError(response, file, fileList) {
      },

      filterScriptSuccess(res, file, list) {
        if (res.data) {
          this.brandInfo.logoUrl = res.data;
        }
      },
      handlePictureCardPreview(file) {
      },
      uploadVideoProcess(event, file, fileList) {
      },
    },
    mounted() {
      this.orgId = this.NodeId;
      this.getBrandList()


    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getBrandList()
        this.getCurrendNode = this.currendNode
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  /deep/ .el-upload--picture-card {
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 40px;
    vertical-align: top;
  }

  /deep/ .el-upload {
    display: flex;
  }
</style>
