import dayjs from 'dayjs'
//北京时间跟utc慢8小时
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc) //扩展utc这个插件
export function timePurify(timedate:string,format='default'){
  let time:string |number
  if(format==='default'){
     time=dayjs.utc(timedate).format()//新建的时间慢了8小时，北京时间比世界时间快8小时
  }
  else{
     time=dayjs.utc(timedate).utcOffset(8,true).format()//新建的时间慢了8小时，北京时间比世界时间快8小时
  }
  const timeValue=dayjs.utc(time)
  const nowTime=dayjs.utc()
  const year=nowTime.diff(timeValue,'year')
  const month=nowTime.diff(timeValue,'month')
  const week=nowTime.diff(timeValue,'week')
  const date=Math.floor(nowTime.diff(timeValue)/1000/60/60/24)
  const hour=nowTime.diff(timeValue,'hour')
  const minute=nowTime.diff(timeValue,'minute')
  const second=nowTime.diff(timeValue,'second')
  if (second<0){
    second
  }
  if(year!==0){
    return `${year}年前`
  }
  else if(month!==0){
    return `${month}月前`
  }
  else if(week!==0){
    return `${week}周前`
  }
  else if(date!==0 && date>0){
    return `${date}天前`
  }
  else if(hour!==0){
    return `${hour}小时前`
  }
  else if(minute!==0){
    return `${minute}分钟前`
  }
  else if(second>=0){
    return `刚刚`
  }
  else{
    return '刚刚'
  }

}
export function timePurify2(time:string,format:string){
  const timedate=dayjs(time).format(format);
  return timedate
}
