import Vue from 'vue'
import strTool from './tool/strTool.js'
import router from './router'
function getDate (datestr) {
  var temp = datestr.split("-");
  if (temp[1] === '01') {
    temp[0] = parseInt(temp[0],10) - 1;
    temp[1] = '12';
  } else {
    temp[1] = parseInt(temp[1],10) - 1;
  }
  //new Date()的月份入参实际都是当前值-1
  var date = new Date(temp[0], temp[1], temp[2]);
  return date;
}
Vue.mixin({
  data(){
    return{
      strTool:strTool
    }
  },
  methods: {
    //获取两个时间段的日期数组
    getDiffDate(start, end) {
      var startTime = getDate(start);
      var endTime = getDate(end);
      var dateArr = [];
      while (!((endTime.getTime() - startTime.getTime()) < 0)) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);
        var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
        dateArr.push(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
      }
      return dateArr;
    },
    goto(str) {
      if(typeof str === 'number'){
        router.go(str)
      }else {
        router.push(str)
      }
      // console.log('router:',router)
    },
    replaceto(str){
      router.replace(str)
      // console.log('router:',router)
    },
    //时间格式处理
    datetimeparse (timestamp, format, prefix) {
      //转换时区
      let currentZoneTime = new Date (timestamp);
      let currentTimestamp = currentZoneTime.getTime ();
      let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
      let offset = null;
      //客户端时间与服务器时间保持一致，固定北京时间东八区。
      offset = offsetZone + 8;
      currentTimestamp = currentTimestamp + offset * 3600 * 1000

      let newtimestamp = null;
      if (currentTimestamp) {
        if (currentTimestamp.toString ().length === 13) {
          newtimestamp = currentTimestamp.toString ()
        } else if (currentTimestamp.toString ().length === 10) {
          newtimestamp = currentTimestamp + '000'
        } else {
          newtimestamp = null
        }
      } else {
        newtimestamp = null
      }
      ;
      let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
      let YYYY = dateobj.getFullYear ()
      let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
      let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
      let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
      let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
      let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
      let output = '';
      let separator = '/'
      if (format) {
        separator = format.match (/-/) ? '-' : '/'
        output += format.match (/yy/i) ? YYYY : ''
        output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
        output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
        output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
        output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
        output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
      } else {
        output += YYYY + separator + MM + separator + DD
      }
      output = prefix ? (prefix + output) : output

      return newtimestamp ? output : ''
    },
    dateStr(arr){
      const [a, b, c] = arr;
      let d = '00'
      const abcd = a+' '+b+':'+c+':'+d;
      return abcd;
    },

    transTime(timeStr){
      let array=[];
      if(timeStr){
        let item1=this.datetimeparse(timeStr,'YYYYMMDD hhmm').split(' ');
        let first=item1[0].split('/').join('-');
        let second=item1[1].split(':');
        array.push(first);
        array.push(second[0]);
        array.push(second[1]);
      }
      return array;
    },
  }
})
