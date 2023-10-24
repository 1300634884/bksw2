<template>
    <div class="rank">
        <div class="top">
            <p class="top-left">热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="">

        </div>
        <div class="charts" ref="rank"> </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let rank = ref();
onMounted(() => {
    let mycharts = echarts.init(rank.value)
    mycharts.setOption({
        xAxis: {
            splitLine: {
                show: false
            }, axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }, type: 'category',
        },
        yAxis: {
            splitLine: {
                show: false
            }, axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        grid: {

        },
        series: [{
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            label: {
                show: true,
            }, showBackground: true,
            backgroundStyle: {
                color: 'red'

            },
            itemStyle: {
                borderRadius: [10, 10, 0, 0],
                color: function (data) {
                    let arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
                    return arr[data.dataIndex]

                }
            }
        }, {
            type: 'line',
            data: [10, 20, 30, 40, 50, 60, 90],
            smooth: true,//平滑曲线
        }
        ],

    })
})

</script>

<style scoped>
.rank {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;

    .top {
        height: 80px;
        width: 100%;
        color: white;

        position: relative;

    }


    .charts {

        height: 300px;
        width: 100%;
    }
}
</style>