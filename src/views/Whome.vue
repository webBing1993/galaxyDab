<template>
  <div class="whome">
    <el-container>
      <el-aside>
        <el-menu :default-openeds="openeds"
                 class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>发现</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"
                            class="classify"
                            @click="classify">
                <i class="el-icon-menu"></i>
                <span>分类管理</span>
              </el-menu-item>
              <el-menu-item index="1-2"
                            @click="content">
                <i class="el-icon-tickets"></i>
                <span>内容管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"
                            @click="advertising">
                <i class="el-icon-view"></i>
                <span>广告管理</span>
              </el-menu-item>
              <el-menu-item index="2-2"
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
export default {
  data() {
    return {
      openeds: ["1", "2"]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    classify() {
      this.$router.push({ name: "classify" });
    },
    content() {
      this.$router.push({ name: "content" });
    },
    advertising() {
      this.$router.push({ name: "advertising" });
    },
    service() {
      this.$router.push({ name: "service" });
    }
  }
};
</script>
<style lang="less" scoped>
.whome {
  height: 100%;
  background-color: #f1f1f1;
}
.el-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.el-aside {
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  height: 100%;
  width: 15% !important;
  /* border: 1px solid #eeeeee; */
  overflow: scroll;
  background-color: #fff;
}
.el-main {
  text-align: left;
  background-color: #fff;
}
.el-menu-item span {
  color: #000;
  font-size: 15px;
}
.el-menu-item.is-active {
  background: #42c640 !important;
  color: #ffffff;
}
</style>
