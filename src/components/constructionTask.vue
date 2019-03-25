<template>
  <el-container class="ocontainer" style="background-color:#fff">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item>施工任务</el-breadcrumb-item>
        <el-breadcrumb-item>新建任务</el-breadcrumb-item>
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
            <el-select v-model="Totaltype"  placeholder="请选择任务类型" style="width:25%">
              <el-option
                v-for="item in Totaltasktype"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="施工类型">
          <!--维护多选匡-->
          <div v-if="maintainOption">
            <div style="margin: 10px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(city,index) in maintainOptions" :label="city.value" :key="index">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else>
            <div style="margin: 10px 0;"></div>
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
          <el-select v-model="groupMessage" @change="groupDataChange" placeholder="请选择施工组织"  >
            <el-option
              v-for="item in groupData"
              :key="item.value"
              :label="item.organizeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!--//施工人员-->
          <el-select v-model="orgAllPerson"  placeholder="请选择施工人员">
            <el-option
              v-for="item in AllPersonData"
              :key="item.value"
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

      <a size="small" @click="getAreaAndPointTree" class="construction_person" style="cursor:pointer;color: #16D032;display:inline-block;">编辑施工对象</a>
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

      <!--确认提交按钮-->
      <el-button @click="addTask" class="sureButton">确认任务</el-button>

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

  export default {
    data () {
      return {
        uploadedFirmware:'',
        flag:false,
        firmwareSelect:[],
        updateFarmware:'',
        form:[],
        firmwareName:'',
        desc:'',
        tasktype1:'',
        tasktype2:'',
        Totaltype:'',
        checked: true,
        checked2:true,
        loading:false,
        Totaltasktype:[
          {
            label:'安装',
            value:'1'
          },
          {
            label:'维护',
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
        pickerOptions:{
          disabledDate(time) {
            const date = new Date();
            return time.getTime() < date.setTime(date.getTime() - 3600 * 1000 * 24);
          }
        }
      }
    },
    computed: {
      selection: function() {

        if(this.add.length){
          for (var i = 0; i < this.options1.length; i++) {
            for(var j=0;j<this.add.length;j++){
              //判断选中的值是不是等于this.options1[i].value
              if (this.options1[i].value === this.add[j].field) {
                return this.options1[i].options2
              }
            }
          }
        }
      }
    },
    watch:{
      Totaltype:function () {
        if(this.Totaltype == 2){
          this.maintainOption = true
        }else {
          this.maintainOption = false
        }
      },
      orgAllPerson:function (e) {
        this.workerId = e
      }
    },
    beforeMount:function() {
      // this.index=this.$route.params.val
    },
    methods: {
      //添加施工对象
      // toadd: function () {
      //     var toadd=this.addone[this.addone.length-1]
      //     //深复制
      //     var result = JSON.parse(JSON.stringify(toadd))
      //     this.addone.push(result)
      // },
      //删除施工对象
      // del: function (n) {
      //     if(n<1){
      //         return;
      //     }
      //     this.addone.splice(n, 1)
      // },
      // 选择
      // select(res,tt){
      //     for (var j = 0; j < this.addone[tt].options1.length; j++) {
      //         if(res===this.addone[tt].options1[j].value){
      //             this.addone[tt].options3=this.addone[tt].options1[j].options2
      //             return;
      //         }
      //     }
      //
      // },
      // selectTasktype(res,tt){
      //     for (var j = 0; j < this.tasktype[tt].Totaltasktype1.length; j++) {
      //         if(res===this.tasktype[tt].Totaltasktype1[j].value){
      //             this.tasktype[tt].Subtasktype3=this.tasktype[tt].Totaltasktype1[j].Subtasktype2
      //             return;
      //         }
      //     }
      // },
      //组织列表数据
      init(a){
        let searchOrganizeGroupUrl=rolelistUrl.url().searchOrganizeGroup;
        this.loading=true
        if(!a){
          a=''
        };
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
        });
      },
      //人数
      //组织成员初使数据
      initgetOrgAllPerson(id){
        let getOrgRunPersonUrl = rolelistUrl.url().getOrgRunPerson;
        this.loading = true
        this.$http.post(getOrgRunPersonUrl,
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
      //添加施工对象
      getAreaAndPointTree(){
        if(!this.Totaltype){
          this.$message.error('请选择任务类型')
          return false;
        }else if(!this.searchHotels){
          this.$message.error('请选择酒店')
          return false;
        }
        this.dialogVisible = true
      },
      //树形列表
      treeList(){
        let getAreaAndPointTreeUrl = rolelistUrl.url().getAreaAndPointTree;
        this.loading = true
        this.$http.post(getAreaAndPointTreeUrl,
          {
            code: this.searchHotelCode,
            devType:this.Totaltype ||1 //1是安装  2 是维护
            // code:'0864f6731acb11e780ad5cb9018d9b5c'
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code == 0) {
            let data = response.data.data
            this.pointTrees = data? data.childrenList : ''
            this.loading = false
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
        console.log(this.parameter)

        this.dialogVisible = false
      },

      //单选
      handleCheckedCitiesChange(value) {
        let searchFirmware=rolelistUrl.url().firmWareGroup;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.maintainOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.maintainOptions.length;
        this.subType = value.join(',');
        console.log('value',value);

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
        this.treeList()
      },
      handleIconClick(event) {
        // console.log(event);
      },
      //根据组织的变化来获取人员
      groupDataChange(){
        console.log(this.groupMessage)
        if(this.groupMessage){
          this.initgetOrgAllPerson(this.groupMessage);
        }
      },

      //提交任务数据
      addTask(){
        if(!this.firmwareName){
          this.$message.error('任务名称不能为空')
          return false;
        }else if(!this.Totaltype){
          this.$message.error('请选择任务类型')
          return false;
        }
        if(this.Totaltype == 2){
          if(this.checkedCities.length == 0){
            this.$message.error('请选择施工类型')
            return false;
          }
        }
        if(!this.groupMessage){
          this.$message.error('请选择施工组织')
          return false;
        }else if(!this.orgAllPerson){
          this.$message.error('请选择施工人员')
          return false;
        }else if(!this.searchHotels){
          this.$message.error('请选择酒店')
          return false;
        }else if(!this.value1){
          this.$message.error('请选择日期')
          return false;
        }else if(this.parameter.length == 0){
          this.$message.error('请选择施工对象')
          return false;
        }

        let addTaskUrl = rolelistUrl.url().addTask;
        this.loading = true
        let model = {
          "workerId": this.workerId,
          "type": this.Totaltype,
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
        this.$http.post(addTaskUrl,
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
            this.$message.success('添加成功')
            this.$router.push('/device/constructionlist')
          } else {
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message('请求出错')
        })
      }

    },
    mounted: function () {
      this.init();
      // this.getAreaAndPointTree();
      this.searchHotel();

    },

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

  .el-form-item__content{
    line-height: 0;
  }

  .my-autocomplete li{
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete .name{
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete .addr{
    font-size: 12px;
    color: #b4b4b4;
  }
  .my-autocomplete .highlighted .addr{
    color: #ddd;
  }


</style>
