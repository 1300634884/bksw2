<template>
  <div>
    <div class="tabbar-left" @click="changeicon">
      <el-icon class="left-Icon">
        <component :is="SettingStore.flod? 'Expand':'Fold'"></component>
      </el-icon>
      <div class="tabbarLeft">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: `${breadcrumb.path}` }" v-for="(breadcrumb, index) in  $route.matched"
            :key="index" v-show="breadcrumb.meta.icon">
            <el-icon>
              <component :is="breadcrumb.meta.icon"></component>
            </el-icon>
            {{ breadcrumb.meta.title }}
          </el-breadcrumb-item>

        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from "vue-router"

import useLayOutSettingStore from '@/store/modules/setting'
let $route = useRoute()
let SettingStore = useLayOutSettingStore()
const changeicon = () => {
  SettingStore.flod = !SettingStore.flod
}







</script>
<script lang="ts">
export default {
  name: 'breadcrumb'
}
</script>
<style scoped>
.tabbar-left {

  display: flex;
  align-items: center;
  margin-left: 30px;
}
</style>