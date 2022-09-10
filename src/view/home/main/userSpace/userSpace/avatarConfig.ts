//发表文章触发
import { ref } from 'vue'
import {LFromItem,optionType} from '@/components/forml/types';
 const dialogVisible3 = ref(false)

//输入框forml的配置
 const formLabelAlign3:LFromItem[]=[
  {
    type: 'avatar',
    field: 'file',
    id:1,
    label: '修改头像',
  },
]

const formData3=ref<any>({})

formLabelAlign3.forEach((item:LFromItem) => {
  formData3.value[`${item.field}`] = ''
})


export {dialogVisible3,formLabelAlign3,formData3}
