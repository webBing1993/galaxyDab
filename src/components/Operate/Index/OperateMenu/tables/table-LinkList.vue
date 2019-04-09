<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>产品</th>
        <th>后台链接</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of prodLinkList">
        <td class="v-item">{{obj.name}}</td>
        <td class="v-item">{{obj.control_url}}</td>
        <td>
          <a target="_blank" class="v-options pointer" :href="obj.control_url">前往</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ischecked:true,
        unchecked:false
      }
    },
    props: {
      prodLinkList: {
        type: Array,
        default: []
      },

      page: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 10
      }
    },
    methods: {
      detail(obj) {
        this.$emit('detail', obj);
      },
      gogo(obj) {
        this.$emit('gogo', obj);
      },
      hotel(obj) {
        this.$emit('hotel', obj);
      },
      edit(obj) {
        this.$emit('edit', obj);
      },
      config(obj) {
        this.$emit('config', obj);
      },
      change(obj) {
        this.$emit('click', obj);
      },
    }
  }
</script>
<style scoped lang="less">

  .v-table {
    clear: both;
    padding: 0 0 30px 0;
  }

  .v-table table {
    margin: 0;
    width: 100%;
    border-spacing: 0;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
    line-height: 38px;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  .v-table th {
    padding-left: 10px;
    font-weight: 300;
    color: #ffffff;
    background-color: #9B9B9B;
    font-size: 14px;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table td {
    padding-left: 10px;
    color: #3CC51F;
    font-size: 12px;
    /*border-bottom: solid 1px #e0e0e0;*/
    word-break: keep-all;
    white-space: nowrap;
    line-height: 44px;
  }

  table tr:nth-child(odd) {
    background: #FAFAFA;
  }

  .v-table td a {
    font-size: 12px;
  }

  .v-table .checkbox {
    width: 14px;
    height: 14px;
    margin-left: 15px;
    z-index: 0;
    position: relative;
  }

  .v-table td > label {
    height: 31px;
  }

  .v-table td > label > span {
    margin-left: 10px;
  }

  .v-options {
    /*color: #39C240;*/
    padding-left: 10px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
    color: #37a836;
  }

  .v-item {
    color: #757575 !important;
  }

</style>

