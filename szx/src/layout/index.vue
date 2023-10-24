<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ changeIfIcon: !SettingStore.flod }">
            <logo></logo>
            <!-- 菜单组件 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" active-text-color="pink" router
                    :default-active="$route.path" :collapse=!SettingStore.flod>
                    <Menu :menuList="UserStore.menuRoutes"></Menu>
                    <!-- 此处router为，若无子节点，则直接跳新页面，而非router-view，若为子节点者为router-view -->
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{ layout2: !SettingStore.flod }">
            <tabbar></tabbar>
        </div>
        <div class="layout_main" :class="{ layout2: !SettingStore.flod }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from "./logo/index.vue"
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'
import Main from '@/layout/main/index.vue'
import { useRoute } from 'vue-router'
import tabbar from '@/layout/tabbar/index.vue'


import useLayOutSettingStore from '@/store/modules/setting'

let SettingStore = useLayOutSettingStore()
let $route = useRoute()
let UserStore = useUserStore()
</script>
<script lang="ts">
export default {
    name: 'layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            height: calc(100vh - $base-menu-logo-height);
            overflow: hidden;

            .el-menu {
                border-right: none;
            }
        }

        &.changeIfIcon {
            width: $base-menu-min-width;
            overflow: hidden;
            transition: all 0.3s;
        }
    }



    .layout_tabbar {
        position: fixed;
        height: $base-tabbar-height ;
        width: calc(100% - $base-menu-width);
        top: 0;
        left: $base-menu-width;
        transition: all 0.3s;

        &.layout2 {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width ;
            transition: all 0.3s;
        }

    }

    .layout_main {
        position: absolute;
        left: $base-menu-width ;
        top: $base-tabbar-height ;
        height: calc(100vh - $base-tabbar-height );
        width: calc(100% - $base-menu-width);
        transition: all 0.3s;
        overflow: auto;

        &.layout2 {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
            transition: all 0.3s;
        }
    }

}
</style>