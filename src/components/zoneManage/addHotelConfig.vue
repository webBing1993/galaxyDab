<!--新建酒店配置-->
<template>
  <el-container class="ocontainer" style="background-color:#fff">
    <el-header class="oheader" style="height: 5%;">

      <span class="oheader_span">酒店配置 > {{routeTitle}}</span>
    </el-header>
    <div class="configContent">
      <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="门锁电量配置" name="second" v-show="config.hotelCode"></el-tab-pane>
      </el-tabs>
      <div v-show="activeTab=='first'">
        <div class="item">
          <span class="title">酒店</span>
          <el-select v-model="config.name"
                     filterable
                     remote
                     reserve-keyword
                     :remote-method="remoteMethod"
                     :loading="loading"
                     placeholder="请选择酒店" class="itemWidth" :disabled="readOnly">
            <el-option
              v-for="item in list"
              :key="item.hotelCode"
              :label="item.hotelName"
              :value="item.hotelName">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="title">空间名称</span>
          <el-input v-model="config.name" placeholder="请输入内容" style="width: 20%" readonly></el-input>
        </div>
        <div class="item">
          <span class="title">状态</span>
          <el-select v-model="config.status" placeholder="请选择" class="itemWidth">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="title">上线日期</span>
          <el-date-picker
            v-model="config.onlineTimeStr"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" class="itemWidth">
          </el-date-picker >
          <span class="title2">停用日期</span>
          <el-date-picker
            v-model="config.outOfServiceStr"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" class="itemWidth">
          </el-date-picker >
        </div>
        <div class="item">
          <span class="title">房间最晚离店时间</span>
          <el-time-picker
            v-model="config.latestTimeOfDeparture"
            placeholder="任意时间点"
            value-format="HH:mm:ss">
          </el-time-picker>
          <span class="title2">延迟离店时长</span>
          <el-select v-model="config.delayOfYourDeparture" placeholder="请选择" class="itemWidth">
            <el-option
              v-for="item in delayOffList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v>
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="title">申请临时开门时长</span>
          <el-select v-model="config.temporaryOpeningTime" placeholder="请选择" class="itemWidth">
            <el-option
              v-for="item in temporaryOpeningList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="title">是否需实名领卡</span>
          <el-switch
            v-model="config.realNameTakeTheCard"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="item" >
          <span class="title">房卡梯控配置</span>
          <div v-show="config.liftList.length>0&&config.liftList[0].pointId">
            <div v-for="(item,index) in config.liftList" >
              <h2 style="display: inline-block;font-weight: bold;">{{item.pointName}}</h2>
              <div>
                <el-radio-group v-model="item.liftType" style="margin-top: -1rem">
                  <el-radio :label="1">仅房间所在楼层</el-radio>
                  <el-radio :label="2">所有楼层</el-radio>
                  <el-radio :label="3">指定楼层（以及房间所在楼层）</el-radio>
                </el-radio-group>
                <div v-show="item.liftType=='3'">
                  <el-checkbox  v-model="i.flag" :label="i.floors" border size="medium"  v-for="(i,key) in item.floorsList" :key="key"></el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-row style="margin-top: 5rem;margin-left: 8rem">
          <el-button type="success" @click="saveOrModify" :disabled="!validateHotelConfig">保存</el-button>
          <el-button type="info" @click='goto(-1)'>取消</el-button>
        </el-row>
      </div>
      <div v-show="activeTab=='second'">
        <el-button type="success" style="float: right" @click="showAddNewDoor">新增</el-button>
        <el-table
          :data="doorList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="doorModel"
            label="门锁品牌型号"
          >
          </el-table-column>
          <el-table-column
            prop="battery"
            label="电池规格"
          >
          </el-table-column>
          <el-table-column
            prop="normalVol"
            label="标准电压">
          </el-table-column>
          <el-table-column
            prop="warningVol"
            label="最低电压">
          </el-table-column>
          <el-table-column
            prop="checkModelStr"
            label="反锁检测类型">
          </el-table-column>
          <el-table-column
            prop="doubleLockStr"
            label="是否支持反锁开门">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="goDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="添加/修改门锁电量计量规则"
          :visible.sync="showDialog"
          width="30%"
          center>
          <div class="item">
            <span class="title">门锁品牌型号</span>
            <el-input v-model="doorObj.doorModel" placeholder="请输入内容" style="width: 50%" ></el-input>
          </div>
          <div class="item">
            <span class="title">电池规格</span>
            <el-input v-model="doorObj.battery" placeholder="请输入内容" style="width: 50%" ></el-input>
          </div>
          <div class="item">
            <span class="title">标准电压</span>
            <el-input v-model="doorObj.normalVol" placeholder="请输入内容" style="width: 50%" ></el-input>
          </div>
          <div class="item">
            <span class="title">最低电压</span>
            <el-input v-model="doorObj.warningVol" placeholder="请输入内容" style="width: 50%" ></el-input>
          </div>
          <div class="item">
            <span class="title">是否支持反锁开门</span>
            <el-switch
              v-model="doorObj.doubleLock"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
          <div class="item">
            <span class="title">反锁检测类型</span>
            <el-select v-model="doorObj.checkModel" placeholder="请选择">
              <el-option
                v-for="item in checkModelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveDoorLock" :disabled="!validateDoor">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </el-container>

