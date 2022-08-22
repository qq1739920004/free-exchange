export interface userInfoType{
  name?:string,
  id?:number,
  token?:string,
  path:string
}
export interface loginType{
  userInfo:userInfoType
}
