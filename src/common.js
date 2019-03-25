import base_api from './apiurl.js';
function url () {
  //煜邦http://192.168.0.112:30000
  //测试环境https://iotdev.fortrun.cn
  // let baseurl=base_api.baseurl
  let HOST = process.env.HOST;
  HOST = HOST === 'prod' ? '' : '-' + HOST;
  console.log('host1',process.env.HOST)
  let baseurl=base_api.baseurl

  //用户登录
  this.login=baseurl+'/adminapi/v1/user/login'
  // 用户列表
  this.userlist=baseurl+'/adminapi/v1/user/list/{page}/{num}'
  // 批量添加用户
  this.addMultiUser=baseurl+'/adminapi/v1/user/addMultiUser'
  // 添加一个用户
  this.addUser=baseurl+'/adminapi/v1/user/addUser'
  //用户列表筛选、
  this.searchUser=baseurl+'/adminapi/v1/user/search/{page}/{num}'
  //删除用户
  this.delUser=baseurl+'/adminapi/v1/user/delete/{userId}'
  //修改用户信息
  this.update=baseurl+'/adminapi/v1/user/update/{userId}'
  //筛选角色
  this.searchrole=baseurl+'/adminapi/v1/group/search/{page}/{num}'
  //添加角色
  this.addrole=baseurl+'/adminapi/v1/group/addGroup'
  //角色权限
  this.groupPower=baseurl+'/adminapi/v1/group/groupPower/list'
  //启用用户
  this.enableUser=baseurl+'/adminapi/v1/user/able/{userId}'
  //启用角色
  this.enablegroupId=baseurl+'/adminapi/v1/group/able/{groupId}'
  //禁用角色
  this.stopgroupId=baseurl+'/adminapi/v1/group/stop/{groupId}'
  //停用用户
  this.stopUser=baseurl+'/adminapi/v1/user/unable/{userId}'
  //获取角色列表
  this.rolelist=baseurl+'/adminapi/v1/group/list/{page}/{num}'
  //添加一个设备
  this.addDevMessage=baseurl+'/adminapi/v1/manager/addDevMessage'
  //在库设备
  this.devList=baseurl+'/adminapi/v1/manager/devList/notrun/{page}/{num}'
  //运行设备
  this.run=baseurl+'/adminapi/v1/manager/devList/run/{page}/{num}'
  //设备回收接口
  this.setNotRun=baseurl+'/adminapi/v1/manager/setNotRun/{mac}'
  //获取设备信息接口
  this.devInfo=baseurl+'/adminapi/v1/manager/devInfo/{mac}'
  //csv文件批量添加设备信息接口
  this.uploadDevCsv=baseurl+'/adminapi/v1/manager/uploadDevCsv'
  //获取已经在库的设备列表（搜索）
  this.notOnline=baseurl+'/adminapi/v1/manager/searchDev/notOnline/{page}/{num}'
  //获取运行设备列表（搜索）
  this.online=baseurl+'/adminapi/v1/manager/searchDev/online/{page}/{num}'
  //操作日志
  this.devOptionLog=baseurl+'/adminapi/v1/manager/devOptionLog/{mac}/{page}/{num}'
  //获取设备通用日志列表
  this.devlog=baseurl+'/adminapi/v1/devlog/log/{mac}/{page}/{offset}'
  //设备用水日志列表
  this.water=baseurl+'/adminapi/v1/devlog/water/{mac}/{page}/{offset}'
  //设备用电日志列表
  this.ammeter=baseurl+'/adminapi/v1/devlog/ammeter/{mac}/{page}/{offset}'
  //固件列表
  this.firmwarelist=baseurl+'/adminapi/v1/firmware/list/{page}/{num}'
  //固件上传
  this.uploadFirmware=baseurl+'/adminapi/v1/firmware/uploadFirmware'
  //固件下拉
  this.deviceTypeList=baseurl+'/adminapi/v1/firmware/deviceTypeList'
  //远程任务列表
  this.planlist=baseurl+'/adminapi/v1/plan/list/{page}/{num}'
  //远程任务列表（筛选）
  this.planlistsearch=baseurl+'/adminapi/v1/plan/search/{page}/{num}'
  //远程任务具体信息
  this.plandatails=baseurl+'/adminapi/v1/plan/info/{planId}'
  //固件筛选
  this.searchfirmware=baseurl+'/adminapi/v1/firmware/search/{page}/{num}'
  //启用固件
  this.ableFirmware=baseurl+'/adminapi/v1/firmware/ableFirmware/{id}'
  //固件类型
  this.planOptionTypeList=baseurl+'/adminapi/v1/plan/planOptionTypeList'
  //禁用
  this.unableFirmware=baseurl+'/adminapi/v1/firmware/unableFirmware/{id}'
  //检查一个远程任务是否可以正常运行
  this.newRemoteTaskcheck=baseurl+'/adminapi/v1/plan/check'
  //添加一个远程任务
  this.AddPlan=baseurl+'/adminapi/v1/plan/addPlan'
  //暂停一个远程任务
  this.stopTask=baseurl+'/adminapi/v1/plan/stopTask/{planId}'
  //恢复一个远程任务
  this.startTask=baseurl+'/adminapi/v1/plan/startTask/{planId}'
  //删除一个远程任务
  this.deletePlan=baseurl+'/adminapi/v1/plan/deletePlan/{planId}'
  //拿到token
  this.buildBindAdminUserCode=baseurl+'/adminapi/v1/user/buildBindAdminUserCode/{userId}'
  //获取设备参数接口
  this.deviceparam=baseurl+'/iotapi/v1/deviceparam/param/{mac}'
  //更新设备参数接口
  this.updateParam=baseurl+'/iotapi/v1/deviceparam/updateParam/{mac}'
  //获取设备蓝牙rssi阈值配置接口
  this.deviceRssiList=baseurl+'/iotapi/v1/deviceparam/deviceRssiList/{mac}'
  //修改设备蓝牙rssi阈值配置接口
  this.updateRssiData=baseurl+'/iotapi/v1/deviceparam/updateRssiData/{mac}'
  //添加设备蓝牙rssi阈值配置接口
  this.addRssiData=baseurl+'/iotapi/v1/deviceparam/addRssiData/{mac}'
  //获取设备蓝牙rssi阈值具体配置接口
  this.infoRssiData=baseurl+'/iotapi/v1/deviceparam/infoRssiData/{mac}'
  //删除设备蓝牙rssi阈值配置接口
  this.deleteRssiData=baseurl+'/iotapi/v1/deviceparam/deleteRssiData/{mac}'
  //搜索酒店接口
  this.searchHotel=baseurl+'/iotapi/v1/entranceGuardArea/searchHotel'
  //添加门禁区域接口
  this.addArea=baseurl+'/iotapi/v1/entranceGuardArea/addArea'
  //修改门禁区域接口 /iotapi/v1/entranceGuardArea/updateArea/{areaId:\d+}
  this.updateArea=baseurl+'/iotapi/v1/entranceGuardArea/updateArea/{areaId}'
  //修改门禁点接口
  this.updatePoint=baseurl+'/iotapi/v1/entranceGuardPoint/updatePoint/{pointId}'
  //修改门禁点镜像接口
  this.updatePointImage=baseurl+'/iotapi/v1/entranceGuardPoint/updatePointImage/{id}'
  //添加门禁点接口 /iotapi/v1/entranceGuardPoint/addPoint
  this.addPoint=baseurl+'/iotapi/v1/entranceGuardPoint/addPoint'
  //添加门禁点镜像接口
  this.addPointImage=baseurl+'/iotapi/v1/entranceGuardPoint/addPointImage{id}'
  //获取门禁区域下门禁点和门禁区域接口/iotapi/v1/entranceGuardArea/areas
  this.areas=baseurl+'/iotapi/v1/entranceGuardArea/areas'

  //删除门禁区域
  this.deleteArea=baseurl+'/iotapi/v1/entranceGuardArea/deleteArea/{areaId}'
  //删除门禁点/iotapi/v1/entranceGuardPoint/deletePoint/{pointId:\d+}
  this.deletePoint=baseurl+'/iotapi/v1/entranceGuardPoint/deletePoint/{pointId}'

  //获取酒店下所有门禁点镜像接口/iotapi/v1/entranceGuardPoint/findImagesByHotel
  this.findImagesByHotel=baseurl+'/iotapi/v1/entranceGuardPoint/findImagesByHotel'
  //获取酒店下所有非镜像门禁点接口
  this.findNotImagesByHotel=baseurl+'/iotapi/v1/entranceGuardPoint/findNotImagesByHotel'
  //获取酒店下所有房间接口/iotapi/v1/entranceGuardArea/getHotelAllRooms
  this.getHotelAllRooms=baseurl+'/iotapi/v1/entranceGuardArea/getHotelAllRooms'
  //解除绑定
  this.unbindDevice=baseurl+'/iotapi/v1/entranceGuardPoint/unbindDevice'

  //施工管理 - 施工人员
  this.searchOrganizeGroup = baseurl +'/iotapi/v1/buildparam/searchOrganize'
  //固件下拉框
  this.firmWareGroup =baseurl +'/adminapi/v1/firmware/selectFirmware'
  //施工管理-添加组织
  this.addGroup = baseurl +'/iotapi/v1/buildparam/addOrganize'
  //施工管理-编辑组织
  this.updateOrganize = baseurl +'/iotapi/v1/buildparam/updateOrganize'
  //施工管理-删除组织
  this.deleteGroup = baseurl +'/iotapi/v1/buildparam/deleteOrganize'


  //施工管理 - 获取组织下成员
  this.getOrgAllPerson = baseurl +'/iotapi/v1/buildparam/getOrgAllPerson'
  this.getOrgRunPerson = baseurl +'/iotapi/v1/buildparam/getOrgRunPerson'
  //施工管理 - 添加一个施工组织 成员
  this.addPerson = baseurl +'/iotapi/v1/buildparam/addPerson'
  //施工管理 - 修改一个施工组织成员状态和操作
  this.updateStatus = baseurl +'/iotapi/v1/buildparam/updateStatus'

  // 施工人员树形数据
  this.getAreaAndPointTree = baseurl +'/iotapi/v1/task/getAreaAndPointTree'

  //酒店接口
  this.searchHotel = baseurl +'/iotapi/v1/entranceGuardArea/searchHotel'

  //初始施工任务列表数据
  this.initialList = baseurl +'/iotapi/v1/task/list/{page}/{num}'

  //施工任务筛选数据
  this.screenList = baseurl +'/iotapi/v1/task/search/{page}/{num}'

  //施工任务状态修改
  this.taskStatus = baseurl +'/iotapi/v1/task/updateStatus'

  //提交任务数据
  this.addTask = baseurl +'/iotapi/v1/task/addTask'

  //编辑施工任务显示数据
  this.getTaskById = baseurl +'/iotapi/v1/task/getTaskById'

  //确认编辑施
  this.updateTask = baseurl +'/iotapi/v1/task/updateTask'

  //删除任务
  this.deleteTask = baseurl + '/iotapi/v1/task/deleteTask'

  //修改密码
  this.resetPassword = baseurl + '/iotapi/v1/buildparam/resetPassword'

  this.baseurl1="https://iotdev.fortrun.cn/master"
  return this
}
export default{
  url
}
