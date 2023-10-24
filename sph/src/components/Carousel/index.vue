<template>

    <div class="swiper-container" id="floor2Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>

</template>

<script> import Swiper from 'swiper'
    export default {
        name: 'Carousel',
        props: ['list'],
        data() {
            return {

            };
        }, watch: {
            // watch只有在数据变化时候触发，immediate可以让其强制触发一次
            // immediate: true 表示立马监听一次
            list: {
                immediate: true,
                handler() {
                    this.$nextTick(() => {
                        var mySwiper = new Swiper('.swiper-container', {
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination', clickable: true,
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            // 如果需要滚动条
                        })
                    });



                }
            }

        },


        mounted() {

        },

        methods: {

        },
    };
</script>

<style lang="scss" scoped>

</style>