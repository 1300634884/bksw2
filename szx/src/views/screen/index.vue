<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Top></Top>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <rank class="rank"></rank>
          <year class="year"></year>
          <count class="count"></count>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Top from './component/top/index.vue'
import Age from './component/age/index.vue'
import Sex from './component/sex/index.vue'
import Tourist from './component/tourist/index.vue'
import Map from './component/map/index.vue'
import Line from './component/line/index.vue'
import year from "./component/year/index.vue"
import count from "./component/count/index.vue"
import rank from "./component/rank/index.vue"

let screen = ref();
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    height: 1080px;
    width: 1920px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .bottom {
      display: flex;

      .left {
        display: flex;
        flex: 1;
        height: 1040px;

        flex-direction: column;
        flex-wrap: nowrap;

        .tourist {
          margin: 10px;
          flex: 1.5;
        }

        .age {
          margin: 15px 20px;
          flex: 1;
        }

        .sex {
          margin: 0 20px;
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1.5;
          margin: 15px 15px;
        }

        .year {
          flex: 1;
          margin: 15px 15px;
        }

        .count {
          flex: 1;
          margin: 15px 15px;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;

        .map {

          flex: 3;
        }

        .line {

          flex: 1;
        }
      }
    }
  }
}
</style>