<template>

    <div class="pagination">

        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1,totalpages)">上一页</button>
        <button :class="{active:pageNo==1}" @click="$emit('getPageNo',1)">1</button>
        <button v-show="!(startNumAndEndNum.start==1)">···</button>

        <button v-for="(page,index) in continues" :key="index"
            v-if="(!(startNumAndEndNum.start+index==1||startNumAndEndNum.start+index==31))"
            :class="{active:pageNo==startNumAndEndNum.start+index}"
            @click="$emit('getPageNo',startNumAndEndNum.start+index)">{{startNumAndEndNum.start+index}}</button>
        <button v-show="!(startNumAndEndNum.end== totalpages)">···</button>
        <button v-show="!(startNumAndEndNum.end== totalpages)" :class="{active:pageNo==totalpages}"
            @click="$emit('getPageNo',totalpages)">{{totalpages}}</button>
        <button :disabled="pageNo==totalpages" @click="$emit('getPageNo',pageNo+1)"> 下一页</button>
        <button style="margin-left: 30px">共{{total}}条</button>

    </div>

</template>

<script>
    export default {
        name: 'Pagination',
        props: ['pageNo', 'pageSize', 'total', 'continues'],

        data() {
            return {


            };
        },

        mounted() {

        },
        computed: {
            totalpages() {
                return Math.ceil(this.total / this.pageSize)
            },
            startNumAndEndNum() {
                const { continues, pageNo, totalpages } = this;
                let start = 0, end = 0;
                if (continues > totalpages) {
                    start = 1;
                    end = totalpages
                } else {
                    start = pageNo - parseInt(continues / 2)
                    end = pageNo + parseInt(continues / 2)
                    if (start < 1) {
                        start = 1;
                        end = continues

                    } else if (end > totalpages) {
                        end = totalpages;
                        start = totalpages - continues + 1
                    }

                }

                return { start, end }
            },

        },

        methods: {

        },
    };
</script>
<style lang="less" scoped>
    .pagination {
        text-align: center;

        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>