<!--空间和设备点配置-->
<template>
  <el-container class="ocontainer" style="background-color:#fff">
    <el-header class="oheader" style="height: 4rem;">
      <span class="oheader_span">空间和设备点配置</span>
    </el-header>
    <div class="zoneDeviceContent">
      <div class="top">
        <el-select
          v-model="getHotelCode"
          filterable
          remote
          reserve-keyword
          placeholder="请输入空间名称"
          :remote-method="remoteMethod"
          :loading="loading" @change="getZoneName">
          <el-option
            v-for="item in zoneList"
            :key="item.hotelCode"
            :label="item.name"
            :value="item.hotelCode" >
          </el-option>
        </el-select>
      </div>
      <div class="bot_content" >
        <div class="left" v-show="hotelName">
          <h2>{{hotelName}}
            <el-button
              type="success" plain
              size="mini"
              @click.stop="() => _appendFirst()" >
              添加
            </el-button>
          </h2>
          <!------------------------树形结构----------------------------->
          <el-tree :data="treeData.childrenList" :props="defaultProps"
                   :expand-on-click-node="false"
                   @node-click="handleNodeClick" :default-expand-all="true">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                   <i v-show="data.nodeType==0" class="zoneIcon"></i>
                   <i v-show="data.nodeType==1" class="deviceIcon"></i>
                   <el-button
                     type="danger" plain
                     size="mini"
                     @click.stop="() => remove(node, data)" v-show="data.nodeType==1||(data.nodeType==0&&data.childrenList.length==0)">
                    删除
                  </el-button>
                  <el-button
                    type="success" plain
                    size="mini"
                    @click.stop="() => append(data)" v-show="data.nodeType==0">
                    添加
                  </el-button>
                </span>
              </span>
          </el-tree>
        </div>
        <!--------------------节点属性------------------------>
        <div class="right">
          <h2>节点属性</h2>
          <div class="item" v-show="showNodeHandle">
            <div class="itemLeft">
              <span class="_title">节点类型</span>
              <span class="_title">节点名称</span>
              <span class="_title" v-show="activeName=='first'">空间类型</span>
              <span class="_title" v-show="activeName=='second'">设备点类型</span>
              <span class="_title" v-show="activeName=='first'&&zoneObj.areaType==2">楼栋号</span>
              <span class="_title" v-show="activeName=='first'&&zoneObj.areaType==3">楼层号</span>
              <span class="_title" v-show="activeName=='first'&&zoneObj.areaType==4">绑定酒店房间</span>
              <span class="_title" v-show="activeName=='second'&&devicePointObj.deviceType=='12'" >门锁型号</span>
              <span class="_title" v-show="activeName=='second'">可控范围</span>
            </div>
            <div class="itemRight">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <!-------------------空间区域tab---------------------------->


                <el-tab-pane label="空间区域" name="first" :disabled="disableTab">
                  <div>
                    <div class="itemCotnt" style="width:50%">
                      <el-input v-model="zoneObj.areaName" placeholder="请输入内容"></el-input>
                    </div>
                    <!--空间类型-->
                    <div class="itemCotnt">
                      <el-radio-group v-model="zoneObj.areaType" :disabled="flag">
                        <el-radio :label="1">区域</el-radio>
                        <el-radio :label="2">楼栋</el-radio>
                        <el-radio :label="3">楼层</el-radio>
                        <el-radio :label="4">房间</el-radio>
                        <el-radio :label="5">通道</el-radio>
                      </el-radio-group>
                    </div>
                    <!--楼层-->
                    <div class="itemCotnt" style="width:30%" v-show="zoneObj.areaType==3">
                      <el-input v-model="zoneObj.areaNum" placeholder="请输入楼层"></el-input>
                    </div>

                    <!--楼栋-->
                    <div class="itemCotnt" style="width:30%" v-show="zoneObj.areaType==2">
                      <el-input v-model="zoneObj.areaNum" placeholder="请输入楼栋"></el-input>
                    </div>
                    <!--房间-->
                    <div class="itemCotnt" v-show="zoneObj.areaType==4">
                      <el-select
                        v-model="zoneObj.bindRoomName"
                        placeholder="请选择酒店房间"
                        :disabled="flag"
                        filterable
                        :remote-method="filterRoom"
                        remote
                      >
                        <el-option
                          v-for="item in lvyeRoomLists"
                          :key="item.roomName"
                          :label="item.roomName"
                          :value="item.roomName">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div>
                  </div>
                  <el-row style="margin-top: 5rem">
                    <el-button type="success" @click="saveZone" :disabled="!validateZone">保存</el-button>
                    <el-button type="info" @click="reset();showNodeHandle=false">取消</el-button>
                  </el-row>
                </el-tab-pane>

                <!-------------------设备点tab-------------------------->


                <el-tab-pane label="设备点" name="second" >
                  <div class="itemCotnt" style="width:50%">
                    <el-input v-model="devicePointObj.pointName" placeholder="请输入内容"></el-input>
                  </div>
                  <!--设备点类型-->
                  <div class="itemCotnt">
                    <el-radio-group v-model="devicePointObj.deviceType" :disabled="flag">
                      <el-radio label="16">门禁</el-radio>
                      <el-radio label="12">门锁</el-radio>
                      <el-radio label="1B">梯控</el-radio>
                      <el-radio label="11">取电开关</el-radio>
                    </el-radio-group>
                  </div>
                  <!--门锁-->
                  <div class="itemCotnt" v-show="devicePointObj.deviceType=='12'">
                    <el-select v-model="devicePointObj.doorModel"
                               filterable
                               remote
                               :remote-method="remoteDoorLock"
                               :loading="loading"
                               placeholder="请选择门锁" :disabled="flag">
                      <el-option
                        v-for="item in doorList"
                        :key="item.doorId"
                        :label="item.doorModel"
                        :value="item.doorModel" >
                      </el-option>
                    </el-select>
                  </div>

                  <!--可控范围-->
                  <div class="itemCotnt deviceRange">
                    <el-radio-group v-model="devicePointObj.pointRole" :disabled="flag">
                      <el-radio :label=1>宾客卡（住客卡，访客卡，临时卡）</el-radio>
                      <el-radio :label=2>员工卡</el-radio>
                      <el-radio :label=3>所有员工公用</el-radio>
                      <el-radio :label=4>所有宾客公用</el-radio>
                      <el-radio :label=5>全部卡公用</el-radio>
                    </el-radio-group>
                  </div>
                  <el-row style="margin-top: 5rem">
                    <el-button type="success" @click="saveDevicePoint" :disabled="!validateDevice">保存</el-button>
                    <el-button type="info">取消</el-button>
                  </el-row>
                </el-tab-pane>
              </el-tabs>

            </div>
          </div>
        </div>

      </div>
    </div>
  </el-container>

