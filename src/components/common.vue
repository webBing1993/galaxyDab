<script type="text/javascript">
  // 定义一些公共的属性和方法
  //存值方法
  function setContextData(key, value) {
    if(typeof value == "string"){
      sessionStorage.setItem(key, value);
    }else{
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
  function getContextData(key){
    const str = sessionStorage.getItem(key);
    if( typeof str == "string" ){
      try{
        return JSON.parse(str);
      }catch(e) {
        return str;
      }
    }
    return;
  }
  // 暴露出这些属性和方法
  export default {
    setContextData,
    getContextData
  }
</script>
