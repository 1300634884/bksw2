<template>
    <el-card>
        <el-form :inline="true" :disabled=scene>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change='categoryStore.getC2()'>
                    <el-option v-for="(C1, index) in categoryStore.C1names" :key="C1.id" :label="C1.name"
                        :value="C1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change='categoryStore.getC3()'>
                    <el-option v-for="(C2, index) in categoryStore.C2names" :key="C2.id" :label="C2.name"
                        :value="C2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id">
                    <el-option v-for="(C3, index) in categoryStore.C3names" :key="C3.id" :label="C3.name"
                        :value="C3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script setup lang="ts">

import { onMounted, defineProps } from 'vue';
import useCateGoryStore from '@/store/modules/category'
let categoryStore = useCateGoryStore()

defineProps(['scene'])
onMounted(() => {
    categoryStore.getC1()
})

</script>

<style scoped></style>