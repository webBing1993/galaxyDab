class arrTool{
  //是空数组
  isEmptyArr(arr)
  {
    if(arr&&arr.length>0){
      return true
    }else {
      return false
    }
  }
  //数组排序
  bubbleSort(arr,sequence){
    for(var i=0;i<arr.length-1;i++){
      for(var j=0;j<arr.length-i-1;j++){
        if(sequence===1){
          if(arr[j]>arr[j+1]) {
            var temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
          }//从小到大排序
        }else if(sequence===2){
          if(arr[j]<arr[j+1]) {
            var temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
          }//从大到小排序
        }

      }

    }
    return arr;
  }

  //字符串形式展示数组元素
  showArrVal(arr){
    return arr.join(',')
  }
}
export default new arrTool()
