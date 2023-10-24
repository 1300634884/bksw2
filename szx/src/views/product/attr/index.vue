<template>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0;">
        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                @click="addAttr">添加属性</el-button>
            <el-table style="width: 100%; margin:10px 0;" :data=attrArr border>
                <el-table-column prop="id" label="序号" width="50px" type="index" />
                <el-table-column prop="attrName" label="属性名称" width="200px" />
                <el-table-column label="属性值名称">
                    <template #='{ row }'>
                        <el-tag v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #='{ row, $index }'>
                        <el-button type="warning" icon="Edit" @con="updateAttr(row)"></el-button>
                        <el-popconfirm :title="`你确定删除${row.attrName}`" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene == 1">
            <el-form>
                <el-form-item label="属性名称">
                    <el-input style="width: 300px;" placeholder="请输入属性的名称 " v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button :icon="Plus" type="primary" :disabled="!attrParams.attrName" @click="addAttrValue">
                添加属性值</el-button>
            <el-button @click="cancel">取消</el-button>
            <el-table style="width: 100%; margin:10px 0;" :data=attrParams.attrValueList border>
                <el-table-column prop="id" label="序号" width="50px" type="index" />
                <el-table-column label="属性值">
                    <!-- 此处row类似v-for中item 为每个对象 -->
                    <template #='{ row, $index }'>
                        <el-input v-if="row.flag" :ref="(vc: any) => inputArr[$index] = vc" placeholder="请输入属性值"
                            v-model="row.valueName" @blur="toLook(row, $index)"></el-input>
                        <div v-else @click="toEdit(row, $index)" width="100%">{{ row.valueName }}
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #='{ row, $index }'>
                        <el-button icon="Delete" type="danger"
                            @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                    </template>

                </el-table-column>

            </el-table>
            <el-button type="primary" @click="save"
                :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>

    </el-card>
</template>

<script setup lang="ts">

import useCateGoryStore from '@/store/modules/category.ts'
import { Plus } from '@element-plus/icons-vue'
import { watch, ref, onBeforeUnmount } from 'vue';
import { reqattr, addOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import { reqAttr, CategoryData } from '@/api/product/attr/type.ts'
import { reactive, nextTick } from 'vue';
import { ElMessage, } from 'element-plus'

let inputArr = ref([])
let attrArr = ref([])
let categoryStore = useCateGoryStore()
let scene = ref<number>(0)

let attrParams = reactive<CategoryData>({
    attrName: "",
    attrValueList: [
    ],
    categoryId: 0,
    categoryLevel: 3,
})
const deleteAttr = async (attrId) => {
    let result = await reqRemoveAttr(attrId)
    attrs()
    if (result.code == 200) {
        ElMessage.success("删除成功")
        return 'ok'
    } else {
        return Promise.reject(new Error('删除失败'))
    }

}
const toEdit = (row, $index) => {
    row.flag = true
    nextTick(() => {
        inputArr.value[$index].focus()
    })

}
onBeforeUnmount(() => {
    categoryStore.$reset()
})
const hander = () => {
}
const toLook = (row, $index) => {
    if (row.valueName.trim() == "") {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: "属性值不能为空"
        })
        return;
    }
    attrParams.attrValueList.find(item => {
        if (item != row) {
            if (item.valueName == row.valueName) {
                ElMessage({
                    type: 'error',
                    message: "属性值不能重复"
                })
                attrParams.attrValueList.splice($index, 1)
            }
        }
    })
    row.flag = false

}
const addAttrValue = () => {
    attrParams.categoryId = categoryStore.c3Id
    attrParams.attrValueList.push({
        valueName: "",
        flag: true,
    })
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}
const save = async () => {
    let result = await addOrUpdateAttr(attrParams)
    if (result.code == 200) {
        attrArr.value = []
        attrs()
        scene.value = 0,
            ElMessage(
                {
                    type: 'success', message: '保存成功'
                }
            )
        Object.assign(attrParams, {
            attrName: "",
            attrValueList: [
            ],
            categoryId: 0,
            categoryLevel: 3,
        })
        return "ok"
    } else {
        attrArr.value = []
        attrs()
        Object.assign(attrParams, {
            attrName: "",
            attrValueList: [
            ],
            categoryId: 0,
            categoryLevel: 3,
        })
        ElMessage({

            type: 'error', message: '保存失败'
        })
    }
}
watch(() => categoryStore.c3Id, () => {
    attrArr.value = []
    if (categoryStore.c3Id) { attrs() }
})
const addAttr = () => {
    scene.value = 1
}
const attrs = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    // 因为解构非响应式,所以每次使用前解构
    let result: reqAttr = await reqattr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data
        return 'ok'
    } else {
        return Promise.reject(new Error('请求失败'))
    }
}
const updateAttr = (row) => {
    scene.value = 1
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))

}
const cancel = () => {
    attrs()
    scene.value = 0
    Object.assign(attrParams, {
        attrName: "",
        attrValueList: [
        ],
        categoryId: 0,
        categoryLevel: 3,
    })
}


</script>

<style scoped></style>