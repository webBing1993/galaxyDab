<template>
  <div>
    <div class="module-wrapper">
      <table-LinkList :prodLinkList="linkList"  @gogo="_toThisLink(obj)"></table-LinkList>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        linkList: []
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getProdBaseList',
      ]),
      _getProdBaseList(){
        this.getProdBaseList({
          onsuccess: body => {
            this.linkList = body.data;
          }
        })
      },
      _toThisLink(obj){
        console.log('------>',obj)
          console.log('11111')
        this.goto(obj)
      },
    },
    mounted() {
      this._getProdBaseList()
    }
  }
</script>
<style scoped lang="less">

</style>
