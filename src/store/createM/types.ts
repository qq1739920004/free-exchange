export interface createInfoType extends Array<any>{
  content: string
  createAt: string
  id: number
  title: string
  updateAt: string
  user_id: number
  image:string[]
}
export interface setHtmlType{
  content:string
}
export interface setTitleType{
  title:string
}
export interface mainLabelType{
  mainLabel:string
  image:string[]
}
