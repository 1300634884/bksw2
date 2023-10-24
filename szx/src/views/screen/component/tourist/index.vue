<template>
    <div class='tourist'>
        <div class="top">
            <p class="top-left">实时游客统计</p>
            <img src="../../images/dataScreen-title.png" alt="">
            <p class="top-right">可预约总量999999人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
let people = ref('215908人')
let charts = ref()
import 'echarts-liquidfill'
import *  as echarts from 'echarts';

onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {

        },
        xAxis: {},
        yAxis: {},
        series: {
            type: 'liquidFill',
            data: [0.6],
            waveAnimation: true,
            animationDuration: 0,
            animationDurationUpdate: 0,
            radius: '90%',

        },

        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})

</script>

<style scoped lang="scss">
.tourist {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;


    .top {
        height: 80px;
        width: 100%;
        color: white;

        position: relative;

        img {
            width: 80px;
            height: 15px;

            position: absolute;
            top: 40px;
            left: 0;

        }



        .top-left {
            font-size: 24px;
            float: left;
        }

        .top-right {
            font-size: 14px;
            float: right;
            margin: 50px 2px;
        }
    }

    .number {
        margin-top: 20px;
        display: flex;
        margin-left: 50px;
        width: 80%;

        span {

            padding: 5px 10px;
            font-size: 40px;
            height: 50px;
            width: 50px;
            flex: 1;
            color: aqua;
            background: url(@/views/screen/images/total.png) no-repeat;
            background-size: cover;
        }
    }

    .charts {
        width: 100%;
        height: 270px;
        margin-top: 20px;
    }
}
</style>