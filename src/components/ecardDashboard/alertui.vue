<template>
  <!-- <app :app='dialogFormVisible'> -->
  <div style="height: 300px;width: 100%;min-width:587px;overflow:auto">
    <div style="float:right;height: 40px">

      <el-button style="" type="primary" size="small" @click='shaixuan'>筛选</el-button>
    </div>
    <div style="clear: both;margin-top:15px;" v-for='(i,j) in addone'>
      <el-select v-model="i.field" placeholder="请选择" @change="select(i.field,j)" style="width:25%">
        <el-option
          v-for="item in i.options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="i.condition" placeholder="请选择" style="width:25%">
        <el-option
          v-for="item in i.options3"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="i.data" style="width:36%;display: inline-block" placeholder="请输入内容"></el-input>
      <a size="small" @click="del(j)" style="cursor:pointer;color: #16D032;display:inline-block;margin-left:5%">删除</a>
    </div>
    <!-- </el-form> -->
    <span style="display: inline-block;margin-top: 15px;cursor:pointer;color: #16D032;" @click="toadd"><i class="el-icon-plus" style="color: #42b983;"></i>新增</span>

  </div>
  <!-- </app> -->
</template>
<script>
  import notOnlineUrl from '../../common.js'
  export default {
    props:['notOnline'],
    data () {
      return {
        formLabelWidth: false,
        page: 1,
        tableData3:[],
        total:1,
        num: 10,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        addone:[{
          condition: '',
          field: '',
          data: '',
          options1:[{
            value: 'device_mac',
            label: '蓝牙名字',
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
            value: 'device_product_sequence_number',
            label: '生产序列号',
            options2: [{
              value: 'Congruent',
              label: '全等'
            },{
              value: 'Contain',
              label: '包含'
            }]
          }]
        }],

        value: '',
        value1: '',
        input: '',
      }
    },
    methods: {
      toadd: function () {
        // this.add.push({ 'condition': '', 'field': '', 'data': '' })
        var toadd=this.addone
        var result = JSON.parse(JSON.stringify(toadd[toadd.length-1]))
        console.log(this.addone)
        this.addone.push({
          condition: '',
          field: '',
          data: '',
          options1:[{
            value: 'device_mac',
            label: '蓝牙名字',
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
            }],
            options3:[]
          }]
        })
      },
      del: function (n) {
        if(n<1){
          return;
        }
        this.addone.splice(n, 1)
      },
      select(res,tt){
        for (var j = 0; j < this.addone[tt].options1.length; j++) {
          if(res===this.addone[tt].options1[j].value){
            this.addone[tt].options3=this.addone[tt].options1[j].options2
            return;
          }
        }

      },
      shaixuan: function () {
        let notOnlineUrlone=this.notOnline
        this.tableData3=this.tableData3.splice(0,0)
        let page=this.page
        let num=this.num
        var _add=[]
        var _addone=this.addone
        for(var i in _addone){
          _add.push({ 'condition': _addone[i].condition, 'field': _addone[i].field, 'data': _addone[i].data })
        }
        let add=JSON.stringify(_add)
        this.$http.post(notOnlineUrlone,
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
            let data=response.data.data
            let list=data.list
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData3=list
            this.$emit('ievent',this.tableData3,this.total,1,nums,add);
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
      }
    }
  }
</script>
<style>

</style>
