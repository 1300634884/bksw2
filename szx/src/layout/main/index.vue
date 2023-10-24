<template>
<router-view v-slot="{ Component }" v-if="SettingStore.refsh">
  <transition name="fade"> 
    <component :is="Component" />
  </transition>
</router-view>
</template>
 
<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting.ts";
import { watch,nextTick } from "vue";

let SettingStore = useLayOutSettingStore()
watch(() => SettingStore.refsh, () => {
  nextTick(
    () => {
      SettingStore.refsh=true
    }
  )
})

</script>
<script lang="ts">export default {
  name:'Main'
}
</script>

<style scoped lang="scss">

.fade-enter-from{
    opacity:0;
    scale:0
}
.fade-enter-active{
    transition:all 1s;
}
.fade-enter-to{
    opacity:1;
      scale:1
} 
</style>