</template>
<script>
  import rolelistUrl from '../../common.js'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        _getParentAreaId:'',
        zoneName:'',
        showNodeHandle:false,
        disableTab:false,
        zoneObj:{
          hotelCode:"",
          areaRole:"",
          areaType:0,
          areaNum:"",
          areaName:"",
          parentAreaId:'',
          bindRoomCode:"",
          bindRoomName:''
        },
        devicePointObj:{
          "hotelCode":"",
          "parentEntranceGuardAreaId":"",
          "pointRole":"",
          "areaRole": "",
          "pointName":"",
          "floor":"",
          "doorId":"",
          "doorModel":"",
          "deviceType":""
        },
        input:'',
        getHotelCode: '',
        list: [],
        zoneList: [],
        loading: false,
        activeName: 'first',
        restaurants: [],
        state4: '',
        timeout: null,
        defaultProps: {
          children: 'childrenList',
          label: 'areaName'
        },
        treeData: {
          "id": 0,
          "areaId": 0,
          "pointId": 0,
          "onlyType": null,
          "nodeType": 0,
          "hotelCode": null,
          "areaName": null,
          "parentAreaId": 0,
          "pointName": null,
          "deviceType": null,
          "bindDeviceSn": null,
          "parentEntranceGuardAreaId": '',
          "childrenList": [
          ]
        },

        buttonProps: {
          type: 'default',
          size: 'small',
        },
        radio2: 3,
        lvyeRoomList: [{
          "hotelName": "",
          "hotelCode": "",
          "roomName": ""
        }],
        lvyeRoomLists:[
          {
            "hotelName": "",
            "hotelCode": "",
            "roomName": ""
          }
        ],
        doorList:[],
        _doorList:[],
        flag:false
      }
    },
    filters:{
      filterName(val){

      }
    },

    computed: {
      validateZone(){
        let simpleFlag=false;
        let commonFlag=this.strTool.isNotBlank(this.zoneObj.areaName)&&this.strTool.isNotBlank(this.zoneObj.areaType);
        switch (this.zoneObj.areaType)
        {
          case 1:
            simpleFlag=true;
            break;
          case 5:
            simpleFlag=true;
            break;
          case 2:
            simpleFlag=this.strTool.isNotBlank(this.zoneObj.areaNum);
            break;
          case 3:
            simpleFlag=this.strTool.isNotBlank(this.zoneObj.areaNum);
            break;
          case 4:
            simpleFlag=this.strTool.isNotBlank(this.zoneObj.bindRoomName);
            break;
        }
        return commonFlag&&simpleFlag;
      },
      validateDevice(){
        return (this.strTool.isNotBlank(this.devicePointObj.pointName)&&this.strTool.isNotBlank(this.devicePointObj.deviceType)&&this.strTool.isNotBlank(this.devicePointObj.pointRole))
      },
      roomCode(){
        this.bindRoomCode.forEach(item=>{
          if(item.roomName=this.zoneObj.bindRoomName){
            this.zoneObj.bindRoomCode=item.roomCode;
            return;
          }

        })
      },
      hotelName(){
        let _name=''
        if(this.getHotelCode){
          this.zoneList.forEach(item => {
            if(item.hotelCode==this.getHotelCode){
              console.log(item.name)
              _name=item.name;
              return;
            }
          });
          return _name;
        }
      }
    },

    watch:{
      disableTab(val){
        if(val){
          this.activeName='second'
        }
      },
      getHotelCode(val){
        console.log(8888888)
      }
    },

    methods: {
      ...mapActions ([
        'getHotelTreeList',
        'getZoneList',
        'zoneDetail',
        'updateZone',
        'delZone',
        'addDevicePoint',
        'devicePointDetail',
        'updateDevicePoint',
        'delDevicePoint',
        'lvyeRoomNo',
        'addZone',
        'getDoorLockOption',
        'getLvyeRoomNo'
      ]),
      handleNodeClick(data,node,comp){
        console.log('data:',data)
        console.log('node:',node)
        console.log('comp:',comp)
        this._getParentAreaId=data.areaId;
        if(data.nodeType==0){
          this.getZoneDetails(data.areaId)
        }else if(data.nodeType==1){
          this.getDeviceDetails(data.pointId)
        }
      },
      //获取空间名查找树和旅业房间
      getZoneName (code) {
        console.log ('code:', code);
        this.getHotelTreeLists (code);
        this.getLvyeRoomNo({
          data:{
            "hotelCode": code.toString()
          },
          onsuccess: (body, headers) => {
            this.lvyeRoomList=body.data;
            this.lvyeRoomLists=this.lvyeRoomList;
            this.flag=false;
          }
        });
        this.getDoorlists(code);
      },
      //搜索房间号列表列表
      filterRoom(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout (() => {
            this.loading = false;
            this.lvyeRoomLists = this.lvyeRoomList.filter (item => {
              return item.roomName.toLowerCase().indexOf (query.toLowerCase ()) > -1;
            });
          }, 200);
        } else if (query == ''){
          this.lvyeRoomLists = this.lvyeRoomList;
        }
      },
      //获取树结构
      getHotelTreeLists (code) {
        this.getHotelTreeList ({
          data: {
            "hotelCode": code.toString()
          },
          onsuccess: (body, headers) => {
            console.log('tree:',body.data)

            this.treeData = body.data;
            // if(this.treeData.childrenList.length==0){
            //     this.showNodeHandle=true;
            // }else {
            //     this.showNodeHandle=false;
            // }
            this.showNodeHandle=false;

          }
        })
      },
      //点击节点处理
      handleClick () {
      },

      //搜索空间区域列表
      remoteDoorLock(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout (() => {
            this.doorList = this._doorList.filter (item => {
              return item.doorModel.toLowerCase ()
                .indexOf (query.toLowerCase ()) > -1;
            });
            this.loading = false;
          }, 200);
        } else {
          this.doorList = this._doorList;
        }
      },
      //门锁列表
      getDoorlists(code){
        this.getDoorLockOption ({
          data: {
            "name": '',
            hotelCode:code
          },
          onsuccess: (body, headers) => {
            this._doorList = body.data;
            this.doorList = this._doorList;
          }
        })
      },
      //空间区域详情
      getZoneDetails(id){
        this.zoneDetail({
          data:{
            areaId:id
          },
          onsuccess: (body, headers) => {
            this.zoneObj=body.data;
            console.log('this.zoneObj:',this.zoneObj)
            this.showNodeHandle=true;
            this.disableTab=false;
            this.activeName='first';
            this.flag=true;
          }
        })
      },
      //设备点点属性详情
      getDeviceDetails(id){
        this.devicePointDetail({
          data:{
            pointId:id
          },
          onsuccess: (body, headers) => {
            this.devicePointObj=body.data;
            this.showNodeHandle=true;
            this.disableTab=true;
            this.flag=true;
          }
        })
      },

      //添加
      append (data) {
        this.showNodeHandle=true;
        console.log('nodaData:',data)
        this.reset();
        console.log('777777:',data.areaId)
        console.log('888888:',this._getParentAreaId)
        this._getParentAreaId=data.areaId;
      },
      _appendFirst(){
        this.showNodeHandle=true;
        this.reset()
      },
      //reset
      reset(){
        this.flag=false;
        this._getParentAreaId='';
        this.zoneObj={
          areaRole:'',
          areaId:'',
          areaName: "",
          areaType: 0,
          areaNum:"",
          hotelCode: "",
          bindRoomCode:"",
          bindRoomName:'',
          parentAreaId:""
        };

        this.devicePointObj={
          "id":'',
          "hotelCode":"'",
          "areaRole":"",
          "areaType":"",
          "areaNum":"",
          "areaName":"",
          "parentAreaId":"",
          "bindRoomCode":"",
          'parentEntranceGuardAreaId':''
        };
      },
      //添加／修改空间区域
      saveZone(){
        this.zoneObj.hotelCode=this.getHotelCode;
        this.lvyeRoomLists.forEach(item=>{
          if(item.roomName==this.zoneObj.bindRoomName){
            this.zoneObj.bindRoomCode=item.roomCode;
            return
          }
        });
        if(this.zoneObj.id){
          this.updateZone({
            data:{
              "model":JSON.stringify(this.zoneObj)
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.$message({
                type: 'success',
                message: '修改空间区域成功!'
              });
            }
          })
        }else {
          this.zoneObj.parentAreaId=this._getParentAreaId;
          console.log('this.zoneObj.parentAreaId:',this.zoneObj.parentAreaId)
          this.addZone({
            data:{
              "model":JSON.stringify(this.zoneObj)
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.$message({
                type: 'success',
                message: '添加空间区域成功!'
              });
            }
          })
        }
      },
      //添加／修改设备点
      saveDevicePoint(){
        this.devicePointObj.areaRole=this.devicePointObj.pointRole;
        if(this.devicePointObj.doorModel){
          this.doorList.forEach(item=>{
            if(item.doorModel==this.devicePointObj.doorModel){
              this.devicePointObj.doorId=item.doorId;
              return;
            }
            return;
          })
        };
        if(this.devicePointObj.id){
          this.updateDevicePoint({
            data:{
              "model":JSON.stringify(this.devicePointObj)
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.$message({
                type: 'success',
                message: '修改设备点成功!'
              });
            }
          })
        }else {
          this.devicePointObj.hotelCode=this.getHotelCode;
          this.devicePointObj.parentEntranceGuardAreaId=this._getParentAreaId
          console.log(this.devicePointObj.parentEntranceGuardAreaId,'555555555',this.devicePointObj.parentEntranceGuardAreaId)
          this.addDevicePoint({
            data:{
              "model":JSON.stringify(this.devicePointObj)
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.$message({
                type: 'success',
                message: '添加设备点成功!'
              });
            }
          })
        }
      },
      //删除节点
      remove (node, data) {
        this.$confirm('确认删除该节点', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(data.nodeType==0){
            this.delNode(data.nodeType,data.areaId)
          }else if(data.nodeType==1){
            this.delNode(data.nodeType,data.pointId)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除节点属性／节点属性
      delNode(nodeType,id){
        if(nodeType==0){
          this.delZone({
            data:{
              areaId:id
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.getList();
              this.reset();
              this.$message({
                type: 'success',
                message: '删除空间区域成功!'
              });
            }
          })
        }else if(nodeType==1){
          this.delDevicePoint({
            data:{
              pointId:id
            },
            onsuccess: (body, headers) => {
              this.getZoneName(this.getHotelCode);
              this.reset();
              this.$message({
                type: 'success',
                message: '删除设备成功!'
              });
            }
          })
        }
      },
      //搜索空间区域列表
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true;
          setTimeout (() => {
            this.loading = false;
            this.zoneList = this.list.filter (item => {
              return item.name.toLowerCase ()
                .indexOf (query.toLowerCase ()) > -1;
            });
          }, 200);
        } else {
          this.zoneList = this.list;
        }
      },
      getList(){
        this.getZoneList ({
          data: {
            "name": ''
          },
          onsuccess: (body, headers) => {
            this.reset();
            this.list = body.data;
            this.zoneList = this.list;
          }
        })
      }
    },
    mounted () {
      this.getList();
    }


  }
