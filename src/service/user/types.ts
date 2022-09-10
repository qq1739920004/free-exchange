export interface userInfoChangeType{
    nameTrue:string,
    introduce:string
}
export interface userInfoPasswordType{
  password:string | number,
  newPassword:string | number,
  againPassword?:string | number
}