</template>
<script>
  import rolelistUrl from '../../common.js'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        checkModelOptions:[
          {
            value: 0,
            label: '未选择'
          },
          {
            value: 1,
            label: '方波到低电平'
          },
          {
            value: 2,
            label: '高电平>低电平'
          }
        ],
        flag:false,
        showDialog:false,
        activeTab:'first',
        config:{
          "id": '',
          "hotelCode": "",
          "name": "",
          "status": 1,
          "onlineTime": '',
          "onlineTimeStr": "",
          outOfServiceStr:'',
          "outOfService": '',
          "latestTimeOfDeparture": "",
          "delayOfYourDeparture": 0,
          "temporaryOpeningTime":10,
          "realNameTakeTheCard": false,
          "liftList": [
            {
              "pointId": null,
              "pointName": "一号梯控",
              "liftType": 3,
              "floors": [],
              "selectFloor": "1",
              "hotelCode": "338",
              "floorsList": [
                {
                  "floors": "1",
                  "flag": true
                }
              ]
            },]
        },
        doorList: [],
        doorObj:{
          doorModel: "",
          battery: "",
          normalVol: "",
          warningVol: "",
          doubleLock:false,
          checkModel:''
        },
        statusList:[
          {
            value:1,
            label:'试点'
          },{
            value:2,
            label:'运行'
          },{
            value:3,
            label:'停用'
          },

        ],
        hotelList: [],
        list:[{
          hotelCode:'',
          hotelName:''
        }],
        state4: '',
        timeout:  null,
        delayOffList: [{
          value: 0,
          label: '0小时'
        },{
          value: 1,
          label: '1小时'
        },{
          value: 2,
          label: '2小时'
        },{
          value: 3,
          label: '3小时'
        },{
          value: 4,
          label: '4小时'
        }],
        temporaryOpeningList:[{
          value:5,
          label:'5分钟'
        },{
          value:10,
          label:'10分钟'
        },{
          value:15,
          label:'15分钟'
        },{
          value:20,
          label:'20分钟'
        },{
          value:25,
          label:'25分钟'
        },{
          value:30,
          label:'30分钟'
        }],
        value: '',
        checked5:1,
        checked6:2,
        loading:false

      }
    },
    computed: {
      routeTitle(){
        if(this.$route.params.id!='new'){
          return this.gethotelName
        }else {
          return '新建'
        }

      },
      readOnly(){
        return this.$route.params.id!='new'
      },
      gethotelName(){
        console.log(this.config.name)
        return this.config.name;
      },
      gethotelCode(){
        if(this.gethotelName){
          this.hotelList.forEach(item=>{
            if(item.hotelName==this.gethotelName){
              this.config.hotelCode=item.hotelCode;
            }
          })
        }
        return this.config.hotelCode
      },
      validateHotelConfig(){
        console.log('88888:',(this.strTool.isNotBlank(this.config.liftType)))

        return (this.strTool.isNotBlank(this.config.hotelCode)&&this.strTool.isNotBlank(this.config.name)
          &&this.strTool.isNotBlank(this.config.latestTimeOfDeparture)
          &&this.strTool.isNotBlank(this.config.onlineTimeStr)&&this.strTool.isNotBlank(this.config.outOfServiceStr))
      },
      validateDoor(){
        return (this.strTool.isNotBlank(this.doorObj.doorModel)&&this.strTool.isNotBlank(this.doorObj.normalVol)
          &&this.strTool.isNotBlank(this.doorObj.warningVol)&&this.strTool.isNotBlank(this.doorObj.battery)&&this.strTool.isNotBlank(this.doorObj.checkModel))
      }
    },
    watch:{
      gethotelCode(val){
        console.log('拿到code:',val);
        if(val!=='undefined'&&val!==''){
          this.list.forEach(item=>{
            if(item.hotelCode==val){
              this.config.name=item.hotelName;
              return;
            }
          });
          if(this.$route.params.id=='new'){
            this.getDoorConfigs(val);
            this.getLiftInfos(val);
          };
        }
      }
    },
    methods: {
      ...mapActions([
        'searchHotelList',
        'addNewHotelConfig',
        'modifyHotelConfig',
        'getHotelConfigDetail',
        'delDoorConfig',
        'getLiftInfo',
        'addDoorConfig',
        'modifyDoorConfig',
        'getDoorConfig'
      ]),

      showAddNewDoor(){
        this.showDialog=true;
        this.doorObj={
          doorModel: "",
          battery: "",
          normalVol: "",
          warningVol: "",
          checkModel:'',
          doubleLock:false
        }
      },
      //编辑门锁
      goEdit(index,item){
        console.log(index,item)
        this.showDialog=true;
        this.doorObj=item;
        if(this.doorObj.doubleLock==1){
          this.doorObj.doubleLock=true;
        }else if(this.doorObj.doubleLock==0){
          this.doorObj.doubleLock=false;
        }
      },
      //删除门锁
      goDel(index,item){
        this.$confirm('删除该配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delDoorConfig({
            data:{
              id:item.id
            },
            onsuccess:(body,headers)=>{
              this.getDoorConfigs(this.gethotelCode);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //保存门锁
      saveDoorLock(){
        this.showDialog = false;
        if(this.doorObj.doubleLock){
          this.doorObj.doubleLock=1;
        }else {
          this.doorObj.doubleLock=0;
        }
        if(this.doorObj.id){
          this.modifyDoorConfig({
            data:{
              ...this.doorObj
            },
            onsuccess:(body,headers)=>{
              this.$message.success ('修改成功')
            }
          })
        }else {
          this.addDoorConfig({
            data:{
              ...this.doorObj,
              hotelCode:this.gethotelCode
            },
            onsuccess:(body,headers)=>{
              this.getDoorConfigs(this.gethotelCode);
              this.$message.success('保存成功')
            }
          })

        }
      },
      //获取门锁配置
      getDoorConfigs(val){
        console.log('6666:',val)
        this.getDoorConfig({
          data:{
            hotelCode:val
          },
          onsuccess: (body, headers) => {
            console.log('doorList:',body.data)
            this.doorList=body.data;
            console.log('zhengsijie:',this.doorObj.doubleLock)
          }
        })
      },
      handleClick(){
        if (this.activeTab=='second'&&this.gethotelCode!=='') {
          this.getDoorConfigs(this.gethotelCode);

        }
      },

      //查询酒店
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout (() => {
            this.loading = false;
            this.list = this.hotelList.filter (item => {
              return item.hotelName.toLowerCase ()
                .indexOf (query.toLowerCase ()) > -1;
            });
          }, 200);
        } else {
          this.list = this.hotelList;
        }
      },

      //获取梯控信息
      getLiftInfos(val){
        this.getLiftInfo({
          data:{
            "hotelCode":val
          },
          onsuccess: (body, headers) => {
            this.config.liftList=body.data;
            console.log('LiftInfo:',body.data)
          }
        })
      },
      dateHandle(str){
        console.log(str)
        // return str.split('T')[0]
      },
      //保存或修改
      saveOrModify() {
        let arr = [{
          pointId: '',
          pointName: '',
          liftType: '',
          floors: ''
        }];
        if(this.config.liftList.length>0&&this.config.liftList[0].pointId!==''){
          arr =  this.config.liftList.map (item => {
            let strFloor=[];
            item.floorsList.forEach(i=>{
              if(i.flag){
                strFloor.push(i.floors)
              }
            });
            console.log('strFloor:',strFloor.join(','));
            return {
              pointId: item.pointId,
              pointName: item.pointName,
              liftType: item.liftType,
              floors: strFloor.join(',')
            }
          });
        }

        let param = {
          "hotelCode": this.config.hotelCode,
          "name": this.config.name,
          "status": this.config.status,
          "onlineTime": this.config.onlineTimeStr,
          "outOfService": this.config.onlineTimeStr,
          "latestTimeOfDeparture": this.config.latestTimeOfDeparture,
          "delayOfYourDeparture": this.config.delayOfYourDeparture,
          "temporaryOpeningTime": this.config.temporaryOpeningTime,
          "realNameTakeTheCard": this.config.realNameTakeTheCard ? 1 : 0,
          "liftList": arr
        };
        if (this.config.id!=='') {
          console.log('修改')
          let obj={"id": this.config.id,...param}
          this.modifyHotelConfig ({
            data: {
              'model':JSON.stringify(obj)
            },
            onsuccess: (body, headers) => {
              this.$message.success ('修改成功');
              this.goto(-1)
            }
          })
        }else if(this.config.id==''){
          console.log('新增:',param)
          this.addNewHotelConfig({
            data:{
              'model':JSON.stringify(param)
            },
            onsuccess:(body,headers)=>{
              this.$message.success('新增成功');
              this.goto(-1)
            }
          });
        }
      },

      //删除门锁配置

      //搜索酒店列表
      getHotelLists(){
        this.searchHotelList({
          data:{k:''},
          onsuccess: (body, headers) => {
            this.hotelList=body.data;
            this.list=body.data;
            console.log('hotleList:',body.data)
          }
        })
      },
      //获取酒店详情
      getHotelConfigDetails(id){
        this.getHotelConfigDetail({
          data:{
            "id": id
          },
          onsuccess: (body, headers) => {
            this.config=body.data;
            console.log('zsj:',body.data)
          }
        })
      }
    },
    mounted(){
      let id=this.$route.params.id;
      if(id!=='new'){
        console.log('编辑')
        this.getHotelConfigDetails(id);
      }else {
        console.log('新增')
      }
      this.getHotelLists();
    }

  }
