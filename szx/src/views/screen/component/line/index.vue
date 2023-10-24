<template>
    <div class="box5">
        <div class="top">
            <p class="top-left">未来七天游客数量图</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="line"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from 'echarts'

let line = ref()
onMounted(() => {
    let mycharts = echarts.init(line.value)
    mycharts.setOption({
        title: {
            text: '数量图'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            }, axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            data: [1, 2, 3, 4, 5]
        },
        yAxis: {
            splitLine: {
                show: false
            },

            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        grid: {
            left: 30,
            top: 20,
            right: 20,
            Bottom: 0,
        },
        series: [{
            type: 'line',
            data: [10, 5, 200, 334, 390, 330],
            smooth: true,
            areaStyle: {
                color: {

                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'blue' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'aqua' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false

                },
            }
        },
        ]

    })

})
</script>

<style scoped lang="scss">
.box5 {
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: cover;

    .charts {
        margin-top: 30px;
        width: 100%;
        height: 240px;
    }

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
}
</style>