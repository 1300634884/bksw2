<template>
    <div class="center">
        <div class="top">
            <p class="top-left"> 男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="bottom">
            <div class="man">
                <span>男生</span>
                <img src="../../images/man.png" class="manImg">
            </div>
            <div class="women">
                <span>女生</span>
                <img src="../../images/woman.png" class="womenImg">
            </div>

        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="chart" ref="echart"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import *  as echarts from 'echarts';
let echart = ref()
onMounted(() => {
    let mycharts = echarts.init(echart.value)
    mycharts.setOption({

        title: {
            text: '男女比例',//主标题
            textStyle: {//主标题颜色
                color: 'skyblue'
            },
            left: '40%'

        }, xAxis: {


            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            type: 'category',
            show: false,
        },
        series: [
            {
                data: [58],
                type: 'bar', barWidth: 20,
                z: 100, itemStyle: {
                    color: 'skyblue',
                    borderRadius: 20
                }
            },
            {

                data: [100],
                type: 'bar',
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20
                }

            }
        ],
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }

    })
})

</script>

<style scoped lang="scss">
.center {
    display: flex;
    background: url(../../images/dataScreen-main-lc.png) no-repeat;
    background-size: cover;

    flex-direction: column;
    align-items: center;

    .top {
        flex: 1;
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

    .bottom {
        color: white;
        flex: 2;
        width: 100%;
        display: flex;

        .man {
            margin-right: 20px;
            margin-left: 75px;
            width: 125px;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: cover;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                margin: 5px 0;
            }

            .manImg {
                margin: 10px 0;
                height: 75px;
                width: 75px;
            }
        }

        .women {
            width: 125px;
            margin-left: 20px;
            margin-right: 75px;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: cover;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                margin: 5px;
            }

            .womenImg {
                margin: 10px 0;
                height: 75px;
                width: 75px;
            }


        }

    }

    .rate {
        width: 100%;
        color: white;
        display: flex;
        justify-content: space-between;
        flex-direction: row
    }

    .chart {
        flex: 1.5;
        width: 300px;
        margin: 0 5px;
    }

}
</style>