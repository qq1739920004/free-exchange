//发表文章触发
import { ref } from 'vue'
import {LFromItem,optionType} from '@/components/forml/types';
import {label} from '@/store/label/label';
 const dialogVisible = ref(false)
  const labelStore=label()
  const optionPurify=ref<optionType[]>([])
  labelStore.lookMainLabel().then((res)=>{
    labelStore.mainLabel.forEach((item)=>{
      if(item.name=='综合推荐') return
      optionPurify.value.push({title:item.name,value:item.name})
    })
  })
//输入框forml的配置
 const formLabelAlign:LFromItem[]=[
  {
    type: 'select',
    field: 'mainLabel',
    id: 1,
    label: '展示板块',
    options: optionPurify.value,
    placeholder: '您的文章要在哪个板块展示'
  },
  {
    type: 'upload',
    field: 'file',
    id:2,
    label: '上传文章封面',
  },{
    type:'textarea',
    field:'digest',
    id:3,
    label:'文章摘要'
  }
]

const formData=ref<any>({})

formLabelAlign.forEach((item:LFromItem) => {
  formData.value[`${item.field}`] = ''
})
//tag标签配置
 const dynamicTags= ref<string[]>([])

export {dialogVisible,formLabelAlign,formData,dynamicTags}
