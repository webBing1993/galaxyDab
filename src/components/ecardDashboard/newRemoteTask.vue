<template>
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/remoteTask' }">远程任务</el-breadcrumb-item>
        <el-breadcrumb-item>新建远程任务</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <span>第一步设备筛选</span>
      <div class="ocontainer_selection">
        <div v-for='(i,j) in add' class="ocontainer_selection_odiv">
          <el-select v-model="i.field" placeholder="请选择" class="ocontainer_selection_select_width">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="i.condition" placeholder="请选择" class="ocontainer_selection_select_width">
            <el-option
              v-for="item in selection"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="i.data" class="ocontainer_selection_oinput"  placeholder="请输入内容"></el-input>
          <a size="small" @click="del(i)" class="ocontainer_selection_odel">删除</a>
        </div>
        <div class="ocontainer_selection_odiv1">
          <span class="ocontainer_selection_odiv1_span" @click="toadd"><i class="el-icon-plus addparameter_i"></i>新增</span><br/>
          <el-button class="ocontainer_selection_odiv1_btn" type="primary" size="small" @click='shaixuan'>筛选</el-button>
        </div>
      </div>
      <template>
        <el-table ref="multipleTable" :data="tableData" stripe tooltip-effect="dark" @selection-change="handleSelectionChange" style="width:90%;" :header-row-style="rowClass" v-loading='loading'>
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column  label="设备mac地址" prop="mac" width="120"></el-table-column>
          <el-table-column  prop="devType"  label="设备类型"></el-table-column>
          <el-table-column  label="其他筛选字段"  align=center>
            <template slot-scope="scope">
              <a class="cursor">操作</a><span style="margin:0px 0px 0px 2px"></span>
              <!--<router-link :to="{name:'seedetails',params:{val: scope.row.mac } }" style="cursor:pointer">查看详情</router-link>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="block block_pagination">
          <span class="demonstration"></span>
          <el-pagination
            class="ocontainer_selection_odiv1_btn"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size='num'
            :total="nums"
            :page-count="total"
          >
          </el-pagination>
        </div>
      </template>
      <span>第二步配置远程操作</span>
      <div class="ocontainer_selection">
        <el-form ref="form" label-width="100px">
          <el-form-item label="任务名称"  class="only_margin">
            <el-input size='small' style="width: 350px" v-model='planTitle'></el-input>
          </el-form-item>
          <el-form-item label="类型"  class="only_margin">
            <el-select v-model="planOptionTypeList" @change="handleCheckedOptions"  placeholder="请选择" class="ocontainer_selection_select_width">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择固件" class="only_margin" v-show="chooseRemoteTask">
            <span>{{wenzi}}</span>
            <span class="cursor" @click="dialogFormVisible = true">修改</span>
          </el-form-item>
          <!-- 当选咖啡的时候-->
          <el-form-item label="咖啡类型"  class="only_margin" v-show="coffeeChoose">
            <el-select v-model="coffeeChoosevalue" @change="coffeeChooseChange"  placeholder="请选择" class="ocontainer_selection_select_width">
              <el-option
                v-for="item in optionscoffee"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 当选咖啡加糖的时候-->
          <el-form-item label="咖啡类型"  class="only_margin" v-show="coffeeSugar">
            <el-select v-model="coffeeSugarvalue" @change="coffeeSugarChange"  placeholder="请选择" class="ocontainer_selection_select_width">
              <el-option
                v-for="item in optionscoffeeSugar"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 当设备启用禁用-->
          <el-form-item label="是否启用"  class="only_margin" v-show="DeviceUpDisable">
            <el-select v-model="DeviceUpDisablevalue" @change="DeviceUpDisableChange"  placeholder="请选择" class="ocontainer_selection_select_width">
              <el-option
                v-for="item in optionsDeviceUpDisable"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 当为去点开关-->
          <el-form-item label="是否启用" class="only_margin" v-show="switchtoshow">
            <el-select v-model="switchvalue" @change="switchChange"  placeholder="请选择" class="ocontainer_selection_select_width">
              <el-option
                v-for="item in optionsswitch"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 当选择水表的时候-->
          <el-form-item label="水表"  class="only_margin" v-show="water">
            <el-input placeholder="请输入内容" size="small" prefix-icon="el-icon-search" style="width: 200px"  v-model="watervalue"></el-input>
          </el-form-item>
          <!--设备参数-->
          <div v-show="deviceparametertoshow">
            <el-form-item v-for="(i,index) in addparameter" :key="index">
              <el-input placeholder="请输入内容" size="small" style="width: 200px"  v-model="i.key"></el-input>
              <el-input placeholder="请输入内容" size="small" style="width: 200px"  v-model="i.value"></el-input>
            </el-form-item>
            <span class="deviceparametertoshow_span" @click="toaddparameter"><i class="el-icon-plus addparameter_i"></i>新增</span>
          </div>
          <!-- 弹窗 -->
          <el-dialog title="选择角色" :visible.sync="dialogFormVisible" width="40%" v-loading='loading'>
            <el-form>
              <el-input placeholder="请输入内容" size="small" prefix-icon="el-icon-search" style="width: 200px"  v-model="search"></el-input>
            </el-form>
            <el-row style="margin-top: 10px">
              <el-col>
                <ul class="grid-content bg-purple elcol_ul">
                  <li v-for="(i,j) in searchData" class="elcol_ul_li">
                    <span class="elcol_ul_li_span1">{{i.devType}}</span>
                    <div class="elcol_ul_li_span2">
                      <el-radio-group v-model="checkedCities" @change="handleChecked">
                        <el-radio-button :label="i.deviceId" size='small' >选择</el-radio-button>
                      </el-radio-group>
                    </div>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <!-- <el-button type="primary" size='small' @click="confirm">确认</el-button> -->
          </el-dialog>
        </el-form>
      </div>
      <span>第三步可行性分析</span>
      <div class="ocontainer_selection">
        <el-button  type="primary" size="small" @click="newRemoteTaskcheckClick">分析指令匹配性</el-button>
        <span style="font-size:12px;color:red">分析结果：{{result}}</span>
      </div>
      <span>第四步设置执行时间</span>
      <div class="ocontainer_selection">
        <el-form>
          <el-form-item>
            <el-radio-group v-model="form.resource"  @change="changeRadio">
              <el-radio label="马上执行"></el-radio>
              <el-radio label="定时"></el-radio>
            </el-radio-group>
            <div v-show="timeshow">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="value3"
                @change='changetime(value3)'
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-button  type="primary" size="small" @click="clickAddPlan">马上执行</el-button>
    </el-main>
  </el-container>
