<template>
  <div class="payConfig">
    <div class="payConfig_header">
      <i class="el-icon-arrow-left"></i> <span @click="goto(-1)"> 返回</span> <div>设备支付配置</div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">微信支付</p>
          <p class="payConfig_main_p2">开启后可选择设备支持微信支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="weixinConfig">配置</span>
          <span :class="isWeiXinUse?'payConfig_main_btn2':'noUse'" @click="useConfig('weixin')">{{isWeiXinUse?'启用':'停用'}}</span>
        </div>
      </div>
      <div class="chooseDevice" v-if="!isWeiXinUse">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="weixinDeviceList"
            @change="chooseDevice"
          >
            <el-checkbox v-for="item in deviceList" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">支付宝</p>
          <p class="payConfig_main_p2">开启后可选择设备支持支付宝支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="zfbConfig">配置</span>
          <span class="payConfig_main_btn2" @click="useConfig('zfb')">启用</span>
        </div>
      </div>
      <div class="chooseDevice">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="zfbDeviceList"
            @change="chooseDevice"
          >
            <el-checkbox v-for="item in deviceList" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">前台支付</p>
          <p class="payConfig_main_p2">开启后可选择设备支持前台支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="prosceniumConfig">配置</span>
          <span class="payConfig_main_btn2" @click="useConfig('proscenium')">启用</span>
        </div>
      </div>
      <div class="chooseDevice" v-if="">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="prosceniumDeviceList"
            @change="chooseDevice"
          >
            <el-checkbox v-for="item in deviceList" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!--微信支付配置弹框-->
    <el-dialog
      title="微信支付参数配置"
      :visible.sync="weixinDialog"
      width="50%"
      center>
      <div class="item_large">
        <span>商户类型</span>
        <el-select v-model="merchantsType" slot="prepend" placeholder="请选择">
          <el-option label="普通商户" value="1"></el-option>
          <el-option label="大型商户" value="2"></el-option>
        </el-select>
      </div>
      <div class="item_large">
        <span>商户名称</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>商户号</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>商户秘钥</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button style="background-color:#00CD78;color:#ffffff" @click="weixinDialog = false">保 存</el-button>
      </span>
    </el-dialog>
    <!--微信支付配置弹框-->
    <el-dialog
      title="支付宝参数配置"
      :visible.sync="zfbDialog"
      width="50%"
      center>
      <div class="item_large">
        <span>商户PID</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>APPID</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>商户私钥</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>商户公钥</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <div class="item_large">
        <span>支付宝公钥</span>
        <el-input class="el-right" v-model="merchantsName" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button style="background-color:#00CD78;color:#ffffff" @click="zfbDialog = false">保 存</el-button>
      </span>
    </el-dialog>
    <!--前台支付配置弹框-->
    <el-dialog
      title="前台支付"
      :visible.sync="prosceniumDialog"
      width="50%"
      center>
      <div class="dialog_main">
        <div>
          <p class="dialog_main_p1">通知待办</p>
          <p class="dialog_main_p2">开启后选择此支付方式时会发送待办事项到企业微信</p>
        </div>
        <div>
          <el-switch
            v-model="inform"
            active-color="#13ce66"
            inactive-color="#E8E8E8"
            @change="changeInform"
            :width="40">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button style="background-color:#00CD78;color:#ffffff" @click="prosceniumDialog = false">保 存</el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog
      title="提示"
      :visible.sync="promptDialog"
      width="50%"
      center>
      <div style="width:100%;text-align: center">该支付方式暂无配置参数，请先进行配置后启用</div>
      <span slot="footer" class="dialog-footer">
        <el-button style="background-color:#00CD78;color:#ffffff" @click="prosceniumDialog = false">取消</el-button>
         <el-button style="background-color:#00CD78;color:#ffffff" @click="prosceniumDialog = false">去配置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'hotelOrg',
  data () {
    return {
      weixinDialog: false, // 控制微信支付配置弹框
      zfbDialog: false, // 控制支付宝支付配置弹框
      prosceniumDialog: false, // 控制前台支付配置弹框
      promptDialog: false, // 是否配置提示弹框
      merchantsType: '1',
      merchantsName: '',
      inform: false,
      deviceList: ['设备1', '设备2', '设备3', '设备4'],
      weixinDeviceList: [], // 微信支付设备列表
      zfbDeviceList: [], // 支付宝支付设备列表
      prosceniumDeviceList: [], // 前台支付设备列表
      isWeiXinUse: false,
      isZFBUse: false,
      isProsceniumUse: false

    }
  },
  methods: {
    ...mapActions(['goto']),
    weixinConfig () {
      this.weixinDialog = true
    },
    zfbConfig () {
      this.zfbDialog = true
    },
    prosceniumConfig () {
      this.prosceniumDialog = true
    },
    changeInform () {

    },
    chooseDevice () {
      console.log(this.weixinDeviceList)
    },
    // 启用设备
    useConfig (type) {
      if (type == 'weixin') {
        this.isWeiXinUse = !this.isWeiXinUse
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .payConfig{
    margin:20px;
   .payConfig_header{
     display:flex;
     flex-direction: row;
     align-items: center;
     font-size:16px;
     span{
       color:#00CD78;
       margin-right:20px;
       margin-left:10px;
     }
   }
   .payConfig_main{
     border-bottom: 1px solid #C9C9C9;
     padding-bottom:20px;
     .payConfig_main_top{
       display: flex;
       min-height: 80px;
       justify-content: space-between;
       align-items: center;
       .payConfig_main_p1{
         font-family: PingFangSC-Medium;
         font-size: 14px;
         color: #000000;
       }
       .payConfig_main_p2{
         opacity: 0.4;
         font-family: PingFangSC-Regular;
         color: #000000;
       }
       .payConfig_main_right{
         display:flex;
         flex-direction: row;
       }
       .payConfig_main_btn1,.payConfig_main_btn2,.noUse{
         display: block;
         height:35px;
         width:60px;
         border-radius: 3px;
         background-color: #3B99FC;
         color:#ffffff;
         line-height: 35px;
         text-align: center;
       }
       .payConfig_main_btn2{
         background-color: #00CD78;
         margin-left:10px;
       }
       .noUse{
         background-color: #FB2142;
         margin-left:10px;
       }
     }
     .chooseDevice{
       .chooseDevice_div{
         margin-bottom: 10px;
       }
       .chooseDevice_p1{
         font-family: PingFangSC-Medium;
         font-size: 13px;
         color: #000000;
       }
       .chooseDevice_p2{
         opacity: 0.4;
         font-family: PingFangSC-Regular;
         color: #000000;
       }
     }
   }
 }
 /deep/.el-dialog__wrapper .el-dialog--center .el-dialog__body .item_large{
    display:flex;
    align-items: center;
   margin-bottom: 10px;
   span{
      width:120px;
   }
   .el-select{
      width:100%;
   }
 }
 /deep/.el-dialog__wrapper .el-dialog--center .el-dialog__body .dialog_main{
   display: flex;
   min-height: 80px;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid #C9C9C9;
   .dialog_main_p1{
     font-family: PingFangSC-Medium;
     font-size: 14px;
     color: #000000;
   }
   .dialog_main_p2{
     opacity: 0.4;
     font-family: PingFangSC-Regular;
     color: #000000;
   }
 }
</style>
