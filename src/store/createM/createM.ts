import { defineStore } from 'pinia'
import createMService from '@/service/createM/index'
import type { createInfoType,setHtmlType,setTitleType,mainLabelType } from './types'
let createMInfo: createInfoType
export const createM = defineStore('createM', {
  state: () => {
    return {
      isHome: true,
      textValue:'我们会帮你自动保存,只要账号相同在哪里都可以继续编辑哦~',
      title:'请输入您的标题',
      createMInfo,
      image:[]
    }
  },
  actions: {
    async getTemp() {
      let result = await createMService.getTemp()
      this.createMInfo = result[0]
      if(!result.length){
        await createMService.createTemp()
        result = await createMService.getTemp()
        this.createMInfo = result[0]
      }
      return result[0]
    },
    //修改动态
    async setTempContent(tempId:string|number,content:string){
      const contentj:setHtmlType={
        content:content
      }
      const result = await createMService.setTempContent(tempId,contentj)
      const result2 = await createMService.getTemp()
      this.createMInfo = result2[0]
      return result
    },
    // 修改标题
    async setTempTitle(tempId:string|number,content:string){
      const titlej:setTitleType={
        title:content
      }
      const result = await createMService.setTempTitle(tempId,titlej)
      const result2 = await createMService.getTemp()
      this.createMInfo = result2[0]

      return result
    },
    // 删除
    async deleteTemp(tempId:string|number){
      const result = await createMService.deleteTemp(tempId)
      return result
    },
    //伪动态转真动态
    async tempBecome(tempId:string|number,mainInfo:mainLabelType,labels:string[]){
      console.log(this.image);
      const result=await createMService.tempBecome(tempId,mainInfo,this.image)
      if(labels.length){
        await createMService.addLabel(result,{label:labels})
      }
    },
  //给动态添加标签
  // async addLabel(label){
  //   const result=await createMService.tempBecome(tempId,mainInfo)
  //   console.log(result);
  // }
  }
})
