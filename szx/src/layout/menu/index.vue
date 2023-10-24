<template>
  <template v-for='(menu, index) in menuList' :key="menu.path">
    <el-menu-item :index="menu.path" v-if="!menu.children && !menu.meta.hidden">
      <el-icon>
        <component :is="menu.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>


    <el-menu-item :index="menu.children[0].path" v-if="menu.children && menu.children.length == 1 && !menu.meta.hidden">
      <el-icon>
        <component :is="menu.children[0].meta.icon"></component>
      </el-icon>
      <template #title>

        <span>{{ menu.children[0].meta.title }}</span>
      </template>

    </el-menu-item>


    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 1 && !menu.meta.hidden">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon"></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <Menu :menuList="menu.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
export default {
  name: 'Menu'
}
</script> 
<script setup lang="ts">

import { defineProps } from 'vue'

defineProps(['menuList'])




</script>

<style scoped></style>