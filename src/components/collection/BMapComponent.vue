<template>
  <div>
    <div id="allmap"></div>
    <div id="r-result">
      城市名: <input id="cityName" type="text" class="inputSearch" />
      <input type="button" value="查询" class="search"
             @click="theLocation" />
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      // return {};
    },
    mounted() {
      // 百度地图API功能
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 11);
      var that = this;
      that.sureLocation = function() {
        var city = document.getElementById("cityName").value;
        if (city != "") {
          map.centerAndZoom(city, 11); // 用城市名设置地图中心点
        }
      };
      map.enableScrollWheelZoom(true);
    },
    methods: {
      theLocation() {
        this.sureLocation();
      }
    }
  };
</script>
<style scoped>
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  #allmap {
    height: 400px;
    width: 700px;
  }
  #r-result {
    width: 100%;
    font-size: 14px;
  }
  input {
    outline: none;
  }
  .search {
    width: 50px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    background-color: #eee;
    border: none;
  }
  .search:hover {
    background-color: #ccc;
  }
  .inputSearch {
    width: 200px;
    height: 30px;
    line-height: 30px;
  }
</style>
