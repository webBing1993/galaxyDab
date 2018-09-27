<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>集团 > 品牌 > 酒店</h4>
    </div>

    <div class="centerContent">
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!--集团信息-->
    <div class="bottomContent" v-if="choseType.value=='group'">
      <h4>集团信息</h4>
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="企业名称">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="账户编码">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="企业官网">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">保存</el-button>
          <el-button type="primary" @click="changeBrandRelation=true">修改所属关系</el-button>
        </el-form-item>
      </el-form>


      <!--品牌管理列表-->
      <div v-show="choseType.value=='group'">
        <divider></divider>
        <h4 style="margin-bottom:2rem;" >
          品牌管理
          <div style="float: right">
            <el-button type="success" plain @click="dialogVisible=true">添加品牌</el-button>
          </div>
        </h4>
        <el-table :data="gridData" border stripe>
          <el-table-column property="index" label="序号" width="50"></el-table-column>
          <el-table-column property="code" label="品牌代码" ></el-table-column>
          <el-table-column property="name" label="品牌名称" ></el-table-column>
          <el-table-column property="name" label="品牌logo" ></el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--酒店信息-->
    <div class="bottomContent" v-if="choseType.value=='hotel'">
      <h4>酒店信息</h4>
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="所属品牌：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店类型：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店名称：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="门店编码：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="企业微信id：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="门店地址：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地址编码：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="前台电话：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">保存</el-button>
          <el-button type="warning">修改所属关系</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!--添加品牌弹窗-->
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="品牌代码">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改所属关系-->
    <el-dialog
      title="修改所属关系"
      :visible.sync="changeBrandRelation"
      width="30%">

          <div class="dialog_item">
              <span class="left">酒店ID：</span><span>213124</span>
          </div>
          <div class="dialog_item">
              <span class="left">酒店名称：</span><span>酒店一</span>
          </div>
          <div class="dialog_item">
              <span class="left">父节点：</span>
              <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click.native="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>

    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: 'orgDetailedInfo',
        data () {
            return {
                choseType:{name:'集团',value:'group'},
                gridData: [{
                    index: '1',
                    code:6767,
                    name: '王小虎'
                },{
                    index: '2',
                    code:6767,
                    name: '王小虎'
                },{
                    index: '3',
                    code:6767,
                    name: '王小虎'
                },{
                    index: '4',
                    code:6767,
                    name: '王小虎'
                },{
                    index: '5',
                    code:6767,
                    name: '王小虎'
                }
                ],
                changeBrandRelation:false,
                dialogVisible:false,
                input:'',
                aaa:false,
                options: [{
                    value: 'group',
                    label: '集团'
                }, {
                    value: 'hotel',
                    label: '酒店'
                }, {
                    value: '选项3',
                    label: '部门'
                }, {
                    value: '选项4',
                    label: '旅业'
                }],
                value: ''
            }
        },
        handleClick(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .third_wrap .rightWrap .rightInfo .bottomContent .item.address{
    .el-select{
      width: 25%;
    }
    .el-input{
      width:100%;
    }
  }
.dialog_item{
  margin-bottom: 1rem;
  .left{
    text-align: right;
    display: inline-block;
    width:5rem;
    margin-right: 1rem;
  }
  .el-input{
    width: 50%;
  }
}


</style>