</template>

<script>
  import uploadFirmwareUrl from '../../common.js'
  export default {
    data () {
      return {
        index: '',
        loading: false,
        coffeeChoose: false,
        coffeeSugar: false,
        DeviceUpDisable: false,
        switchtoshow: false,
        water: false,
        deviceparametertoshow: false,
        watervalue: '',
        deviceparameterkey: '',
        deviceparametervalue: '',
        switchvalue: '',
        DeviceUpDisablevalue: '',
        coffeeSugarvalue: '',
        optionscoffee: [
          {label:'咖啡机按钮1',value:'1'},
          {label:'咖啡机按钮2',value:'2'},
          {label:'咖啡机按钮3',value:'3'},
          {label:'咖啡机按钮4',value:'4'},
          {label:'咖啡机按钮5',value:'5'},
          {label:'咖啡机按钮6',value:'6'},
          {label:'咖啡机按钮7',value:'7'},
          {label:'咖啡机按钮8',value:'8'},
          {label:'咖啡机按钮9',value:'9'},
          {label:'咖啡机按钮10',value:'10'},
          {label:'咖啡机按钮11',value:'11'},
          {label:'咖啡机按钮12',value:'12'},
          {label:'咖啡机按钮13',value:'13'},
          {label:'咖啡机按钮14',value:'14'},
          {label:'咖啡机按钮15',value:'15'}],
        optionscoffeeSugar: [
          {label:'咖啡机按钮1',value:'1'},
          {label:'咖啡机按钮2',value:'2'},
          {label:'咖啡机按钮3',value:'3'},
          {label:'咖啡机按钮4',value:'4'},
          {label:'咖啡机按钮5',value:'5'}],
        optionsDeviceUpDisable:[
          {label:'启用',value:'0'},
          {label:'禁用',value:'1'},
        ],
        optionsswitch:[
          {label:'通电',value:'0'},
          {label:'断电',value:'1'},
        ],
        form: {resource: '',},
        planOptionTypeList: '',
        commandType: 0,
        options: [],
        coffeeChoosevalue: '',
        tableDatasearch: [],
        dialogFormVisible: false,
        search:'',
        checkedCities: '',
        wenzi: '',
        firmwarePath: '',
        checkList1: '',
        chooseRemoteTask: false,
        macDataArray: [],
        planTitle: '',
        result: '',
        executeTime: '',
        timeshow: false,
        executechoose: 0,
        handleSelectionChangevalue: [],
        options1: [{
          value: 'device_mac',
          label: '设备mac地址',
          options2: [{
            value: 'Congruent',
            label: '全等'
          },{
            value: 'Contain',
            label: '包含'
          }]
        },{
          value: 'hardware_version',
          label: '硬件版本',
          options2: [{
            value: 'Congruent',
            label: '全等'
          },{
            value: 'Contain',
            label: '包含'
          }]
        },{
          value: 'device_electricity',
          label: '生产序列号',
          options2: [{
            value: 'Congruent',
            label: '全等'
          },{
            value: 'Contain',
            label: '包含'
          }]
        },{
          value: 'device_product_sequence_number',
          label: '设备电量',
          options2: [{
            value: 'Congruent',
            label: '全等'
          },{
            value: 'Contain',
            label: '包含'
          }]
        }
        ],
        add: [{ 'condition': '', 'field': '', 'data': '' }],
        addparameter: [{ 'key': '', 'value':'' }],
        page: 1,
        num: 10,
        nums: 0,
        total: 0,
        tableData: [],
        value3: ''
      }
    },
    beforeMount:function() {
      //this.index=this.$route.params.val
    },
    methods: {
      toadd () {
        this.add.push({ 'condition': '', 'field': '', 'data': '' })
      },
      toaddparameter () {
        this.addparameter.push({ 'key': '', 'value':'' })
      },
      del: function (n) {
        this.add.splice(n, 1)
      },
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      //选择设备
      handleSelectionChange(val) {
        this.handleSelectionChangevalue=val
      },
      //选择时间
      changetime (val) {
        var year = val.getFullYear()
        var month = val.getMonth()+1
        var day = val.getDate()
        var hour = val.getHours()
        var minute = val.getMinutes()
        var second = val.getSeconds()
        this.executeTime=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
      },
      //选择马上执行还是自定义
      changeRadio (val) {
        // console.log(val)
        if(val=='马上执行'){
          this.executeTime=''
          this.timeshow=false
        }else{
          // console.log(this.value3)
          this.timeshow=true
          // var year = value3.getFullYear()
          // var month = value3.getMonth()+1
          // var day = value3.getDate()
          // var hour = value3.getHours()
          // var minute = value3.getMinutes()
          // var second = value3.getSeconds()
          // this.executeTime=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
        }
      },
      //添加远程任务
      clickAddPlan () {
        var AddPlan = uploadFirmwareUrl.url().AddPlan
        var macData = this.handleSelectionChangevalue
        if(macData==[]){
          this.$message.error('请选择设备')
          return;
        }
        this.macDataArray=[]
        for(var i=0;i<macData.length;i++){
          this.macDataArray.push(macData[i].mac)
        }
        //mac地址
        var macDataString=this.macDataArray.toString()
        //指令类型
        var commandType=this.commandType
        //计划任务名称
        var planTitle=this.planTitle
        //固件地址
        var firmwarePath=this.firmwarePath
        if(this.executechoose){
          var executeTime= ''
        }else{
          var executeTime= this.executeTime
        }
        if(this.coffeeChoose){
          var extendData={'coffeeType':0}
          extendData.coffeeType=this.coffeeChoosevalue
          extendData=JSON.stringify(extendData)
        }else if(this.coffeeSugar) {
          var extendData={'sugarType':0}
          extendData.sugarType=this.coffeeSugarvalue
          extendData=JSON.stringify(extendData)
        }else if(this.DeviceUpDisable) {
          var extendData={'isAble':0}
          extendData.isAble=this.DeviceUpDisablevalue
          extendData=JSON.stringify(extendData)
        }else if(this.switchtoshow) {
          var extendData={'isOpen':0}
          extendData.isOpen=this.switchvalue
          extendData=JSON.stringify(extendData)
        }else if(this.deviceparametertoshow){
          var extendData={}
          extendData.param={}
          for(var i in this.addparameter){
            var obj = this.addparameter[i]
            extendData.param[obj.key] = obj.value
          }
          extendData=JSON.stringify(extendData)
        }else if(this.water){
          var extendData={'n':''}
          extendData.n=this.watervalue
          extendData=JSON.stringify(extendData)
        }else{
          var extendData='{}'
        }
        this.$http.post(AddPlan,
          {
            macData: macDataString,
            commandType: commandType,
            extendData: extendData,
            planTitle: planTitle,
            executeTime:executeTime,
            firmwarePath: firmwarePath
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.$router.go(-1)
            this.$message.success(response.data.msg)
          }else{
            this.$message(response.data.msg)
          }
        }, (response) => {

        })
      },
      //监测远程任务是否可以正常运行
      newRemoteTaskcheckClick () {
        var newRemoteTaskcheck = uploadFirmwareUrl.url().newRemoteTaskcheck
        var macData = this.handleSelectionChangevalue
        if(macData==[]){
          this.$message.error('请选择设备')
          return
        }
        this.macDataArray=[]
        for(var i=0;i<macData.length;i++){
          this.macDataArray.push(macData[i].mac)
        }
        //mac地址
        var macDataString=this.macDataArray.toString()
        //指令类型
        var commandType=this.commandType
        //计划任务名称
        var planTitle=this.planTitle
        //固件地址
        var firmwarePath=this.firmwarePath
        //煮咖啡的时候
        if(this.coffeeChoose){
          var extendData={'coffeeType':0}
          extendData.coffeeType=this.coffeeChoosevalue
          extendData=JSON.stringify(extendData)
        }else if(this.coffeeSugar) {
          var extendData={'sugarType':0}
          extendData.sugarType=this.coffeeSugarvalue
          extendData=JSON.stringify(extendData)
        }else if(this.DeviceUpDisable) {
          var extendData={'isAble':0}
          extendData.isAble=this.DeviceUpDisablevalue
          extendData=JSON.stringify(extendData)
        }else if(this.switchtoshow) {
          var extendData={'isOpen':0}
          extendData.isOpen=this.switchvalue
          extendData=JSON.stringify(extendData)
        }else if(this.water){
          var extendData={'n':''}
          extendData.n=this.watervalue
          extendData=JSON.stringify(extendData)
        }else if(this.deviceparametertoshow){
          var extendData={}
          extendData.param={}
          for(var i in this.addparameter){
            var obj = this.addparameter[i]
            extendData.param[obj.key] = obj.value
          }
          extendData=JSON.stringify(extendData)
        }else{
          var extendData='{}'
        }
        if(macData!=''){
          this.$http.post(newRemoteTaskcheck,
            {
              macData: macDataString,
              commandType: commandType,
              extendData: extendData,
              planTitle: planTitle,
              firmwarePath: firmwarePath
            },
            {
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              var data = response.data.data
              this.result='可执行数量:'+data.success+'不可执行数量:'+data.fail+'总数量:'+data.total
            }
          }, (response) => {

          })
        }
      },
      //下拉选择
      handleCheckedOptions (value) {
        if(value==17){
          this.chooseRemoteTask=true
          this.coffeeChoose=false
          this.coffeeSugar=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
          this.water=false
          this.deviceparametertoshow=false
        } else if (value==6) {
          this.coffeeChoose=true
          this.chooseRemoteTask=false
          this.coffeeSugar=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
          this.water=false
          this.deviceparametertoshow=false
        }else if(value==7) {
          //咖啡加糖
          this.coffeeSugar=true
          //选择固件
          this.chooseRemoteTask=false
          //选择咖啡
          this.coffeeChoose=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
          this.water=false
          this.deviceparametertoshow=false
        }else if(value==8) {
          //咖啡加糖
          this.coffeeSugar=false
          //选择固件
          this.chooseRemoteTask=false
          //选择咖啡
          this.coffeeChoose=false
          //设备启用禁用
          this.DeviceUpDisable=true
          this.switchtoshow=false
          this.water=false
          this.deviceparametertoshow=false
        }else if(value==12||value==13) {
          //咖啡加糖
          this.coffeeSugar=false
          //选择固件
          this.chooseRemoteTask=false
          //选择咖啡
          this.coffeeChoose=false
          //设备启用禁用
          this.DeviceUpDisable=false
          //取电开关
          this.switchtoshow=true
          this.deviceparametertoshow=false
          this.water=false
        }else if (value==14){
          //水表
          this.water=true
          this.coffeeChoose=false
          this.chooseRemoteTask=false
          this.coffeeSugar=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
          this.deviceparametertoshow=false
        }else if (value==16){
          //水表
          this.water=false
          //参数
          this.deviceparametertoshow=true
          this.coffeeChoose=false
          this.chooseRemoteTask=false
          this.coffeeSugar=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
        }else{
          this.coffeeChoose=false
          this.chooseRemoteTask=false
          this.coffeeSugar=false
          this.DeviceUpDisable=false
          this.switchtoshow=false
          this.water=false
          this.deviceparametertoshow=false
        }
        this.commandType=value
      },
      //类型为咖啡的时候
      coffeeChooseChange (value) {
        this.coffeeChoosevalue=value
      },
      //咖啡加糖
      coffeeSugarChange (value) {
        this.coffeeSugarvalue=value
      },
      //设备的禁用启用
      DeviceUpDisableChange (value) {
        this.DeviceUpDisablevalue=value
      },
      //当为去点开关的时候
      switchChange (value) {
        this.switchvalue=value
      },
      //选择固件
      handleChecked (value) {
        this.checkList1=value
        this.wenzi=this.tableDatasearch[value-1].devType
        //固件的url
        this.firmwarePath=this.tableDatasearch[value-1].url
        this.dialogFormVisible=false
      },
      handleCurrentChange (val) {
        let notOnline=uploadFirmwareUrl.url().notOnline
        this.tableData=this.tableData.splice(0,0)
        let page=val
        let num=this.num
        let add=JSON.stringify(this.add)
        this.$http.post(notOnline,
          {
            s: add
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {

            this.loading=false
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            this.nums=data.nums
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num

            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData=list
          }
        }, (response) => {

        })
      },
      handleSizeChange (val) {
        var notOnline=uploadFirmwareUrl.url().notOnline
        this.tableData=this.tableData.splice(0,0)
        let page=this.page
        let num=val
        let add=JSON.stringify(this.add)
        this.$http.post(notOnline,
          {
            s: add
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {

            this.loading=false
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            this.nums=data.nums
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num

            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData=list
          }
        }, (response) => {

        })
      },
      shaixuan: function () {
        let notOnline=uploadFirmwareUrl.url().notOnline
        this.tableData=this.tableData.splice(0,0)
        let page=this.page
        let num=this.num
        let add=JSON.stringify(this.add)
        this.$http.post(notOnline,
          {
            s: add
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {

            this.loading=false
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            this.nums=data.nums
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num

            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData=list
          }
        }, (response) => {

        })
      }
    },
    computed: {
      selection: function() {
        if(this.add.length){
          for (var i = 0; i < this.options1.length; i++) {
            for(var j=0;j<this.add.length;j++){
              if (this.options1[i].value === this.add[j].field) {
                return this.options1[i].options2
              }
            }
          }
        }
      },

      searchData: function() {
        var search = this.search;
        if (search) {
          var arr=[]
          this.tableDatasearch.forEach(function(i){
            arr.push({groupName:i.groupName})
          })
          return arr.filter(function(tableDatasearch) {
            return Object.keys(tableDatasearch).some(function(key) {
              return String(tableDatasearch[key]).indexOf(search) > -1
            })
          })
        }
        return this.tableDatasearch
      }

    },
    mounted: function () {
      this.loading=true
      //类型选择
      var planOptionTypeList=uploadFirmwareUrl.url().planOptionTypeList
      this.$http.get(planOptionTypeList,
        {
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          this.options=response.data.data
          console.log(response.data.data)
        }
      }, (response) => {

      })
      //固件列表
      var firmwarelist=uploadFirmwareUrl.url().firmwarelist
      this.$http.get(firmwarelist,
        {
          params: {
            page: 1,
            num: 1000
          }
        },
        {
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          this.tableDatasearch=response.data.data.list
        }
      }, (response) => {

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
  .ocontainer_selection{
    clear: both;
    margin:15px 0px;
    padding:15px;
    border:1px solid #eee
  }
  .ocontainer_selection_odiv{
    margin:15px 0px;
  }
  .ocontainer_selection_odel{
    cursor:pointer;
    color: #16D032;
    display:inline-block;
    margin-left:5%
  }
  .ocontainer_selection_oinput{
    width:36%;
    display: inline-block
  }
  .ocontainer_selection_odiv1{
    height: 75px;
    margin-top:15px
  }
  .ocontainer_selection_odiv1_span{
    cursor:pointer;
    color: #16D032;
  }
  .ocontainer_selection_odiv1_btn{
    margin-top:15px
  }
  .block_pagination{clear:both;margin-bottom:15px}
  .only_margin{
    margin-bottom:14px
  }
  .ocontainer_selection_select_width{
    width:25%
  }
  .deviceparametertoshow_span{
    display: inline-block;
    margin-top: 15px;
    cursor:pointer;
    color: #16D032;
  }
  .addparameter_i{
    color: #42b983;
  }
  .elcol_ul{
    border-right: 2px solid #eee;
    height: 200px;
    overflow:auto
  }
  .elcol_ul_li{
    height: 47px;
    line-height:42px
  }
  .elcol_ul_li_span1{
    width:70.8%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  .elcol_ul_li_span2{
    width:3%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  /*.cell{text-align: center}*/
</style>
