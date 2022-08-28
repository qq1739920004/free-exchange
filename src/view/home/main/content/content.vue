<template>
  <div class="content">
    <nav-top></nav-top>
    <mainContent/>
  </div>
</template>

<script setup lang="ts">
import navTop from './components/navTop.vue';
import mainContent from './components/mainContent.vue';
</script>

<style scoped lang="less">
@media (max-width:920px) {
  .content{
    width: 920px;
  }

}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
