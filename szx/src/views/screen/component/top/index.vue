<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">
                首页
            </span>
        </div>
        <div class="center">
            <div>
                智慧旅游可视化大数据展示平台
            </div>
        </div>
        <div class="right">
            <span class="rbtn">
                统计报告
            </span>
            <span class="time">
                当前时间为：{{ time }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
let router = useRouter()
let timer = ref()
import moment from 'moment'
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('Y年M月DD日 hh:mm:ss')
    }, 1000);
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
let time = ref(moment().format('Y年M月DD日 hh:mm:ss'))
const goHome = () => {
    router.push('/home')

}

</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    color: #29fcff;
    display: flex;

    .left {
        flex: 1;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {

            width: 130px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 40px;
            color: #29fcff;

        }
    }


    .right {
        flex: 1;
        background: url(@/views/screen/images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;

        .rbtn {
            width: 130px;
            height: 40px;
            float: left;
            background: url(@/views/screen/images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 40px;
            color: #29fcff;

        }

        .time {
            line-height: 40px;
            text-align: center;
            float: right
        }
    }

    .center {
        flex: 2;
        height: 100px;
        width: 100%;
        line-height: 100px;
        text-align: center;
        font-size: 30px;
        letter-spacing: 5px;
        background: url(@/views/screen/images/dataScreen-header-center-bg.png) no-repeat;
        background-size: cover;
    }
}
</style>