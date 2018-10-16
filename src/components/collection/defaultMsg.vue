<template>
  <div>
    <div id="editor"></div>
  </div>
</template>
<script>
  export default {
    name: "UE",
    data() {
      return {
        editor: null,

      };
    },
    methods: {

    },
    mounted() {
      this.editor = UE.getEditor("editor"); // 初始化UE

      UE.getEditor('editor').render('editor')
    },
    destroyed() {
      // 将editor进行销毁
      UE.delEditor('editor');
      this.editor.destroy();
      // this.editor.destroy();
    },

  };
</script>
