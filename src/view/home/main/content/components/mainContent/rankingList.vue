<template>
  <div class="ranking-one" v-if="list?.length">
    <el-card  class="box-card" >
      <template #header>
        <div class="card-header">
          <h3 class="title">{{props.heardInfo.name}}</h3>
        </div>
      </template>
      <el-table :data="list" style="width: 100%" center highlight-current-row>
        <el-table-column  width="70" label="排名" type='index'>
        </el-table-column>
        <el-table-column class-name="vice-title" prop="title" label="标题" width="250" />
        <el-table-column prop="giveCount" :label="props.heardInfo.number"  width="70" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {defineProps,ref} from 'vue';
import {home} from '@/store/home/home';
import {getmoments} from '@/store/home/types';

const props=defineProps(['heardInfo','rankingName'])
const homeStore = home()
const list=ref<getmoments[]>()
async function lcreate(){
  const result=await homeStore.rankingList(props.rankingName)
  list.value=result
  console.log(result);
}
lcreate()
</script>

<style scoped>
.title{
  margin: 0;
}
::v-deep .el-card__body{
  padding-top: 8px;
}
::v-deep .cell{
  white-space: nowrap;
  text-overflow: ellipsis;
}
::v-deep .el-table_1_column_3{
  text-align: center;
}
.vice-title{
  cursor: pointer;
}
.card-header{
  width: 100%;
}
</style>
