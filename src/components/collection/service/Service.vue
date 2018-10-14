<template>
  <div>
    <el-row>
      <el-col :span="22">
        <div>
          <h1>常客管理</h1>
          <p>(酒店企业微信关闭功能,并隐藏栏目)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="c_status" active-color="#13ce66" inactive-color="#ff4949"  @change="changestatus($event,1,c_id,c_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <div>
          <h1>基础信息</h1>
          <p>(酒店企业微信关闭功能,并隐藏栏目)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="j_status" active-color="#13ce66" inactive-color="#ff4949" @change="changestatus($event,2,j_id,j_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <div>
          <h1>WIFI管理</h1>
          <p>(酒店企业微信关闭wifi管理权限,C端小程序不可点，提示当前酒店暂未开通)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="w_status" active-color="#13ce66" inactive-color="#ff4949" @change="changestatus($event,3,w_id,w_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <div>
          <h1>活动广告</h1>
          <p>(酒店企业微信活动广告关闭管理权限)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="h_status" active-color="#13ce66" inactive-color="#ff4949" @change="changestatus($event,4,h_id,h_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <div>
          <h1>申请发票</h1>
          <p>(酒店企业微信发票中心关闭管理权限)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="s_status" active-color="#13ce66" inactive-color="#ff4949" @change="changestatus($event,5,s_id,s_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <div>
          <h1>摇一摇获取积</h1>
          <p>(酒店企业微信关闭功能,并隐藏栏目)</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-switch v-model="y_status" active-color="#13ce66" inactive-color="#ff4949" @change="changestatus($event,6,y_id,y_key)">
          </el-switch>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
export default {
  data() {
    return {
      c_status: true,
      c_id: "",
      c_key: "",
      j_status: true,
      j_id: "",
      j_key: "",
      w_status: true,
      w_id: "",
      w_key: "",
      h_status: true,
      h_id: "",
      h_key: "",
      s_status: true,
      s_id: "",
      s_key: "",
      y_status: true,
      y_id: "",
      y_key: ""
    };
  },
  created() {
    this.initlist();
  },
  methods: {
    ...mapActions([
      'service',
      'changeSta'
    ]),
    initlist() {
      this.service({
        onsuccess: body => {
        if (body) {
           console.log(body.data)
                this.c_status = body.data[0].open;
                this.c_id = body.data[0].id;
                this.c_key = body.data[0].key;
                this.j_status = body.data[1].open;
                this.j_id = body.data[1].id;
                this.j_key = body.data[1].key;
                this.w_status = body.data[2].open;
                this.w_id = body.data[2].id;
                this.w_key = body.data[2].key;
                this.h_status = body.data[3].open;
                this.h_id = body.data[3].id;
                this.h_key = body.data[3].key;
                this.s_status = body.data[4].open;
                this.s_id = body.data[4].id;
                this.s_key = body.data[4].key;
                this.y_status = body.data[5].open;
                this.y_id = body.data[5].id;
                this.y_key = body.data[5].key;
            }
        }
      })
    },
    changestatus: function($event, num, id, key) {
      // console.log($event);
      // console.log(num);
      // console.log(id);
      // console.log(key);
      this.changeSta({
          id:id,
          key:key,
          open:open,
        onsuccess: body => {
        if (body) {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          });
         }
       }

      })
      // this.axios
      //   .post("http://qa.fortrun.cn:9201/galaxy-front/config/update", {
      //     id: id,
      //     key: key,
      //     open: $event
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
    }
  }
}
</script>
<style scoped>
.el-row {
  margin: 20px auto 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
