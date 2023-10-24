<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" style="width:200px;height: 200px;  border-radius:50%;">
            <div>
                <h1 class="title">现在是{{ userStore.username }}的{{ getTime() }}时间</h1>
                <p class="subtitle">硅谷甄选运营平台</p>
            </div>
        </div>

    </el-card>
    <div class="bottom"> <svg-icon name="welcome" width='700px' height="700px"></svg-icon>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from "@/utils/time.ts"
let userStore = useUserStore()
onMounted(() => {
    userStore.userInfo()
})
</script>

<style scoped lang="scss">
.box {
    display: flex;
    align-items: center;


    .title {
        font-size: 40px;
        margin-bottom: 30px;

    }

    .subtitle {

        font-style: italic !important;
        font-size: 25px;
        color: rgb(135, 133, 133);
        font-synthesis: style;
    }

    div {
        margin-left: 20px;



    }
}

.bottom {
    display: flex;
    justify-content: center;
}
</style>