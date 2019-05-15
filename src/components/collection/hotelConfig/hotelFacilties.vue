<template>
  <div class="hotelConfig">
    <div class="hotelConfig_header">
      酒店配置
    </div>
    <div class="facilties">
      <div class="facilties_title">
        <div class="facilties_title_left">
          <span>酒店设施</span>
          <p>(酒店对应的企业微信可配置是否开启以下服务类目)</p>
        </div>
        <div class="facilties_title_btn" @click="editConfig('add','')">
          添加
        </div>
      </div>
      <div>
        <main>
          <div class="main_title">
            <div class="main_title_left_div1">
              <div class="main_title_left_div1_div">编号</div>
              <div class="main_title_left_div1_div">设施名称</div>
              <div class="main_title_left_div1_div">在用酒店</div>
              <div class="main_title_left_div1_div">图片素材</div>
            </div>
            <div class="main_title_left_div2">
              <div style="margin-right:40px;">操作</div>
            </div>
          </div>
          <div class="main_row" v-for="(item, index) in list">
            <div class="main_row_left">
              <div class="main_row_left_div">
                <span>{{page>1?(pageSizeNum)*(page-1)+1+index:index+1}}</span>
              </div>
              <div class="main_row_left_div">{{item.name}}</div>
              <div class="main_row_left_div">{{item.total?item.total:0}}</div>
              <div class="main_row_left_div">  <img :src="item.icon || '' " alt=""  width="60px" height="60px"></div>
            </div>
            <div class="main_row_right">
              <div @click="editConfig('edit',item)">编辑</div>
              <span @click="deleteConfig(item)">删除</span>
            </div>
          </div>
        </main>
        <div class="page_box" v-if="list.length==0">
          暂无数据
        </div>
        <div class="page_box" v-if="list.length>0">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              background
              :page-sizes="[5, 10]"
              :page-size="pageSizeNum"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="addDialog">
      <el-form :model="addConfigForm"  :rules="rules"  ref="addConfig">
        <el-form-item label="设施名称"  label-width="120px" prop="configName">
          <el-input v-model="addConfigForm.configName" placeholder="请输入设施名称"></el-input>
        </el-form-item>
        <el-form-item label="设施图标" prop="picUrl" ref="uploadImg" label-width="120px" class="tubiao">
          <div class="tupian" v-if="showpicUrl" style="margin-bottom:10px;">
            <img :src="addConfigForm.picUrl" alt="" width="60px" height="60px" >
            <span class="cancelImg" v-if="showpicUrl" @click="deleteImg($event,addConfigForm.picUrl)">X</span>
          </div>
          <el-upload
            class="upload-demo el-right"
            :action="scriptUpload"
            :show-file-list=false
            :headers="setHeader"
            name="file"
            :on-success="filterScriptSuccess"
            list-type="picture-card">
            <el-button size="small" type="primary" v-if="addConfigForm.picUrl==''">
              点击上传</el-button>
            <el-button size="small" type="primary" v-else>
              重新上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label=""  label-width="120px" prop="" style="margin-top:10px;" >
          <span class="imageSize">上传图片尺寸60*60px</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="sureDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'hotelConfig',
    data () {
      return {
        addDialog: false,
        currentPage4: 1,
        page: 1,
        nums: 5,
        total: 10,
        pageSizeNum: 5,
        addConfigForm: {
          id: '',
          configName: '',
          picUrl: ''
        },
        list: [], // 列表
        showpicUrl: false,
        rules: {
          // 现在只是简单的验证后面要改验证
          configName: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }
          ],
          picUrl: [
            {
              required: true,
              message: '图片不能为空',
              trigger: 'change'
            }
          ]
        },
        handleType: '', // 弹框类型
        title: ''// 弹框标题
      }
    },
    methods: {
      ...mapActions(['addConfig', 'updateConfig', 'delConfig', 'getConfigPage']),
      // 取消弹框
      cancelDialog () {
        this.addDialog = false
        this.$refs['addConfig'].resetFields()
      },
      // 删除酒店设施
      deleteConfig (obj) {
        this.$confirm(`确定删除【${obj.name}】?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delConfig({
              data: {
                id: obj.id
              },
              onsuccess: body => {
                // console.log(body)
                if (body.data) {
                  this.initConfig()
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: '删除失败!'
                  })
                }
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 编辑酒店设施
      editConfig (type, obj) {
        this.addDialog = true
        this.handleType = type
        if (type == 'edit') {
          this.showpicUrl = true
          this.addConfigForm.configName = obj.name
          this.addConfigForm.picUrl = obj.icon
          this.addConfigForm.id = obj.id
          this.title = '编辑设施'
        } else {
          this.title = '添加设施'
          this.showpicUrl = false
          this.addConfigForm.configName = ''
          this.addConfigForm.picUrl = ''
          this.addConfigForm.id = ''
        }
      },
      filterScriptSuccess (res, file, list) {
        if (res.data) {
          this.addConfigForm.picUrl = res.data
          this.showpicUrl = true
          this.$refs.uploadImg.clearValidate()
        }
      },
      // 删除图片
      deleteImg () {
        this.addConfigForm.picUrl = ''
        this.showpicUrl = false
      },
      // 添加或者编辑确认框
      sureDialog () {
        this.$refs['addConfig'].validate((valid) => {
          if (valid) {
            this.addDialog = false
            if (this.handleType == 'add') {
              this.addConfig({
                data: {
                  name: this.addConfigForm.configName,
                  icon: this.addConfigForm.picUrl,
                  type:'hotel_facilities'
                },
                onsuccess: (body) => {
                  this.initConfig()
                }
              })
            } else {
              this.updateConfig({
                data: {
                  id: this.addConfigForm.id,
                  name: this.addConfigForm.configName,
                  icon: this.addConfigForm.picUrl
                },
                onsuccess: (body) => {
                  this.initConfig()
                }
              })
            }
            this.$refs['addConfig'].resetFields()
          } else {
            return false
          }
        })
      },
      // 酒店设施列表
      initConfig () {
        this.getConfigPage(
          {
            data: {
              pageNo: this.page,
              pageSize: this.nums,
              type:'hotel_facilities'
            },
            onsuccess: body => {
              this.list = body.data.list
              this.total = body.data.total
            }
          }
        )
      },
      // 分页
      handleSizeChange (val) {
        // 每页多少条
        this.pageSizeNum = val
        this.nums = val
        this.initConfig()
      },
      // 当前页
      handleCurrentChange (val) {
        this.page = val
        this.initConfig()
      }
    },
    mounted () {
      this.initConfig()
    },
    computed: {
      scriptUpload () {
        return '/galaxy-front/adv/picture/upload'
      },
      setHeader () {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: 'multipart/form-data'
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .hotelConfig{
    margin: 20px;
    font-size: 14px;
    .hotelConfig_header{
      height:50px;
      line-height: 50px;
      border-bottom: 1px solid #EBEBEB;
    }
    .facilties{
      .facilties_title{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height:70px;
        .facilties_title_left{
          p{
            color: #A8A8A8;
            font-size: 12px;
          }
        }
        .facilties_title_btn{
          background: #389FFF;
          border-radius: 4px;
          width:68px;
          height:36px;
          line-height: 36px;
          text-align: center;
          color:#ffffff;
        }
      }
      .main_title{
        height: 48px;
        background-color: #F5F8FA;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .main_title_left_div1{
          display: flex;
          flex: 2;
          justify-content: flex-start;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #000000;
          .main_title_left_div1_div{
            width: 30%;
          }
        }
        .main_title_left_div2{
          display: flex;
          flex: 1;
          justify-content: flex-end;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #000000;
        }
      }
      .main_row{
        height: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid #E7E7E7;
        .main_row_left{
          display: flex;
          flex: 2;
          justify-content: flex-start;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #000000;
          .main_row_left_div{
            width: 30%;
            overflow: hidden;
            padding-right: 20px;
          }
        }
        .main_row_right{
          display: flex;
          flex: 1;
          justify-content: flex-end;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #2574ED;
          cursor: pointer;
          span{
            margin-left:10px;
            color: #FF1313;
          }
          div{
            color: #389FFF;
          }
        }
      }
    }
  }
  .el-upload-list--picture .el-upload-list__item {
    width: 100px !important;
  }

  #editor {
    width: 700px;
  }
  .file {
    float: left;
    line-height: 25px;
    margin-top: 60.5px;
    margin-left: 50px;
  }
  .tupian{
    width:60px;
    height:60px;
    position:relative;
    .cancelImg{
      position:absolute;
      top:-10px;
      right:0px;
      cursor: pointer;
      width:20px;
      height:20px;
      line-height:20px;
      text-align: center;
      border:1px solid  #ccc;
      background-color: #ccc;
      border-radius: 50% ;

    }
  }
  .mavonEditor{
    width:700px;
  }
  /deep/ .el-upload--picture-card {
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 0px;
    height: 0px;
    line-height: 0px;
    vertical-align: top;
  }
  /deep/ .el-form-item{
    margin-bottom:25px;
  }
  /deep/ .el-button {
    margin-top:0px;
    /*margin-bottom:20px;*/
  }
  .imageSize{
    font-size: 12px;
    color: #909399;

  }
  .page_box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
</style>
