<template id="aaa">
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="routername">{{name}}</el-breadcrumb-item>
        <el-breadcrumb-item>设置参数</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form" :model="form" label-width="250px">
        <el-form-item label="信号强度阈值" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.maxRssi" ></el-input>
        </el-form-item>
        <el-form-item label="品牌" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label="系统（ios or android）" class="ocontainer_item_label">
          <!--<el-input size='small' class="ocontainer_item_input" v-model="form.systemName"></el-input>-->
          <el-select size='small' v-model="form.systemName" placeholder="请选择">
            <el-option
              v-for="item in optionsDeviceUpDisable"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='small' @click="toIssurelist(form)">确定</el-button>
        </el-form-item>
      </el-form>


    </el-main>
  </el-container>
</template>

<script>
  import deviceRssiListUrl from '../common.js'
  export default {
    data () {
      return {
        form: {
          maxRssi: 0,
          brand: '',
          systemName: ''
        },
        index: '',
        deviceRssiId:'',
        optionsDeviceUpDisable:[
          {label:'ios',value:'0'},
          {label:'android',value:'1'},
        ],
        status:'',
        name:'',
        routername:{}

      }
    },
    beforeMount:function() {
      this.form.mac=this.$route.params.val
      // this.deviceRssiId=this.$route.params.deviceRssiId
    },
    methods: {
      toIssurelist(form){
        var mac1=this.form.mac
        var maxRssi=this.form.maxRssi
        var brand=this.form.brand
        var systemName=this.form.systemName
        var addRssiData1=deviceRssiListUrl.url().addRssiData
        this.$http.post(addRssiData1,
          {
            maxRssi:maxRssi,
            brand:brand,
            systemName:systemName
          },
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
          this.$message('请求出错')
        })
      }
    },
    mounted: function () {
      this.form.mac=this.$route.params.val
      var _name=this.$route.params.name
      if(_name==1){
        this.name='运行设备'
        this.routername={path: '/device/run'}
      }else{
        this.name='在库设备'
        this.routername={path: '/device/notrun'}
      }
      var mac=this.form.mac
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
