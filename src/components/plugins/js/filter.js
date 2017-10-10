// 时间大于一个小时显示一小时前
 export const timeTrans  = time =>{
        time-=0;
        if(isNaN(time)){
          time = 0;
        }
        var date = new Date().getTime();
        var newDate = new Date(time);
        var timeDifference = date - newDate;
        var timeSeconds = timeDifference/1000;
        var timeMinutes = timeSeconds/60;
        var timeHours = timeMinutes/60;
        var year = newDate.getFullYear();
        var month = newDate.getMonth()  + 1;
        var day = newDate.getDate();
        if(timeSeconds <60 )
        {
          return '刚刚';
        }else if(timeMinutes<60){
          return parseInt(timeMinutes) + '分钟前';
        }else if(timeHours<24){
          return parseInt(timeHours) +'小时前';
        }else if(timeHours>=24 && timeHours<48){
           return '昨天';
        }else if(timeHours>=48){
          return year +'-'+month+'-'+day;
        }
        
}
function add0(m){return m<10?'0'+m:m }
//时间格式2017-09-07
export const dateTime = time =>{
     time-=0;
    if(isNaN(time)){
      time = 0;
    }
    var newDate = new Date(time);
    var year = newDate.getFullYear();
    var month = newDate.getMonth()  + 1;
    var day = newDate.getDate();
    return year +'-'+add0(month)+'-'+add0(day);

}
//星期几
export const weekTime = time=>{
    time-=0;
    if(isNaN(time)){
      time = 0;
    }
    var weekDate = new Date(time);
    var week = weekDate.getDay();
    switch (week){
        case 0:
           week = "星期天";
           break;
        case 1:
           week = "星期一";
           break;
        case 2:
           week = "星期二";
           break;
        case 3:
           week = "星期三";
           break;
        case 4:
           week = "星期四";
           break;
        case 5:
           week = "星期五";
           break;
        case 6:
           week = "星期六";
           break;
    }
    return week;

}
//小时分钟
export const hours = time=>{
    time-=0 ;
    if(isNaN(time)){
      time = 0;
    }
    time = time/(1000*60);
    if(time<=0){
        return '0小时';
    }else if(Math.round(time/60)<=0 ){
       return Math.ceil(time%60) +'分钟';  
    }else{
        return Math.round(time/60)+'小时'+Math.ceil(time%60) +'分钟'; 
    }
   
}
export const hourMinute = time=>{
     time-=0;
     if(isNaN(time)){
      time = 0;
    }
     var hourDate = new Date(time);
     var hourTime = hourDate.getHours();
     var minute = hourDate.getMinutes();
     return add0(hourTime)+':'+add0(minute);
}
//未分类
export const notA = grade=>{
  if(grade=='O'){
    grade = "未";
  }
  return grade;
}