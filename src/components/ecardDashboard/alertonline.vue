<template>
  <!-- <app :app='dialogFormVisible'> -->
  <div style="height: 300px;width: 715px;overflow:auto">
    <div style="float:right;height: 40px">

      <el-button style="" type="primary" size="small" @click='shaixuan'>筛选</el-button>
    </div>
    <div style="clear: both;margin-top:15px;" v-for='(i,j) in add'>
      <el-select v-model="i.field" placeholder="请选择" style="width:150px">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="i.condition" placeholder="请选择" style="width:120px">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="i.data" style="width:260px;display: inline-block" placeholder="请输入内容"></el-input>
      <el-button style="" type="primary" style="float:right" size="small" @click="del(i)">删除</el-button>
    </div>
    <!-- </el-form> -->
    <span style="display: inline-block;margin-top: 15px;" @click="toadd"><i class="el-icon-plus"></i>新增</span>

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
        num: 5,
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
        options1: [{
          value: 'device_mac',
          label: '蓝牙名字'
        },{
          value: 'hardware_version',
          label: '硬件版本'
        },{
          value: 'device_electricity',
          label: '生产序列号'
        },{
          value: 'device_product_sequence_number',
          label: '设备电量'
        }
        ],
        options2: [{
          value: 'Congruent',
          label: '全等'
        },{
          value: 'Contain',
          label: '包含'
        },{
          value: 'less',
          label: '小于'
        },{
          value: 'equal',
          label: '等于'
        },{
          value: 'greater',
          label: '大于'
        }
        ],
        value: '',
        value1: '',
        input: '',
        add: [{ 'condition': '', 'field': '', 'data': '' }]
      }
    },
    methods: {
      toadd: function () {
        this.add.push({ 'condition': '', 'field': '', 'data': '' })
      },
      del: function (n) {
        this.add.splice(n, 1)
      },
      shaixuan: function () {
        let notOnlineUrlone=this.notOnline
        this.tableData3=this.tableData3.splice(0,0)
        let page=this.page
        let num=this.num
        let add=JSON.stringify(this.add)
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
            let data=response.data.data;
            let list=data.list
            list=list.splice(0,num)
            let listlength=list.length
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total=Math.ceil(nums/num)*num
            }
            for (let i=0; i<listlength; i++) {
              this.tableData3.push(list[i])
            }
          }
        }, (response) => {

        })
        this.$emit('ievent',this.tableData3);
      }
    },
    mounted: function () {

    }
  }
</script>
<style>

</style>
