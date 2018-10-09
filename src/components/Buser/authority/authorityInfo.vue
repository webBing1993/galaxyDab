<!--集团信息，第四级包裹-->
<template>
  <div class="rightInfo">
    <div class="topTitle">
      <h4>权限信息</h4>
    </div>
    <div class="centerContent">

      <el-form label-width="120px">
        <el-form-item label="ID：">
          <el-input v-model="getCurrendNode.id" disabled placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="getCurrendNode.name" required placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="TAG：">
          <el-input v-model="getCurrendNode.tag" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标地址：">
          <el-input v-model="getCurrendNode.icon" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="链接地址：">
          <el-input v-model="getCurrendNode.url" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="请求方式：">
          <el-select v-model="getCurrendNode.requestMethod" placeholder="请选择">
            <el-option
              v-for="item in requestType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限描述：">
          <el-input v-model="getCurrendNode.description" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="success" @click="submitChange">修 改</el-button>-->
          <!--<el-button type="danger" @click="submitDelete">删 除</el-button>-->
        </el-form-item>
      </el-form>


    </div>
  </div>

</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'authInfo',
    props: {

      NodeId: {
        type: [String],
        default: ''
      },
      currendNode: {
        type: [Object, Array],
        default: () => {
        }
      }
    },
    data() {
      return {
        input: '',
        value: '',
        showAddNew: false,
        filterText: '',
        dialogVisible: false,
        orgId: '',
        getCurrendNode: {},
        requestType: [{
          value: 'GET',
          label: 'GET'
        }, {
          value: 'POST',
          label: 'POST'
        },
          {
            value: 'DELETE',
            label: 'DELETE'
          },
          {
            value: 'PUT',
            label: 'PUT'
          }],
      }
    },
    methods: {
//
      ...mapActions([
        'authNodeDetail',
        'modifyAuth',
        'delAuth',
      ]),

      getCurrentDetail() {
        this.authNodeDetail({
          permissionid: this.orgId,
          onsuccess: body => {
            if (body.data) {
              this.getCurrendNode = body.data
            } else {
            }
          }

        })
      },

      submitChange() {
        let fields = this.getCurrendNode
        this.modifyAuth({
          fields: fields,
          onsuccess: body => {
            this.$message({
              message: '修改成功',
              type: 'error'
            });
            this.$emit('reLoadAuthTree')
          },
          onfail: body => {
            this.$message({
              message: body.data.errmsg,
              type: 'error'
            });
          }
        })
      },

      submitDelete(parm) {
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delAuth({
            ids: parm.ids,
            onsuccess: body => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit('reLoadAuthTree')
            },
            onFail: body => {
              this.$message({
                type: 'warning',
                message: '删除失败!'
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

      handleClick() {
      },

      handleSelectionChange() {
      },

      handleClose() {
      }
    },
    mounted() {
      this.orgId = this.NodeId;
      this.getCurrentDetail()
      this.getCurrendNode = this.currendNode
    },
    watch: {
      NodeId(val) {
        this.orgId = val;
        this.getCurrentDetail()
      },
      currendNode(val) {
        this.getCurrendNode = val
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
