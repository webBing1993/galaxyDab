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
//       router.push('./buser/hotelOrg')
       router.push('./hotelOrg')
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
