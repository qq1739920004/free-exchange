export interface LFromItem {
  type: LFromType //类型
  field: LField //input需要v-mode绑定到的属性名字
  id: number //id
  label: string //显示的标题
  rules?: any[] //校验规则
  options?: optionType[] //select的选项
  placeholder?: any //提示词
  otherOptions?: any //其他配置
  updateShow?: boolean //是否在编辑此行的时候显示
}
export interface optionType {
  title:string,
  value:string
}
type LFromType = 'input' | 'passWord' | 'select' | 'datepicker' |'upload'
type LField =
  | 'name'
  | 'password'
  | 'sport'
  | 'createTime'
  | 'id'
  | 'intro'
  | 'realname'
  | 'cellphone'
  | 'departmentId'
  | 'roleId'
  | 'createAt'
  | 'type'
  | 'url'
  | 'leader'
  | 'parentId'
  | 'mainLabel'
  | 'file'

  export interface LFromConfig {
    fromItem: LFromItem[]
    labelWidth: string
  }
