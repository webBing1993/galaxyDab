class objTool{

  //是空对象
  isEmptyObject(obj)
  {
    for (let key in obj)
    {
      return false
    }
    return true
  }
}
