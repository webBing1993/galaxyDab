<template>
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/firmwarelist' }">固件列表</el-breadcrumb-item>
        <el-breadcrumb-item>上传固件</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form" label-width="100px">
        <el-form-item label="固件名称"  class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model='firmwareName'></el-input>
        </el-form-item>
        <!--<el-form-item label="MD5值"  class="ocontainer_item_label">-->
        <!--<el-input size='small' class="ocontainer_item_input" v-model='md5'></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="固件描述"  class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model='firmwareDescribe'></el-input>
        </el-form-item>
        <el-form-item label="使用设备类型" class="ocontainer_item_label">
          <el-select v-model="devType"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="固件是否启用"  class="ocontainer_item_label">
          <el-select v-model="status"  placeholder="请选择" >
            <el-option
              v-for="item in optionsDeviceUpDisable"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固件" class="ocontainer_item_label">
          <el-upload
            :multiple="false"
            style="width:50%;float:left;height:0px"
            class="upload-demo"
            action=""
            :limit=1
            ref="upload"
            :on-change='onchange'
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="el-normal" class="elbutton_choose"><span>选择固件</span></el-button><br>
            <!-- <div slot="tip" class="el-upload__tip">上传csv文件</div> -->
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="批量创建">
          <el-input-number size='small' v-if="form.name!=''" :disabled="false" v-model="num1" @change="handleChange1"  :min="1" :max="10" label="描述文字"></el-input-number>
          <el-input-number size='small' v-else :disabled="true" v-model="num1" @change="handleChange1"  :min="1" :max="10" label="描述文字"></el-input-number>
          <span class="spancolor" v-show="form.name!=''&&num1!=1">创建用户名分别为:<i  v-for="i in shuzhi">{{form.name}}00{{i+1}},</i></span>
        </el-form-item>-->


        <el-form-item>
          <el-button type="primary" size='small' @click="up">上传</el-button>
        </el-form-item>
      </el-form>


    </el-main>
  </el-container>
</template>

<script>
  import uploadFirmwareUrl from '../common.js'
  export default {
    data () {
      return {
        fileList:[],
        index: '',
        form: {},
        firmwareName: '',
        file: {},
        md5: '',
        deviceTypeList1:'',
        options:[],
        firmwareDescribe: '',
        devType: '',
        status: "0",
        optionsDeviceUpDisable:[
          {label:'启用',value:'0'},
          {label:'禁用',value:'1'},
        ],
        DeviceUpDisablevalue: ''
      }
    },
    beforeMount:function() {
      // this.index=this.$route.params.val
    },
    methods: {
      handleAvatarSuccess2(res, file) {
        console.log('上传成功',res)

        console.log('res',res)
        console.log('file',file)
      },
      //选取文件
      onchange (file, fileList) {
        this.file=file
        console.log(file)
      },

      up () {

        var uploadFirmware = uploadFirmwareUrl.url().uploadFirmware
        // var zipFormData = {
        //     firmwareName:this.firmwareName, //固件名字
        //     firmwareDescribe:this.firmwareDescribe,//固件描述
        //     devType:this.devType,//设备类型
        //     status:this.status ,//固件是否启用
        //     file:this.file
        // };

        var zipFormData = new FormData();
        zipFormData.append("file", this.file.raw)
        zipFormData.append('firmwareName',this.firmwareName)
        zipFormData.append('firmwareDescribe',this.firmwareDescribe)
        zipFormData.append('devType', this.devType)
        zipFormData.append('status',this.status)

        this.$http.post(uploadFirmware,zipFormData,
          {
            emulateJSON: true
          }).then((response) => {
          console.log(response)
          if (response.data.code==0) {
            this.$message.success(response.data.msg)
            this.$router.go(-1)
            // this.$router.push({ path: '/device/firmwarelist' })
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message.error(response.data.msg)
        })
      }
    },
    computed: {

    },
    mounted: function () {
      //    this.index=this.$route.params.val
      //固件下拉
      let deviceTypeList=uploadFirmwareUrl.url().deviceTypeList
      this.$http.get(deviceTypeList,
        {
          headers: {},
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          this.options=response.data.data
          console.log('options', this.options)
        }else{
          this.loading=false
          this.$message.error(response.data.msg)
        }
      }, (response) => {
        this.$message('请求出错')
      })
    }
  }
</script>

<style>
  .spancolor {
    color: #929292;
  }
  .el-upload-list {
    height: 100px;
    width: 20%;
    overflow: auto;
    float: left;
    position: absolute;
    left: 138px;
    top: 0px;
  }
  .el-upload-list__item:first-child{
    margin-top:0px
  }
  .ocontainer{
    background-color:#fff
  }
  .ocontainer_item_label{
    margin-bottom:14px
  }
  .elbutton_choose{
    width:100px;
    float:left
  }

  /*.cell{text-align: center}*/
</style>
