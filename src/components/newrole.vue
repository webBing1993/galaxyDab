<template id="aaa">
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px;">
        <el-breadcrumb-item :to="{ path: '/device/role' }">角色列表</el-breadcrumb-item>
        <el-breadcrumb-item>新建角色</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form" :model="form" label-width="100px" label-position="left">
        <el-form-item label="角色名">
          <el-input size='small' class="ocontainer_item_input" v-model="form.groupName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input type="textarea" class="ocontainer_item_input"  autosize placeholder="请输入内容" v-model="form.groupDescribe"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select size='small' v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <span class="choose_style">选择权限</span>
        <div>
          <template v-for='(ii,jj) in group'>
            <el-checkbox-group v-model="checkList"  @change="handleChecked" class="checkbox_group_style">
              <el-checkbox v-for="(i,j) in ii" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
            </el-checkbox-group>
          </template>

        </div>
      </el-form>
      <el-button type="primary" size='small' class="el_button_style" @click='add'>立即创建</el-button>

    </el-main>
  </el-container>
</template>

<script>
  import addroleurl from '../common.js'
  export default {
    data () {
      return {
        tableData: [],
        input21: '',
        form: {
          groupName: '',
          groupDescribe: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [{
          value: '0',
          label: '启用'
        },
          {
            value: '1',
            label: '禁用'
          }
        ],
        value:'0',
        num1: 1,
        checkList: [],
        checkList2: [],
        group:[],
        checkList1: []
      }
    },
    methods: {
      handleChecked (value) {
        this.checkList1=value
        console.log(this.checkList1)
      },
      add: function () {
        let groupName=this.form.groupName
        let groupDescribe=this.form.groupDescribe
        let status=this.value*1
        let checkList1=this.checkList1
        let addrole=addroleurl.url().addrole
        let powerList=checkList1.join(',')
        if (groupName&&groupDescribe&&(status==0||status==1)&&powerList) {
          this.$http.post(addrole,
            {
              groupName: groupName,
              groupDescribe: groupDescribe,
              status: status,
              devList: '23',
              powerList:powerList ,
            },
            {
              headers:{},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.$message.success(response.data.msg)
              this.$router.push({ path: '/device/role' })
            }else{
              this.$message.error(response.data.msg)
            }
          }, (response) => {
          })
        }else {
          this.$message.error('请填写完全！')
        }
      }
    },
    mounted: function () {
      let groupPower=addroleurl.url().groupPower
      this.$http.post(groupPower,{},
        {
          headers: {},
          emulateJSON: true
        }).then((response) => {
        if (response.data.code==0) {
          let data=response.data.data
          this.group=data
        } else {
          this.$message.error(response.data.msg)
        }
      }, (response) => {
      })
    }
  }
</script>

<style>

  .el-form-item{margin-bottom: 10px}
  .spancolor {
    color: #929292;
  }
  .ocontainer{
    background-color:#fff
  }
  .checkbox_group_style{
    border: 1px solid #eee;
    margin:15px 0px;
    display: flex;
    height: 50px;
    line-height: 50px;
    padding:0px 10px;
  }
  .el_button_style{
    margin-left: 0px
  }
  .choose_style{
    font-size:14px;
    font-weight:600
  }
  .ocontainer_item_input{
    width:350px
  }

  /*.cell{text-align: center}*/
</style>
