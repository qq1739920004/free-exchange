//发表文章触发
import { ref } from 'vue'
import {LFromItem,optionType} from '@/components/forml/types';
 const dialogVisible = ref(false)

//输入框forml的配置
 const formLabelAlign:LFromItem[]=[
  {
    type:'input',
    field:'nameTrue',
    id:1,
    label:'名字'
  },
  {
    type:'textarea',
    field:'introduce',
    id:2,
    label:'个人简介',
    otherOptions:{
      maxleng:50
    }
  },

]

const formData=ref<any>({})

formLabelAlign.forEach((item:LFromItem) => {
  formData.value[`${item.field}`] = ''
})


export {dialogVisible,formLabelAlign,formData}
