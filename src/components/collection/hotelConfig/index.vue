<template>
  <div class="hotelConfig">
    <div class="hotelConfig_header">
        酒店配置
    </div>
    <div class="hotelConfig_item">
      <div class="hotelConfig_item_title">
        <div class="hotelConfig_item_title_left">
          <span>在住服务</span>
          <p>(酒店对应的企业微信可配置是否开启以下服务类目)</p>
        </div>
        <div class="hotelConfig_item_btn" @click="goto('/liveInService')">
            编辑
        </div>
      </div>
    </div>
    <div class="hotelConfig_item">
      <div class="hotelConfig_item_title">
        <div class="hotelConfig_item_title_left">
          <span>酒店设施</span>
          <p>(酒店对应的企业微信可配置是否开启以下服务类目)</p>
        </div>
        <div class="hotelConfig_item_btn" @click="goto('/hotelFacilties')">
          编辑
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'hotelConfig',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'goto'
    ]),
  },
  mounted () {

  },
  computed:{

  },
}
</script>
<style lang="less" scoped>
  .hotelConfig{
    margin: 20px;
    font-size: 14px;
    .hotelConfig_header{
       height:50px;
       line-height: 50px;
       border-bottom: 1px solid #EBEBEB;
    }
    .hotelConfig_item{
       border-bottom: 1px solid #EBEBEB;
      .hotelConfig_item_title{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height:70px;
        .hotelConfig_item_title_left{
          p{
            color: #A8A8A8;
            font-size: 12px;
          }
        }
        .hotelConfig_item_btn{
          background: #389FFF;
          border-radius: 4px;
          width:68px;
          height:36px;
          line-height: 36px;
          text-align: center;
          color:#ffffff;
        }
      }
    }
  }
</style>
