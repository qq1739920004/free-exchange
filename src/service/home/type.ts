export interface createType{
  title:string,
  content:string,
  mainLabel:string
}
export interface pageType{
  start:number,
  end:number,
  category?:string | number,
  method?:string,
  ranking?:string,
  search?:string
}