</script>
<style lang="less" scoped>
  .ocontainer {
    padding-left: 3rem;
    padding-right: 3rem;
    .el-input {

    }
    .zoneDeviceContent {
      width: 100%;
      height: 90%;
      border: 1px solid #eeeeee;
      .top {
        padding: 0 1rem;
        height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #eeeeee;
        .el-input {
          display: inline-block;
          width: 167%;
        }
      }
      .bot_content {
        height: 90%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        h2 {
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .left {
          display: block;
          padding: 1rem 2rem;
          height: 100%;
          width: 45%;
          border-right: 1px solid #eeeeee;
          overflow-x: scroll;
          .el-button{
            float: right;
          }

          .el-tree {
            display: block;
            overflow-x: scroll;
            .el-tree-node {
              .el-tree-node__content {
                .custom-tree-node {
                  width: 100%;
                  /*display: flex;*/
                  /*flex: 1;*/
                  /*align-items: center;*/
                  /*justify-content: space-between;*/
                  font-size: 14px;
                  /*&:before{*/
                  /*content: "\E60E"*/
                  /*}*/
                  span:first-child{
                    margin-left: 5px;
                  }
                  .el-button {
                    text-align: center;
                    height: 1.5rem;
                    float: right;
                    margin-left: 0.5rem;
                  }
                  .el-button--mini, .el-button--mini.is-round {
                    padding: 5px 5px 5px 3px;
                  }
                }
              }

            }
          }
        }
        .right {
          padding: 1rem 1rem;
          height: 100%;
          width: 50%;
          overflow: scroll;
          .item {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            .itemLeft {
              width: 8rem;
              ._title {
                display: inline-block;
                width: 100%;
                height: 3.5rem;
                line-height: 3.5rem;
                font-size: 14px;
              }
            }
            .itemRight {
              width: 90%;
              .itemCotnt {
                /*height: 3.5rem;*/
                line-height: 3.5rem;
                &.deviceRange {
                  .el-radio-group {
                    .el-radio {
                      margin-left: 0;
                      width: 100%;
                      margin-top: 1rem;
                      &:first-child {
                        margin-top: 1.4rem;
                      }
                    }

                  }

                }
              }
              .el-button {
                width: 10rem;
              }

            }
            .itemTitle {
              display: inline-block;
              width: 5rem;
            }
          }
        }
      }
    }
    .zoneIcon{
      float: left;
      display:inline-block;
      width:13px;
      height:13px;
      border: 1px solid #606060 ;
      margin-top: 5px
    }
    .deviceIcon{
      float:left;
      display:inline-block;
      width:12px;
      height:12px;
      border: 1px solid #606060 ;
      border-radius:100%;
      margin-top: 5px
    }
  }
</style>
