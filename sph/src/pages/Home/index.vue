<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Floor v-for="(floor,index) in floorList " :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>


    </div>
</template>

<script>
    import SearchSelector from '@/pages/Search/SearchSelector/SearchSelector'
    import { mapState } from 'vuex'
    import Floor from '@/pages/Home/Floor'
    import Brand from '@/pages/Home/Brand'
    import Like from '@/pages/Home/Like'
    import Rank from '@/pages/Home/Rank'
    import Recommend from '@/pages/Home/Recommend'
    import ListContainer from '@/pages/Home/ListContainer'
    export default {
        name: 'Home',
        components: {
            ListContainer, Recommend, Rank, Like, Brand, Floor, SearchSelector
        },
        data() {
            return {


            };
        },

        mounted() {
            this.$store.dispatch('floorList')
            this.$store.state.user.token && this.$store.dispatch('getUserInfo')

        },

        methods: {



        },
        computed: {
            ...mapState({
                floorList: (state) => {
                    return state.home.floorList
                },

            })
        }
    };
</script>

<style lang="scss" scoped>

</style>