<template>
    <div class="count">
        <div class="top">
            <p class="top-left">预约渠道数据统计</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts"> </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.count {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;

    .top {
        height: 80px;
        width: 100%;
        color: white;

        position: relative;

    }

    .charts {
        background-color: #fff;
        height: 250px;
        width: 100%;
    }
}
</style>