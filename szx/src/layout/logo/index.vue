<template>
    <div class="logo" v-if="setting.logoHidden">

        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>

    </div>
</template>

<script setup lang="ts">
import setting from '../../../setting.ts'

</script>
<script lang="ts">
export default {
    name: 'logo'
}

</script>

<style scoped lang="scss">
.logo {
    width: $base-menu-width;
    height: $base-menu-logo-height;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;

    img {

        width: 40px;
        height: 40px;
    }

    p {
        margin-left: 10px;
        font-size: $base-logo-title-fontSize;
        color: white;
    }


}
</style>