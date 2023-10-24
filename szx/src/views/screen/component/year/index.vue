<template>
    <div class="year">
        <div class="top">
            <p class="top-left">年度游客量对比</p>
            <img src="../../images/dataScreen-title.png" alt="">

        </div>
        <div class="chart" ref='chart'>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let chart = ref()
onMounted(() => {
    let myChart = echarts.init(chart.value)
    myChart.setOption({
        title: {
            text: "散点图",
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {
            type: "category",
            show: false
        },
        yAxis: { show: false },
        // grid: {
        //     right: 0,
        //     left: 0,
        //     top: 0,
        //     bottom: 0
        // },
        series: [{
            type: 'scatter',
            data: [33, 88, 21, 7, 222, 312]
        }]



    })
})
</script>

<style scoped>
.year {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;

    .top {
        height: 80px;
        width: 100%;
        color: white;

        position: relative;

    }

    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>