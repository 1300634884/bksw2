<template>
      <el-card>
            <div class="tabbar">
                  <Breadcrumb></Breadcrumb>
                  <Setting></Setting>
            </div>
      </el-card>
</template>

<script setup lang="ts">

import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'


</script>
<script lang="ts">
export default {
      name: 'tabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-image: linear-gradient(to bottom, rgb(255, 255, 255),rgb(255, 255, 255),rgb(222, 222, 222));
      // }
}
</style>