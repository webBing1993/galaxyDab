<template>

  <el-container style="background-color:#fff">

    <el-header style="text-align: left; font-size: 12px;height: 30px;margin-bottom:5px; border-bottom: 1px solid #eee;">

      <span style="font-size:17px;font-weight: 600">区域管理</span>
    </el-header>

    <el-main style="background-color: #fff">
      <div class="opagination1">
        <el-button style="float: right"  type="primary" size="small" @click="add1">添加门禁区域</el-button>
        <el-button class="obutton1" type="primary" size="small" @click="add2">添加门禁点</el-button>
        <el-button class="obutton1" type="primary" size="small" @click="add3">添加门禁点镜像</el-button>
        <el-select
          v-model="value9"

          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          @change="tosure"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="(item,i) in options4"
            :key="item.hotelCode"
            :label="item.hotelName"
            :value="item.hotelCode">
          </el-option>
        </el-select>
        <el-dialog :title="dialogName1" :visible.sync="dialogFormVisible1" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="区域名字：">
              <el-input style="width:36%;display: inline-block" placeholder="请输入内容" v-model="regionValue"></el-input>
            </el-form-item>
            <el-form-item label="是否启用："style="display:none">
              <el-switch
                v-model="switchvalue"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="绑定的旅业房间">
              <el-select v-model="bindroom" placeholder="请选择">
                <el-option
                  v-for="item in bindroomList"
                  :key="item.roomCode"
                  :label="item.roomName"
                  :value="item.roomCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" size="small" @click="addRegion(editdialog1)">确定</el-button>
          </el-form>
        </el-dialog>

        <el-dialog :title="dialogName2" :visible.sync="dialogFormVisible2" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="门禁点名字：">
              <el-input style="width:36%;display: inline-block" v-model="pointName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="门禁点类型：">
              <el-select v-model="deviceType" placeholder="请选择" @change="changedevice">
                <el-option
                  v-for="item in doorType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼层：" v-show="floorshow">
              <el-input style="width:36%;display: inline-block" v-model="floor" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="是否启用：" style="display:none">
              <el-switch
                v-model="switchpoint"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="设备sn：" v-show="deviceSn">
              <el-input style="width:36%;display: inline-block"  placeholder="未施工"  v-model="theChangevalue"  v-on:input="changevalue"></el-input>
              <a v-show="theshow">解除绑定</a>
            </el-form-item>
            <el-button type="primary" size="small" @click="addPoint(editdialog2)">确定</el-button>
          </el-form>
        </el-dialog>


        <el-dialog :title="dialogName3" :visible.sync="dialogFormVisible3" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="楼层：">
              <el-input style="width:36%;display: inline-block" placeholder="请输入内容" v-model="addPointImagevalue"></el-input>
            </el-form-item>
            <el-form-item label="要复制门禁点">
              <el-select v-model="value10" placeholder="请选择">
                <el-option
                  v-for="item in findNotImagesByHotelList"
                  :key="item.id"
                  :label="item.pointName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            </el-select>
            <el-button type="primary" size="small" @click="addPointImageClick(editdialog3)">确定</el-button>
          </el-form>
        </el-dialog>

      </div>
      <template>

        <!--<el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
            <!--<el-breadcrumb-item v-for="i in treeHotelName" :to="{name: 'datapanel', query:{hotelCode: thehotelCode} }">{{i.hotelName}}</el-breadcrumb-item>-->
        <!-- <el-breadcrumb-item>{{nametwo}}</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item v-for="i in treeHotelName" :to="{name: 'datapanel', query:{hotelCode: thehotelCode} }">{{i.hotelName}}</el-breadcrumb-item>-->

        <!-- </el-breadcrumb>-->
        <span v-for="(i,j) in treeHotelName" @click="togoback(i,j)" style="cursor: pointer;"><span v-show="j!=0">></span>{{i.hotelName}}</span>
        <div class="parent">
          <div class="child" style="position:relative;cursor: pointer" @click="gotoentranceguardPoint(i)" v-for="(i,j) in entranceguardPointData" @contextmenu="showMenu(j)">

            <span class="bottom"v-show="i.type==1&&!i.image">门禁点</span>
            <span class="bottom"v-show="i.type==0">区域</span>
            <span class="bottom"v-show="i.type==1&&i.image">门禁点镜像</span>
            <span class="center" v-show="i.areaName">{{i.areaName}}</span>
            <span class="center" v-show="i.pointName">{{i.pointName}}</span>
            <vue-context-menu :contextMenuData="contextMenuData"
                              :transferIndex="transferIndex"
                              @savedata="savedata(i)"
                              @newdata="newdata(i)"></vue-context-menu>
          </div>

        </div>
      </template>
    </el-main>
  </el-container>
