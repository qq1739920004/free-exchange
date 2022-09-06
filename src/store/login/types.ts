export interface userInfoType{
  name?:string,
  id?:number,
  token?:string,
  path?:string,
  introduce?:string,
  nameTure?:string

}
export interface loginType{
  userInfo:userInfoType
}
