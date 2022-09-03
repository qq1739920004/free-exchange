//对设计到用户的操作判断有没有登录，没有的全部跳登录页面
export function userRights(){
  const user=localStorage.getItem("user")
  const token=localStorage.getItem("token")
  if(!user || !token){
    return false
  }
  return true
}
