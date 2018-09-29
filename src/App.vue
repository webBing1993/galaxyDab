<<<<<<< HEAD
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'
export default {

  name: 'App',
  methods: {

  },
  mounted () {
    // router.push('./buser/hotelOrg')
  }
}
</script >

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #eaedf0;
}
@import './assets/style/index.less';
</style>
=======
<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import router from './router'
export default {

  name: 'App',
  methods:{

  },
  mounted(){
      router.push('./buser/hotelOrg')
  }
}
</script >

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #eaedf0;
}
@import "./assets/style/index.less";
</style>
>>>>>>> 9483c4063517aac9e428d98d4b57e7ad5e87f1c1
