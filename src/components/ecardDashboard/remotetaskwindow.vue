<template>
  <!-- <app :app='dialogFormVisible'> -->
  <div class="remotetask_window">
    <div class="remotetask_window_odiv1">

      <el-button style="" type="primary" size="small" @click='shaixuan'>筛选</el-button>
    </div>
    <div class="remotetask_window_odiv1_select" v-for='(i,j) in add'>
      <el-select v-model="i.field" placeholder="请选择" style="width:25%">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="i.condition" placeholder="请选择" style="width:25%">
        <el-option
          v-for="item in selection"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="i.data" class="elinput_style" placeholder="请输入内容"></el-input>
      <a size="small" @click="del(i)" class="select_del">删除</a>
    </div>
    <!-- </el-form> -->
    <span class="remotetask_span" @click="toadd"><i class="el-icon-plus" style="color: #42b983;"></i>新增</span>

  </div>
  <!-- </app> -->
</template>
<script>
  import notOnlineUrl from '../../common.js'
  export default {
    props:['remoteTask'],
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
        options1: [{
          value: 'plan_title',
          label: '任务名称',
          options2: [{
            value: 'Congruent',
            label: '全等'
          },{
            value: 'Contain',
            label: '包含'
          }]
        }],
        value: '',
        value1: '',
        input: '',
        add: [{'condition': '', 'field': '', 'data': '' }]
      }
    },
    methods: {
      toadd: function () {
        this.add.push([{'condition': '', 'field': '', 'data': '' }])
      },
      del: function (n) {
        this.add.splice(n, 1)
      },
      shaixuan: function () {
        let remoteTaskUrlone=this.remoteTask
        this.tableData3=this.tableData3.splice(0,0)
        let page=this.page
        let num=this.num
        let add=JSON.stringify(this.add)
        this.$http.post(remoteTaskUrlone,
          {
            s: add
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          console.log(response.data.data)
          if (response.data.code==0) {
            this.loading=false
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num

            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData3=list
            console.log(data)
            this.$emit('ievent',this.tableData3,this.total,1,nums,add)
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
  .remotetask_window{
    height: 300px;
    width: 100%;
    min-width:587px;
    overflow:auto
  }
  .remotetask_window_odiv1{
    float:right;
    height: 40px
  }
  .remotetask_window_odiv1_select{
    clear: both;
    margin-top:15px;
  }
  .remotetask_span{
    display: inline-block;
    margin-top: 15px;
    cursor:pointer;
    color: #16D032;
  }
  .select_del{
    cursor:pointer;
    color: #16D032;
    display:inline-block;
    margin-left:5%
  }
  .elinput_style{
    width:36%;
    display: inline-block
  }
</style>
