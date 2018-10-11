<!--集团信息，第四级包裹-->
<template >
  <div class="rightInfo">
    <div class="topTitle">
      <h4>权限信息</h4>
    </div>
    <div class="centerContent">
      <div class="item">
        <span class="right">名称：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span class="right">TAG：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span class="right">图标地址：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span class="right">链接地址：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span class="right">请求方式：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="right">权限描述：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span class="right">权限类型：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 3rem;text-align: center">
        <el-row>
          <el-button type="success">保存</el-button>
          <el-button type="danger">删除</el-button>
        </el-row>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    name: 'groupInfo',
    data () {
      return {
        input:'',
        showAddNew:false,
        filterText:'',
        dialogVisible:false,
        options: [{
          value: 'group',
          label: '子公司'
        }, {
          value: 'hotel',
          label: '分组'
        }],
      }
    },
    methods:{
      handleClick(){

      },
      handleSelectionChange(){

      },
      handleClose(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  /*.third_wrap .rightWrap .rightInfo .centerContent .item{*/
  /*width: 100%;*/
  /*}*/
  /*.third_wrap .rightWrap .rightInfo .centerContent .item .el-input{*/
  /*width:30%;*/
  /*margin-right: 2rem;*/

  /*}*/


</style>
