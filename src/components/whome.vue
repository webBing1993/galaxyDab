<template>
  <div class="whome">
    <el-container>
      <el-aside>
        <el-menu :default-openeds="openeds"
                 class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <span>酒店配置管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"
                            class="classify"
                            @click="hotelList">
                <i class="el-icon-menu"></i>
                <span>酒店列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>发现</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"
                            class="classify"
                            @click="classify">
                <i class="el-icon-menu"></i>
                <span>分类管理</span>
              </el-menu-item>
              <el-menu-item index="2-2"
                            @click="content">
                <i class="el-icon-tickets"></i>
                <span>内容管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>系统配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"
                            @click="advertising">
                <i class="el-icon-view"></i>
                <span>广告管理</span>
              </el-menu-item>
              <el-menu-item index="3-2"
                            @click="service">
                <i class="el-icon-menu"></i>
                <span>基础服务</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
  data() {
    return {
      openeds: ["1", "2"]
    };
  },
  methods: {
    ...mapActions(['goto']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    hotelList(){
      this.goto('/hotelList')
    },
    classify() {
      this.goto('/classify')
    },
    content() {
      this.goto('/content')
    },
    advertising() {
      this.goto('/advertising')
    },
    service() {
      this.goto('/service')
    }
  }
};
</script>
<style lang="less" scoped>
.whome {
  height: 100%;
  background-color: #F5F8FA;
}
.el-menu{
  border-right: none;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  height: 100%;
  width: 15% !important;
  margin-right: 20px;
  overflow: scroll;
  background-color: #fff;
}
.el-main {
  text-align: left;
  background-color: #fff;
  margin-right: 20px;
}
.el-menu-item span {
  color: #000;
  font-size: 15px;
}
.el-menu-item.is-active {
  background: #22d178 !important;
  color: #ffffff;
}
</style>
