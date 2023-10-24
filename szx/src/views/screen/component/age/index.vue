<template>
    <div class="center">
        <div class="top">
            <p class="top-left">年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="chart" ref="chart"></div>
    </div>
</template>

<script setup lang="ts">

import *  as echarts from 'echarts';
import { onMounted, ref } from 'vue'
let chart = ref()
onMounted(() => {
    let mycharts = echarts.init(chart.value)
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {

            right: '-10',
            top: '40',
            orient: 'vertical',
            textStyle: {
                color: 'white',
                fontSize: 13
            }

        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '66%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    color: 'white',
                    show: true,
                    position: 'inside'
                },

                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],

            }
        ],
        grid: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0,

        },
    };
    mycharts.setOption(option)
})

</script>

<style scoped lang="scss">
.center {

    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;

    .top {
        height: 40px;
        width: 100%;
        color: white;
        position: relative;

        img {
            width: 80px;
            height: 15px;
            position: absolute;
            top: 30px;
            left: 0;

        }

        .top-left {
            font-size: 24px;
            float: left;
        }

    }

    .chart {
        position: relative;
        left: -50px;
        height: 300px;
        width: 100%;
    }
}
</style>