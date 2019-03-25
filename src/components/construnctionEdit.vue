<template>
  <el-container class="ocontainer" style="background-color:#fff">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/firmwarelist' }">施工任务</el-breadcrumb-item>
        <el-breadcrumb-item>编辑任务</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer" v-loading="loading">
      <el-form ref="form" label-width="100px" :label-position="left">
        <el-form-item label="任务名称"  class="ocontainer_item_label">
          <el-input size='small' maxlength="200" class="ocontainer_item_input" v-model='firmwareName'></el-input>
        </el-form-item>
        <el-form-item label="任务描述"  class="ocontainer_item_label">
          <el-input type="textarea" maxlength="200" size='small' class="ocontainer_item_input" v-model="desc"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <div style="margin-bottom:10px">
            <el-select v-model="Totaltype"  placeholder="请选择" style="width:25%">
              <el-option
                v-for="item in Totaltasktype"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="施工类型">
          <!--维护多选匡-->
          <div v-if="maintainOption">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in maintainOptions" :label="city.value" :key="city.value">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else>
            <el-checkbox v-model="checked">更换设备</el-checkbox>
          </div>

        </el-form-item>
        <!--//升级固件-->
        <el-form-item label="升级固件" v-show="flag">
          <el-select v-model="uploadedFirmware"  placeholder="请选择已上传的固件"  >
            <el-option
              v-for="item in firmwareSelect"
              :key="item.devType"
              :label="item.firmwareVersion"
              :value="item.url"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="施工人员">
          <!--//施工组织-->
          <el-select v-model="groupMessage" @change="groupId" placeholder="请选择施工组织"  >
            <el-option
              v-for="item in groupData"
              :key="item.id"
              :label="item.organizeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!--//施工人员-->
          <el-select v-model="orgAllPerson" @change="personCheck" placeholder="请选择施工人员">
            <el-option
              v-for="item in AllPersonData"
              :key="item.id"
              :label="item.nameCn"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="施工酒店">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="searchHotels"
            :fetch-suggestions="querySearch"
            placeholder="请输入酒店"
            @select="handleSelect">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.hotelName }}</div>
              <!--<span class="addr">{{ item.hotelCode }}</span>-->
            </template>
          </el-autocomplete>
        </el-form-item>

        <el-form-item label="完成期限">
          <template>
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="value1"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </template>

        </el-form-item>
      </el-form>
      <a size="small" @click="getAreaAndPointTree" class="construction_person" style="cursor:pointer;color: #16D032;display:inline-block;">+施工对象</a>
      <el-dialog
        title="添加施工对象"
        :visible.sync="dialogVisible"
        width="50%">
        <el-tree
          :data="pointTrees"
          show-checkbox
          default-expand-all
          node-key="onlyType"
          ref="tree"
          :default-checked-keys="checkedKey"
          highlight-current
          :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
        </span>
      </el-dialog>
      <!--//选择的施工对象展示列表-->
      <div class="exhibition">
        <div v-show="exhibition.length != 0">选择的施工对象</div>
        <div class="exhibition_box" v-show="exhibition.length != 0">
          <span class="exhibition_span" v-for="item in exhibition">{{item.areaName}}</span>
        </div>
      </div>
      <!--维护多选匡-->
      <!--<template>-->
      <!--<div v-if="maintainOption">-->
      <!--<div style="margin: 15px 0;"></div>-->
      <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
      <!--<el-checkbox v-for="city in maintainOptions" :label="city.value" :key="city.value">{{city.name}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
      <!--</div>-->
      <!--</template>-->

      <!--确认提交按钮-->
      <el-button :disabled="status ==2" @click="addTask" class="sureButton">确认任务</el-button>



    </el-main>
  </el-container>
</template>

<script>
  import uploadFirmwareUrl from '../common.js'
  import rolelistUrl from '../common.js'

  const maintainOptions = [
    {
      name:'同步时钟',
      value:1
    },
    {
      name:'下载参数',
      value:2
    },
    {
      name:'固件OTA升级',
      value:4
    },
    {
      name:'解除绑定',
      value:8
    },
    {
      name:'更换电池',
      value:16
    },
    {
      name:'更换设备',
      value:32
    },
    {
      name:'更换二维码',
      value:64
    }
  ];


  import {mapState,mapActions} from 'vuex';
  export default {
    data () {
      return {
        firmwareSelect:[],
        uploadedFirmware:'',
        flag:false,
        form:[],
        firmwareName:'',
        desc:'',
        checked:true,
        tasktype1:'',
        tasktype2:'',
        loading:false,
        Totaltype:'',
        typeNum:'',
        Totaltasktype:[
          {
            name:'安装',
            value:'1'
          },
          {
            name:'维护',
            value:'2'
          }
        ],
        groupMessage:'',
        orgAllPerson:'',
        group:[],
        labelPosition:'top',
        left:'left',
        value1: '',
        value2: '',
        groupData:[],
        AllPersonData:[],
        dialogVisible: false,
        pointTrees:[],
        defaultProps: {
          children: 'childrenList',
          label: 'areaName'
        },
        exhibition:[],
        checkedCities: [],
        maintainOptions: maintainOptions,
        maintainOption: false,
        searchHotelData:[],
        restaurants: [],
        searchHotels: '',
        searchHotelCode:'',
        parameter:[],
        parameterString:'',
        workerId:'',
        subType:'',
        checkedKey:[],
        taskId:'',
        status:'',
        typenum:'',
        pickerOptions:{
          disabledDate(time) {
            const date = new Date();
            return time.getTime() < date.setTime(date.getTime() - 3600 * 1000 * 24);
          }
        }

      }
    },
    computed: {
      ...mapState([
        'hotel'
      ])
    },
    methods: {
      ...mapActions([
        ''
      ]),
      initEdit(){
        this.taskId = sessionStorage.getItem("taskId")
        let getTaskByIdUrl=rolelistUrl.url().getTaskById;
        // this.loading=true
        this.$http.post(getTaskByIdUrl,
          {
            "taskId": this.taskId
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            let data=response.data.data
            //任务名称
            this.firmwareName = data.taskTitle
            //任务描述
            this.desc = data.taskDescription
            //任务类型
            if(data.type == 1){
              this.Totaltype = "安装"
            }else if(data.type == 2){
              this.Totaltype = "维护"
            }
            //日期
            this.value1 = data.dueDateStr
            //酒店
            this.searchHotels = data.hotelName
            this.searchHotelCode = data.hotelId
            //施工人员
            this.workerId = data.workerId
            this.orgAllPerson = data.workerName
            //施工组织
            this.groupMessage = data.organName
            //施工对象
            for(let i of data.apList){
              this.checkedKey.push(i.onlyType)
            }

            //subType
            let subTypeStr = data.subType?(data.subType).split(','):''
            for (let num of subTypeStr){
              this.checkedCities.push(num-0)
            }
            this.parameter = data.apList


          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //组织列表数据
      init(a){
        let searchOrganizeGroupUrl=rolelistUrl.url().searchOrganizeGroup;
        this.loading=true
        if(!a){
          a=''
        }
        this.$http.post(searchOrganizeGroupUrl,
          {
            organizeName: a
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            let data=response.data.data
            this.groupData = data;
            this.loading=false
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //人数
      //组织成员初使数据
      initgetOrgAllPerson(id){
        let getOrgAllPersonUrl = rolelistUrl.url().getOrgAllPerson;
        this.loading = true
        this.$http.post(getOrgAllPersonUrl,
          {
            nameCn: "", //nameCn属于模糊搜索字段，适用姓名和手机
            buildId: id  //状态判断 如果为0则表示模糊搜索成员，不为0表示一个组织下所有成员
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.AllPersonData = data
            this.loading = false
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //酒店列表
      searchHotel(){
        let searchHotelUrl = rolelistUrl.url().searchHotel;
        // this.loading = true
        this.$http.post(searchHotelUrl,
          {
            "k":''
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.searchHotelData = data
            // console.log(data)
            // this.loading = false
            // 酒店下啦测试
            this.restaurants = this.loadAll();

          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },

      //人员选择
      personCheck(val){
        // console.log(val)
        this.workerId = val
      },
      //获取组织ID
      groupId(val){
        // console.log(val)
        this.orgAllPerson = '';
        this.initgetOrgAllPerson(val);
      },

      //添加施工对象
      getAreaAndPointTree(){
        if(this.Totaltype == '安装'){
          this.typenum = 1
        }else if(this.Totaltype == '维护'){
          this.typenum = 2
        }
        this.dialogVisible = true
        let getAreaAndPointTreeUrl = rolelistUrl.url().getAreaAndPointTree;
        // this.loading = true
        this.$http.post(getAreaAndPointTreeUrl,
          {
            code: this.searchHotelCode,
            devType:this.typenum  //1是安装  2 是维护
            // code:'0864f6731acb11e780ad5cb9018d9b5c'
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            // console.log(data.childrenList)
            this.pointTrees = data.childrenList
            // this.loading = false
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      },
      //添加施工对象弹层按钮（确认 ）
      getCheckedNodes(){
        this.parameter = []
        // console.log(this.$refs.tree.getCheckedNodes());
        if(this.$refs.tree.getCheckedNodes().length == 0){
          this.$message.error('施工对象不能为空')
        }
        this.exhibition = this.$refs.tree.getCheckedNodes()
        // console.log(this.exhibition)
        for (let v of this.exhibition) {
          this.parameter.push({
            areaId: v.areaId,
            pointId: v.pointId,
            onlyType:v.onlyType,
            parentEntranceGuardAreaId:v.parentEntranceGuardAreaId
          })
        }
        // console.log(this.parameter)

        this.dialogVisible = false
      },

      //单选
      handleCheckedCitiesChange(value) {
        let searchFirmware=rolelistUrl.url().firmWareGroup;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.maintainOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.maintainOptions.length;
        this.subType = value.join(',')
        this.flag=value.some(item=>{
          if(item=='4'){
            return true;
          }else {
            return false
          }
        });
        console.log(searchFirmware)
        if(this.flag){
          this.$http.post(searchFirmware,
            {
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code == 0) {
              this.firmwareSelect = response.data.data;

              this.loading = false
            } else {
              this.$message.error(response.data.msg)
            }
          }, (response) => {
            this.$message('请求出错')
          })
        }
      },


      // 酒店下啦测试
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.hotelName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.searchHotelData;
      },
      handleSelect(item) {
        // console.log(item)
        this.searchHotels = item.hotelName
        // 酒店code
        this.searchHotelCode = item.hotelCode
        // console.log(this.searchHotelCode)
      },
      handleIconClick(event) {
        // console.log(event);
      },

      //提交任务数据
      addTask(){
        let updateTaskUrl = rolelistUrl.url().updateTask;
        this.loading = true
        if(this.Totaltype == "安装"){
          this.typeNum = 1
        }else if(this.Totaltype == "维护"){
          this.typeNum = 2
        }
        if(!this.subType){
          this.subType = this.checkedCities.join(',')
        }
        let model = {
          "taskId":this.taskId,
          "workerId": this.workerId,
          "type": this.typeNum,
          "taskTitle": this.firmwareName,
          "taskDescription": this.desc,
          "taskComments": "",
          "hotelId": this.searchHotelCode,
          "hotelName": this.searchHotels,
          "dueDate": this.value1,
          "subType": this.subType,
          "apList": this.parameter,
          "fwUrl":this.uploadedFirmware
        }
        this.$http.post(updateTaskUrl,
          {
            model:JSON.stringify(model)
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.loading = false
            this.$message.success('编辑成功')
            this.$router.push('/device/constructionlist')
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      }

    },
    watch:{
      Totaltype:function () {
        if(this.Totaltype == '维护'){
          this.maintainOption = true
        }else {
          this.maintainOption = false
        }
      }
    },

    mounted: function () {
      this.initEdit();
      this.init();
      this.searchHotel();
      this.status = sessionStorage.getItem("status")
      console.log(this.status)
    }

  }
</script>

<style>
  .ocontainer_item_label {
    margin-bottom: 14px;
  }
  .construction_person{
    float: left;
  }
  .el-form-item{
    margin-bottom: 20px;
  }
  .exhibition{
    clear: both;
    padding-top: 20px;
  }
  .exhibition_box{
    margin: 10px 0;
    border: 1px solid #eee;
    padding: 10px;
  }
  .exhibition_span{
    margin-right: 20px;
  }
  .sureButton{
    color:#16D032;
    margin: 20px 0;
  }
</style>
