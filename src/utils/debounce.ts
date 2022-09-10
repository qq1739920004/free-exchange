let timer:any=null
let Fn:any=null
export function debounce(this:any,fn:any,time:number,args?:any[]){
  if(timer && Fn===fn) clearTimeout(timer)
  timer=setTimeout(() => {
    if(args){
      fn(args[0],args[1])
    }
    else{
      fn()
    }
  }, time);
  Fn=fn

}
