<template>
    <div class="box4" ref="map">
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import chinaJSON from "./cnjson.json";
let map = ref()
echarts.registerMap("china", chinaJSON);
onMounted(() => {
    let mychart = echarts.init(map.value)
    mychart.setOption({
        geo: {
            map: 'china',
            left: 30,
            top: 100,
            bottom: -200,
            right: 0,
            label: {
                show: true
            },
            itemStyle: {
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
                opacity: 0.6
            },
            emphasis: {
                itemStyle: {
                    color: 'red',
                }
            },


        },
        series: [{
            type: 'lines',
            data: [{
                coords: [
                    [
                        112.549248,
                        37.857014
                    ],// 起点
                    [
                        111.670801,
                        40.818311
                    ],  // 终点
                    // 如果 polyline 为 true 还可以设置更多的点
                ],
                // 统一的样式设置
                lineStyle: {
                    color: 'white'
                },

            }],
            effect: {
                show: true,
            }
        }]

    })
})
</script>

<style scoped></style>