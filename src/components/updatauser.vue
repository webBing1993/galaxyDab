<template id="aaa">
  <el-container class="ocontainer">
    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px">
        <el-breadcrumb-item :to="{ path: '/device/userlist' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改用户</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="ocontainer">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="登陆名"  class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="昵称" class="ocontainer_item_label">
          <el-input size='small' class="ocontainer_item_input" v-model="form.anyname"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="ocontainer_item_label">
          <el-select size='small' v-model="value"  placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色" class="ocontainer_item_label">
          <span>{{wenzi}}</span>
          <span class="updata_span" @click="updata" >修改</span>
          <!-- 弹窗 -->
          <el-dialog title="选择角色" :visible.sync="dialogFormVisible" width="40%" v-loading='loading'>
            <el-form :model="form">
              <el-input placeholder="请输入内容" size="small" prefix-icon="el-icon-search" style="width: 200px"  v-model="search"></el-input>
            </el-form>
            <el-row style="margin-top: 10px">
              <el-col>
                <ul class="grid-content bg-purple el_col_ul_style">
                  <li v-for="(i,j) in searchData" class="el_col_ul_li">
                    <span class="el_col_ul_li_span">{{i.groupName}}</span>
                    <div class="el_col_ul_li_div">
                      <el-radio-group v-model="checkedCities" @change="handleChecked">
                        <el-radio-button :label="i.id" size='small'>选择</el-radio-button>
                      </el-radio-group>

                      <!-- <el-checkbox-group v-model="checkedCities" @change="handleChecked" style="width:40px">
                        <el-checkbox :label="i.id" :key="i.id"></el-checkbox>
                      </el-checkbox-group> -->
                    </div>
                  </li>

                </ul>
              </el-col>
            </el-row>
            <!-- <el-button type="primary" size='small' @click="confirm">确认</el-button> -->
          </el-dialog>

        </el-form-item>
        <!-- <el-form-item label="批量创建">
          <el-input-number size='small' v-if="form.name!=''" :disabled="false" v-model="num1" @change="handleChange1"  :min="1" :max="10" label="描述文字"></el-input-number>
          <el-input-number size='small' v-else :disabled="true" v-model="num1" @change="handleChange1"  :min="1" :max="10" label="描述文字"></el-input-number>
          <span class="spancolor" v-show="form.name!=''&&num1!=1">创建用户名分别为:<i  v-for="i in shuzhi">{{form.name}}00{{i+1}},</i></span>
        </el-form-item>-->


        <el-form-item>
          <el-button type="primary" size='small' @click="created(form)">修改</el-button>
        </el-form-item>
      </el-form>


    </el-main>
  </el-container>
</template>

<script>
  import newuserUrl from '../common.js'
  export default {
    data () {
      return {
        tableData: [],
        checkedCities: [],
        isIndeterminate: true,
        checkAll: false,
        disabled:false,
        input21: '',
        form: {
          name: '',
          password: '',
          anyname: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        index: '',
        name: '',
        options: [
          {
            value: '0',
            label: '启用'
          },
          {
            value: '1',
            label: '停用'
          }
        ],
        shuzhi:[],
        value: [],
        num1: 1,
        wenzi: '未选择',
        search: '',
        checkList1: '',
        loading: false,
        dialogFormVisible: false,
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              validator: function (rule, value, callback) {
                var MobileRegex1 = /^[A-Za-z0-9]{6,20}$/;
                if (!MobileRegex1.test(value)) {
                  callback(new Error('只支持英文,数字,长度在 6 到 20 个字符'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
        }
      }
    },
    beforeMount:function() {
      this.index=this.$route.params.val
      this.form.name=this.$route.params.id
    },
    methods: {
      handleChecked (value) {
        this.checkList1=value
        this.wenzi=this.tableData[value-1].groupName
        this.dialogFormVisible=false
      },
      // handleChange1 (value) {
      //   if(this.form.name!=''){
      //     this.num1=value
      //     this.shuzhi=[]
      //     if(value>=2){
      //       for(var i=0;i<value;i++){
      //         this.shuzhi.push(i)
      //       }
      //     }else {
      //       this.shuzhi=[]
      //     }
      //   }else{
      //     this.$message.error('请先输入登陆名')
      //   }


      // },
      created: function (form) {
        this.index=this.$route.params.val
        this.form.name=this.$route.params.id
        this.$refs.form.validate((valid) => {
          if (valid) {
            let username=this.form.name
            let password=this.form.password
            let status=this.value
            let nickname=this.form.anyname
            let userId=this.index*1
            let checkList1=(this.checkList1)*1
            let updateUserurl=newuserUrl.url().update
            if (username&&password&&status&&nickname&&checkList1) {
              this.$http.post(updateUserurl,
                {
                  password: password,
                  status: status,
                  groupId: checkList1,
                  nickname: nickname
                },
                {
                  params: {userId:userId},
                  headers:{},
                  emulateJSON: true
                }
              ).then((response) => {
                if (response.data.code==0) {
                  this.$message.success(response.data.msg)
                  this.$router.push({ path: '/device/userlist' })
                }else{
                  this.$message.error(response.data.msg)
                }

              }, (response) => {
              })
            } else {
              this.$message.error('请填写正确！')
              return false;
            }
          }
        })
      },
      updata: function () {
        this.dialogFormVisible = true
        this.tableData=this.tableData.splice(0,0)
        let roleUrl=newuserUrl.url().rolelist;
        this.loading=true
        this.$http.get(roleUrl,
          {
            params: {
              page: 1,
              num: 10000
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            // for (let i=0; i<listlength; i++) {
            //   this.tableData.push(list[i])
            //   this.loading=false
            // }
            this.tableData=list
            this.loading=false
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.tableData : []
        this.isIndeterminate = false
      }

    },
    computed: {
      searchData: function() {
        var search = this.search;
        if (search) {
          var arr=[]
          this.tableData.forEach(function(i){
            arr.push({groupName:i.groupName})
          })
          return arr.filter(function(tableData) {
            return Object.keys(tableData).some(function(key) {
              return String(tableData[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }

        return this.tableData;
      }
    },
    mounted: function () {
      this.index=this.$route.params.val
      this.form.name=this.$route.params.id
    }
  }
</script>

<style>
  .spancolor {
    color: #929292;
  }
  .ocontainer{
    background-color:#fff
  }
  .el_col_ul_style{
    border-right: 2px solid #eee;
    height: 200px;
    overflow:auto
  }
  .el_col_ul_li{
    height: 47px;
    line-height:42px
  }
  .el_col_ul_li_span{
    width:70.8%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  .el_col_ul_li_div{
    width:3%;
    height: 30px;
    display: inline-block;
    float:left;
  }
  .updata_span{
    color:#16D032;
    cursor:pointer;
  }
  .ocontainer_item_input{
    width:350px
  }
  .ocontainer_item_label{
    margin-bottom: 14px
  }
  /*.cell{text-align: center}*/
</style>
