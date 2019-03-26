<template id="aaa">
  <el-container class="ocontainer">
    <el-header  class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/notrun' }">在库设备</el-breadcrumb-item>
        <el-breadcrumb-item>添加设备</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="ocontainer">
      <template>
        <el-radio v-model="radio" label="1"  @change='change' style="margin-bottom: 15px;">单个添加</el-radio><br/>
        <el-form ref="form" label-position='left' :model="form" v-show="onshow" label-width="180px" class="from1">

          <el-form-item label="设备mac地址" class="from_item1">
            <el-input v-model="form.mac" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="设备生产序列号" class="from_item1">
            <el-input v-model="form.productionSequenceNumber" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="设备软件当前版本" class="from_item1">
            <el-input v-model="form.nowVersion" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="设备软件计划版本" class="from_item1">
            <el-input v-model="form.planVersion" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="设备网关地址" class="from_item1">
            <el-input v-model="form.gatewayaddr" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="设备短地址" sclass="from_item1">
            <el-input v-model="form.shortaddr" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-form-item label="硬件版本">
            <el-input v-model="form.hardwareVersion" size="small" class="from_item2"></el-input>
          </el-form-item>
          <el-button size="small" type="primary" @click='add' style="margin-top:10px">添加</el-button>
          <!-- <div v-bind:class="{ op1: isActive1}"></div> -->
        </el-form>
        <el-radio v-model="radio" label="2" @change='change' class="radio1">批量添加</el-radio>
        <el-form ref="form" label-position='left' :model="form" v-show="onshowmore" label-width="180px"class="from2">

          <el-upload
            style="width:50%;float:left;height:0px"
            class="upload-demo"
            ref="upload"
            :on-success="handleAvatarSuccess"
            action="http://115.159.193.163:30000/adminapi/v1/manager/uploadDevCsv"
            :on-preview="handlePreview"
            :on-change="onchange"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false">

            <el-button slot="trigger" size="small" type="el-normal" class="button_file"><span>选取csv文件</span></el-button><br>


            <!-- <div slot="tip" class="el-upload__tip">上传csv文件</div> -->
          </el-upload><br/>
          <el-button style="margin-top: 24px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <!-- <div v-bind:class="{ op: isActive}"></div> -->
        </el-form>

      </template>


    </el-main>
  </el-container>
</template>

<script>
  import addDevMessage from '../../common.js'
  export default {
    data () {
      return {
        radio: '1',
        onshow: 'true',
        isActive: true,
        onshowmore : false,
        isActive1: false,
        form: {
          mac: '',
          productionSequenceNumber: '',
          nowVersion: '',
          planVersion: '',
          gatewayaddr: '',
          shortaddr: '',
          wifi_ssid: '1212',
          hardwareVersion: ''
        },
        isRun: [
          {
            value: '1',
            label: '在库'
          }
        ],
        value: '1'
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(909090)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handlePreview (file) {
        console.log(file)
      },
      change (val) {
        this.radio=val
        this.onshow=!this.onshow
        this.onshowmore=!this.onshowmore
        // this.isActive=!this.isActive
        // this.isActive1=!this.isActive1
      },
      onchange (file, fileList) {
        let file1=file.name
        let index1=file1.lastIndexOf(".");
        var index2=file1.length
        let postf=file1.substring(index1,index2);//后缀名
        if(postf!='.csv'){
          this.$message.error('请上传svc文件')
          // handleRemove(file, fileList)
          this.$refs.upload.clearFiles(file);
        }
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        if(res.code==0){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
          this.$refs.upload.clearFiles(file);
        }
      },
      beforeAvatarUpload(file) {
        let isJPG = file.type === 'application/vnd.ms-excel'
        if (!isJPG) {
          this.$message.error('请上传svc文件')
        }
        return isJPG
      },
      add: function () {
        let mactext=this.form.mac
        let productionSequenceNumbertext=this.form.productionSequenceNumber
        let nowVersiontext=this.form.nowVersion
        let planVersiontext=this.form.planVersion
        let gatewayaddrtext=this.form.gatewayaddr
        let shortaddrtext=this.form.shortaddr
        let wifissidtext=this.form.wifi_ssid
        let hardwareVersiontext=this.form.hardwareVersion
        let state=this.value*1
        let status=this.value
        let radio=this.radio*1
        let addDevMessageUrl=addDevMessage.url().addDevMessage
        if (mactext&&productionSequenceNumbertext&&nowVersiontext&&planVersiontext&&gatewayaddrtext&&shortaddrtext&&hardwareVersiontext&&radio==1) {
          this.$http.post(addDevMessageUrl,
            {
              mac: mactext,
              productionSequenceNumber: productionSequenceNumbertext,
              nowVersion: nowVersiontext,
              planVersion: planVersiontext,
              gatewayaddr: gatewayaddrtext,
              shortaddr: shortaddrtext,
              isRun: 1,
              wifi_ssid: wifissidtext,
              hardwareVersion: hardwareVersiontext
            },
            {
              headers:{},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.$message.success(response.data.msg)
              if(status==1){
                this.$router.push({ path: '/device/notrun' })
              } else {
                this.$router.push({ path: '/device/run' })
              }
            }else{
              this.$message.error(response.data.msg)
            }

          }, (response) => {
          })
        }else {
          this.$message.error('请填写完全！')
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  .active{}
  .op{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
    background-color: #eee;
    opacity: 0.8;
  }
  .op1{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #eee;
    opacity: 0.8;
  }
  .el-upload-list{
    height: 100px;
    width: 20%;
    overflow: auto;
    float: left;
    position: absolute;
    left: 138px;
    top: 0px;
  }
  .el-upload{
    float:left
  }
  .el-button--success.is-active, .el-button--success:active {
    background: #16D032;
    border-color: #16D032;
    color: #fff;
  }
  .el-button--success {
    color: #fff;
    background-color: #16D032;
    border-color: #16D032;
  }
  .ocontainer{
    background-color:#fff
  }
  .from_item1{
    margin-bottom: 14px
  }
  .from_item2{
    width:350px;
  }
  .from1{
    position:relative;
    padding:16px;
    border: 1px solid #eee;
  }
  .from2{
    position:relative;
    height:76px;
    padding:16px;
    margin-bottom:15px;
    border: 1px solid #eee;
    margin-top: 20px
  }
  .radio{
    margin-bottom: 15px;
    margin-top: 15px
  }
  .button_file{
    width:100px;
    float:left
  }
  /*.cell{text-align: center}*/
</style>
