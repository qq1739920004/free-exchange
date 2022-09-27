import { defineStore } from 'pinia'
import changeMService from '@/service/changeM/index'
import {setHtmlType,setTitleType} from '@/store/createM/types';

export const changeM = defineStore('changeM', {
  state: () => {
    return {
      title:'',
      content:''
    }
  },
  actions: {
    //获取文章详情
    async getMoment(id:number){
      const result = await changeMService.getMoment(id)
      this.title=result[0].title
      this.content=result[0].content
  },
    //修改文章,修改标题
    async setMoment(tempId:string|number,content:string,title:string){
      const contentj:setHtmlType={
        content:content
      }
      const titlej:setTitleType={
        title:title
      }
      await changeMService.setTempContent(tempId,contentj)
      const result = await changeMService.setTempTitle(tempId,titlej)

      return result
    },

  }
})