</template>

<script>
  import VueContextMenu from './vueContextMenu.vue'
  import baseUrl from '../common.js'
  export default {
    components: {
      VueContextMenu,
    },
    data () {
      return {
        bindroom:'',
        deviceSn:false,
        bindroomList:[],
        floorshow:false,
        dialogName1:'',
        dialogName2:'',
        dialogName3:'',
        theChangevalue:'',
        nametwo:'',
        value10:'',
        findImagesByHotelList:null,
        findNotImagesByHotelList:null,
        editdialog1:false,
        editdialog2:false,
        editdialog3:false,
        addPointImagevalue:0,
        parentEntranceGuardAreaId:0,
        pointId:'',
        deviceType:'',
        doorType:[{id:'11',name:'取电开关'},{id:'12',name:'门锁'},{id:'1B',name:'梯控'}],
        treeHotelName:[],
        _treeHotelName:[],
        switchpoint:true,
        pointName:'',
        floor:0,
        tohotelName:'',
        thehotelCode:null,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        loading:false,
        switchvalue:true,
        left:'left',
        regionValue:'',
        theshow:false,
        options4: [],
        a:{
          color:'red',
          left:'100px',
          top:'100px',
          position:'absolute',
        },
        transferIndex: null, // Show the menu that was clicked
        contextMenuData: {
          menuName: 'demo',
          axios: {
            x: null,
            y: null
          },
          menulists: [
            {
              fnHandler: 'savedata',
              icoName: 'fa fa-home fa-fw',
              btnName: '编辑'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '删除'
            }
          ]
        },
        value9: [],
        list: [],
        loading: false,
        entranceguardPointData:[],
        hotelName:'',
        theparentAreaId:null,
        thehotelCode:null

      }
    },
    mounted() {
      this.hotelName=this.$route.query.val
      this.theparentAreaId=this.$route.query.id
      this.thehotelCode=this.$route.query.thehotelCode
      this.nametwo=this.$route.query.name
      // var gethotelCode=function(that){
      var _thehotelquery=this.thehotelCode
      var _theparentAreaId=this.theparentAreaId
      if(!_thehotelquery){
        return;
      }
      var _thehotelName=this.hotelName
      this.treeHotelName.push({'hotelName':_thehotelName,id:_theparentAreaId,thehotelCode:this.thehotelCode},{'hotelName':this.nametwo,id:_theparentAreaId,thehotelCode:this.thehotelCode})
      // console.log(this.treeHotelName)
      // var zongname=_thehotelName+"&"+this.nametwo
      // var zongid=_theparentAreaId+"&"+_theparentAreaId
      // var zongthehotelCode=''+'&'+this.thehotelCode
      // var _treeHotelName=zongname.split('&')

      // console.log(_treeHotelName)
      // this.treeHotelName.push({'hotelName':_thehotelName,id:'',thehotelCode:''},{'hotelName':this.nametwo,id:_theparentAreaId,thehotelCode:this.thehotelCode})

      //根据hotelCode获取列表
      var areasurl=baseUrl.url().areas+'/'+_theparentAreaId
      this.$http.get(areasurl,
        {
          params:{hotelCode:_thehotelquery}
        },
        {
          emulateJSON: true
        },
      ).then((response) => {
        if (response.data.code==0) {

          var _entranceguardPointData=response.data.data
          for(var i=0;i<_entranceguardPointData.length;i++){
            _entranceguardPointData[i]['youjian']=false
          }
          this.entranceguardPointData=_entranceguardPointData

        }
      }, (response) => {
        this.$message.error('请求出错')
      })
      if(sessionStorage.getItem('treeHotelName')){
        this.treeHotelName=JSON.parse(sessionStorage.getItem('treeHotelName'))
      }

    },

    methods:{
      tosure(ew){
        var _list=this.list
        for (var i = 0; i < _list.length; i++) {
          var obj = _list[i];
          for (var x in obj) {
            if (x== 'hotelCode' && obj[x] == ew) {
              this.tohotelName=obj.hotelName
              break;
            }
          }
        }
        // this.tohotelName=this.options4[ew].hotelName
        this.thehotelCode=ew
        var _hotelCode=this.thehotelCode
        this.theparentAreaId=0
        var _theparentAreaId=this.theparentAreaId
        this.$router.push({ name: 'gotoentranceguardPoint', query:{hotelCode: _hotelCode,id:_theparentAreaId}})
        //取到酒店下的所有区域
        var areasurl=baseUrl.url().areas+'/'+0
        this.$http.get(areasurl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            var _entranceguardPointData=response.data.data
            // if(!_entranceguardPointData){
            //   this.entranceguardPointData=response.data.data
            // }
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData
          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      togoback(i,j){
        this.treeHotelName=this.treeHotelName.slice(0,j+1)
        sessionStorage.setItem('treeHotelName', JSON.stringify(this.treeHotelName))
        this.theparentAreaId=i.id
        if(j==0){
          // console.log(this.treeHotelName)
          this.$router.replace({ name: 'datapanel',query:{hotelCode: i.thehotelCode}})
          return
        }
        this.$router.replace({ name: 'gotoentranceguardPoint',query:{id:i.id,thehotelCode:i.thehotelCode,name:i.hotelName}})
        // location.reload()
        // return;
        var areasurl=baseUrl.url().areas+'/'+i.id
        this.$http.get(areasurl,
          {
            params:{hotelCode:i.thehotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {

            var _entranceguardPointData=response.data.data
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData

          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      gotoentranceguardPoint(thedo){
        if(thedo.type==1){
          return;
        }
        // var _tohotelName=this.tohotelName
        var _id=thedo.id
        // var _thehotelCode=this.thehotelCode
        if(!thedo.areaName){
          var _name=thedo.pointName
        }else{
          var _name=thedo.areaName
        }
        this.treeHotelName.push({'hotelName':_name,id:_id,thehotelCode:thedo.hotelCode})
        sessionStorage.setItem('treeHotelName', JSON.stringify(this.treeHotelName))

        var _thehotelquery=thedo.hotelCode
        var _theparentAreaId=thedo.id
        this.theparentAreaId=_theparentAreaId
        // console.log(_hotelCode)
        this.$router.replace({ name: 'gotoentranceguardPoint',query:{id:_id,thehotelCode:_thehotelquery,name:_name}})

        var areasurl=baseUrl.url().areas+'/'+_theparentAreaId
        this.$http.get(areasurl,
          {
            params:{hotelCode:_thehotelquery}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {

            var _entranceguardPointData=response.data.data
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData

          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      changedevice(val){
        if(val=='1B'){
          this.floorshow=true
        }else{
          this.floorshow=false
        }
      },
      changevalue(event){
        if(!this.theChangevalue){
          this.theshow=false
          return
        }
        this.theshow=true
      },
      showMenu (index) {
        this.transferIndex = index // tranfer index to child component
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        this.contextMenuData.axios = {
          x, y
        }
      },
      savedata (e) {
        console.log('click:' + e)
        this.pointId=e.id
        //门禁点
        if(e.type==1){
          this.pointName=e.pointName
          if(e.image){
            //门禁点镜像
            this.dialogName3="编辑门禁点镜像"
            this.editdialog3=true
            this.dialogFormVisible3=true;
            //获取酒店下的所有非门禁点镜像
            var _hotelCode=this.thehotelCode
            var findNotImagesByHotelUrl=baseUrl.url().findNotImagesByHotel
            this.$http.get(findNotImagesByHotelUrl,
              {
                params:{hotelCode:_hotelCode}
              },
              {
                emulateJSON: true
              },
            ).then((response) => {
              if (response.data.code==0) {
                this.findNotImagesByHotelList=response.data.data
                this.loading=false
              }
            }, (response) => {
              this.$message.error('请求出错')
            })
            return;
          }
          //门禁点
          this.dialogName2="编辑门禁点"
          this.editdialog2=true
          this.dialogFormVisible2=true;
          if(!e.bindDeviceSn){
            this.theChangevalue=''
            this.deviceSn=false
          }else{
            this.theChangevalue=e.bindDeviceSn
            this.deviceSn=true
            this.theshow=true
          }
          return;
        }
        //门禁区域
        this.dialogName1="编辑区域"
        this.regionValue=e.areaName
        this.editdialog1=true
        this.dialogFormVisible1=true;
        var _hotelCode=this.thehotelCode
        var getHotelAllRoomsUrl=baseUrl.url().getHotelAllRooms
        this.$http.get(getHotelAllRoomsUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            this.bindroomList=response.data.data
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      newdata (e) {
        var that=this
        var pointId=e.id
        var _hotelCode=this.thehotelCode
        var delpoint=function(that,_params,deletePointurl){
          that.$http.get(deletePointurl,
            {
              params:_params
            },
            {
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              console.log(response.data.data)
              var _data=response.data.data
              if(_data==0){
                that.$message.success(response.data.msg)
                location.reload()
                return
              }
              var _confirmDescribe='存在关联的门禁区域和门禁点，是否强制删除？'
              delfuc(that,1,_confirmDescribe)
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        var delfuc=function(that,f,confirmDescribe){
          that.$confirm(confirmDescribe, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            //删除
            if(e.type==1){
              //门禁点deletePoint
              var deletePointurl=baseUrl.url().deletePoint
              var _params={pointId:pointId,f:f,hotelCode:_hotelCode}
              delpoint(that,_params,deletePointurl)
              return;
            }
            //门禁区域deleteArea
            var deleteAreaurl=baseUrl.url().deleteArea
            var _params={areaId:pointId,f:f,hotelCode:_hotelCode}
            delpoint(that,_params,deleteAreaurl)

          }).catch((res) => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        var confirmDescribe='此操作将删除, 是否继续?'
        delfuc(that,0,confirmDescribe)




      },
      add1(){
        //点击按钮
        this.dialogName1="添加区域"
        this.dialogFormVisible1=true
        //获取房间code
        var _hotelCode=this.thehotelCode
        if(!_hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        var getHotelAllRoomsUrl=baseUrl.url().getHotelAllRooms
        this.$http.get(getHotelAllRoomsUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            this.bindroomList=response.data.data
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      add2(){
        this.dialogName2="添加门禁点"
        this.dialogFormVisible2=true
        var _hotelCode=this.thehotelCode

      },
      add3(){
        this.dialogName3="添加门禁点镜像"
        this.dialogFormVisible3=true
        //获取酒店下的所有非门禁点镜像
        // return;
        var _hotelCode=this.thehotelCode
        if(!_hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        var findNotImagesByHotelUrl=baseUrl.url().findNotImagesByHotel
        this.$http.get(findNotImagesByHotelUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            this.findNotImagesByHotelList=response.data.data
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      addRegion(editdialog1){
        // console.log(editdialog1)
        var hotelCode=this.thehotelCode
        var areaName=this.regionValue
        var status=this.switchvalue
        var _theparentAreaId=this.theparentAreaId
        var _bindRoomCode=this.bindroom
        if(status){
          status=1
        }else{
          status=0
        }
        if(!hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        if(!areaName){
          this.$message.error('请填写门禁区域名字')
          return;
        }
        // if(!_bindRoomCode){
        //   this.$message.error('请选择绑定的旅业房间')
        //   return;
        // }
        var thedata={hotelCode:hotelCode,areaName:areaName,parentAreaId:_theparentAreaId,status:status,bindRoomCode:_bindRoomCode}
        var areaId={areaId:this.pointId}
        var addRegion=function(that,addAreaurl,thedata,areaId){
          that.$http.post(addAreaurl,thedata,
            {
              params:areaId,
              headers: {},
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              that.dialogFormVisible1=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog1){

          //编辑状态
          var updateAreaurl=baseUrl.url().updateArea
          addRegion(this,updateAreaurl,thedata,areaId)
          return;
        }
        var addAreaurl=baseUrl.url().addArea
        addRegion(this,addAreaurl,thedata,areaId)

      },
      addPoint(editdialog2){
        var hotelCode=this.thehotelCode
        var deviceType=this.deviceType
        var status=this.switchpoint
        var pointName=this.pointName
        var floor=this.floor
        var _theparentAreaId=this.theparentAreaId
        if(status){
          status=1
        }else{
          status=0
        }
        // console.log(hotelCode)
        if(!hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        if(!pointName){
          this.$message.error('请填写门禁点名称')
          return;
        }
        // if(!floor){
        //   this.$message.error('请填写楼层')
        //   return;
        // }
        if(!deviceType){
          this.$message.error('请填写设备类型')
          return;
        }
        var _data={hotelCode:hotelCode,parentEntranceGuardAreaId:_theparentAreaId,deviceType:deviceType,status:status,pointName:pointName,floor:floor}

        var theaddPoint=function(that,_data,addPointurl,pointId){
          that.$http.post(addPointurl,_data,
            {
              params:pointId,
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              that.dialogFormVisible2=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog2){
          //编辑状态updatePoint
          var pointId={pointId:this.pointId}
          var updatePointurl=baseUrl.url().updatePoint
          theaddPoint(this,_data,updatePointurl,pointId)
          return;
        }
        var pointId={pointId:this.pointId}
        var addPointurl=baseUrl.url().addPoint
        theaddPoint(this,_data,addPointurl,pointId)

      },
      addPointImageClick(editdialog3){
        // return;
        var pointId=this.value10
        var floor=this.addPointImagevalue
        var parentEntranceGuardAreaId=this.parentEntranceGuardAreaId
        var _theparentAreaId=this.theparentAreaId
        // if(!floor){
        //   this.$message.error('请填写楼层')
        //   return;
        // }
        var reg=/^[0-9]*$/
        if(!reg.test(floor)){
          alert('请输入数字')
          return
        }
        var theId={id:this.pointId}
        var add= function(addPointImageurl,pointId,floor,parentEntranceGuardAreaId,that,theId){
          // console.log(addPointImageurl)
          that.$http.post(addPointImageurl,
            {
              pointId:pointId,
              floor:floor,
              parentEntranceGuardAreaId:_theparentAreaId
            },
            {
              params:theId,
              headers: {},
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              that.dialogFormVisible3=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog3){
          //编辑门禁镜像
          var updatePointImageurl=baseUrl.url().updatePointImage
          add(updatePointImageurl,pointId,floor,parentEntranceGuardAreaId,this,theId)
          return;
        }
        //添加门禁镜像
        var addPointImageurl=baseUrl.url().addPointImage
        // console.log(addPointImageurl)
        add(addPointImageurl,pointId,floor,parentEntranceGuardAreaId,this,theId)
      },
      // gotoentranceguardPoint(thedo){
      //   var _tohotelName=this.tohotelName
      //   var _id=thedo.id
      //   var _thehotelCode=this.thehotelCode
      //   this.$router.push({ name: 'gotoentranceguardPoint',params:{val: _tohotelName,id:_id,thehotelCode:_thehotelCode}})
      // },

      show1(event,j){
        this.entranceguardPointData[j].youjian=true
        this.a.left=event.offsetX+'px'
        this.a.top=event.offsetY+'px'
        // console.log(event)
      },
      remoteMethod(query) {
        if (query !== '') {
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.hotelName.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
          this.loading = true;
        } else {
          this.options4 = [];
        }
      },
    }
  }
</script>

<style>
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .bg-purple-dark {

    border:1px solid #99a9bf
  }
  .bg-purple {

    border:1px solid #99a9bf
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .parent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }

  .child {
    box-sizing: border-box;
    margin:10px;
    background-color: white;
    flex: 0 0 10%;
    height: 100px;
    border: 1px solid #99a9bf;
    border-radius: 4px;
    font-size:12px;

    position: relative;
  }
  .center{
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }
  .bottom{
    display: inline-block;
    position: absolute;
    width: 95%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    left: -10px;
    right: 0px;
    top: 70px;
  }
</style>
