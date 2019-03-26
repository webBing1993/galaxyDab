<template id="aaa">
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="routername">{{name}}</el-breadcrumb-item>
        <el-breadcrumb-item>设置参数</el-breadcrumb-item>
      </el-breadcrumb>
      <!--<theheader :theheaderone="theheaderone"></theheader>-->
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form" :model="form" label-width="250px">
        <el-form-item label="设备mac地址"  class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.mac" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="BLE广播时间间隔（单位ms）" prop="password" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.bleadvertisingInterval" :disabled="todisabled"></el-input>
        </el-form-item>

        <el-form-item label="BLE信号强度最小值（单位dbm）" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.rssithresholdCentral" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="BLE外围设备发射功率等级" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceBLETxPowerLevel" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="最大BLE外围设备发射功率等级" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceBLETxPowerLevelMax" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="开门时间" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.Door_Open_interval_time" :disabled="todisabled"></el-input>
        </el-form-item>

        <el-form-item label="BLE 设备RTC时钟" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceRTC" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="绑定取电开关" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceSwitchBinding" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="设备固件版本号" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceFWVersion" :disabled="todisabled"></el-input>
        </el-form-item>
        <el-form-item label="设备固件版本Number" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.deviceFWVersionNumber" :disabled="todisabled"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size='small' @click="toUpdata(form)">编辑</el-button>
          <el-button type="primary" size='small' @click="toIssure(form)">确定</el-button>
        </el-form-item>
      </el-form>


    </el-main>
  </el-container>
</template>

<script>
  import deviceparamUrl from '../../common.js'
  // import theheader from './header.vue'
  export default {
    components: {
      // theheader
    },
    data () {
      return {
        form: {
          mac: '',
          bleadvertisingInterval: '',
          rssithresholdCentral: '',
          deviceBLETxPowerLevel: '',
          deviceBLETxPowerLevelMax: '',
          deviceRTC: '',
          deviceSwitchBinding: '',
          deviceFWVersion: '',
          deviceFWVersionNumber: '',
          Door_Open_interval_time:''
        },
        index: '',
        todisabled:true,
        name:'',
        routername:{}
        // theheaderone:''

      }
    },
    beforeMount:function() {
      this.form.mac=this.$route.params.val
    },
    methods: {
      toUpdata(form){
        this.todisabled=false
      },
      toIssure(form){
        var mac1=this.form.mac
        if(this.form.deviceBLETxPowerLevel>this.form.deviceBLETxPowerLevelMax){
          this.$message('BLE外围设备发射功率等级不能比最大BLE外围设备发射功率等级低')
          return;
        }
        var updateParam1=deviceparamUrl.url().updateParam
        this.$http.post(updateParam1,form,
          {
            params: {mac:mac1},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.$message.success(response.data.msg)
            this.$router.go(-1)
          }
        }, (response) => {
          // console.log(response.body.msg)
          this.$message('请求出错')
        })
      }
    },
    computed: {

    },
    mounted: function () {
      //  this.theheaderone='90988888'
      var _name=this.$route.params.name
      if(_name==1){
        this.name='运行设备'
        this.routername={path: '/device/run'}
      }else{
        this.name='在库设备'
        this.routername={path: '/device/notrun'}
      }
      this.form.mac=this.$route.params.val
      var mac=this.form.mac
      var deviceparamUrl1=deviceparamUrl.url().deviceparam
      this.$http.get(deviceparamUrl1,
        {
          params: {
            mac:mac
          }
        },
        {
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          var data=response.data.data
          this.form=data
          this.form.Door_Open_interval_time=data.door_Open_interval_time
        }
      }, (response) => {
        // console.log(response.body.msg)
        this.$message('请求出错')
      })
    }
  }
</script>

<style>
  .spancolor {
    color: #929292;
  }
  .ocontainer{
    background-color:#fff
  }
  .el_col_ul_style{
    border-right: 2px solid #eee;
    height: 200px;
    overflow:auto
  }
  .el_col_ul_li{
    height: 47px;
    line-height:42px
  }
  .el_col_ul_li_span{
    width:70.8%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  .el_col_ul_li_div{
    width:3%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  .updata_span{
    color:#16D032;
    cursor:pointer;
  }
  .ocontainer_item_input{
    width:350px
  }
  .ocontainer_item_label{
    margin-bottom: 14px
  }
  /*.cell{text-align: center}*/
</style>