</script>
<style lang="less" scoped>
  .ocontainer{
    padding-left: 3rem;
    padding-right: 3rem;
  }
  .configContent{
    .el-header{
      padding: 0;
    }
    /*.el-button{*/
    /*width: 10rem;*/
    /*}*/
    overflow: scroll;
    padding: 1rem;
    height: 95%;
    border: 1px solid #eeeeee;
    .item{
      display: flex;
      flex-flow:row wrap;
      justify-content:flex-start;
      line-height: 3.5rem;
      min-height: 3.5rem;
      .el-icon-remove-outline{
        font-size: 30px;
        color: #ff0000;
      }
      .el-switch{
        margin-top: 1rem;
      }
      .itemWidth{
        display: inline-block;
        width: 20%;
      }
      .doorLock{
        text-align: center;
        display: inline-block;
        width: 15%;
        margin-right: 1rem;
      }
      .title{
        font-size: 14px;
        display: inline-block;
        width: 8rem;
      }
      .title2{
        font-size: 14px;
        display: inline-block;
        width: 6rem;
        margin-left: 2rem;
      }
      .el-radio-group{
        .el-radio{
          margin-left:0;
          width: 100%;
          margin-bottom:1rem;
          &:first-child{
            margin-top: 1.4rem;
          }
        }
      }
    }
  }
  .el-input{

  }

</style>
