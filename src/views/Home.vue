<template>
    <div class="home">

        <PostsActions
                @changeSearchName="searchByName"
                @changeMinPrice="changeMinPrice"
                @changeMaxPrice="changeMaxPrice"
                @changeComponent="changeActiveComponent"
                @changeRubricValue="changeRubric"
                @changeSortingByValue="changeSortingBy"
                :active-component="getComponent"
        />

        <div class="posts-container" :class="{ block : getComponent === 'PostLine' }">

            <Loader v-if="loading"/>

            <component
                    v-else
                    :is="getComponent"
                    v-for="(post, index ) in posts"
                    :title="post.title"
                    :price="post.price"
                    :description="post.description"
                    :img="post.img[0]"
                    :postId="post.postId"
                    :created="post.created"
                    :key="index"
            ></component>

            <p class="empty" v-if="showEmpty"> К сожалению, поиск не дал результатов( </p>

        </div>

    </div>
</template>

<script>
    import Loader from "../components/Loader";
    import PostGrid from "@/components/PostGrid";
    import PostLine from "../components/PostLine";
    import PostsActions from "../components/PostsActions";
    import {mapGetters} from 'vuex';

    export default {
        name: 'Home',
        components: {
            PostGrid,
            Loader,
            PostsActions,
            PostLine
        },
        data() {
            return {
                currentComponent: 'PostGrid',
                allPosts: [],
                loading: true,
                filtering: {
                    name: '',
                    minPrice: 0,
                    maxPrice: null,
                    rubric: '',
                    sortingBy: ''
                },
                firstTime: true,
                showEmpty: false
            }
        },
        async beforeMount() {
            this.allPosts = await this.$store.dispatch('getPosts');
            this.loading = false;
        },
        computed: {
            posts() {
                this.showEmpty = false;
                let filteredRes = [];
                if (this.filtering.name !== '') {
                    filteredRes = this.allPosts.filter(el => el.title.includes(this.filtering.name))
                }
                if (this.filtering.minPrice > 0 && this.filtering.maxPrice === null) {
                    if (filteredRes.length > 0) {
                        filteredRes = filteredRes.filter(el => el.price >= this.filtering.minPrice)
                    } else {
                        filteredRes = this.allPosts.filter(el => el.price >= this.filtering.minPrice)
                    }
                }
                if (this.filtering.minPrice === 0 && this.filtering.maxPrice !== null) {
                    if (filteredRes.length > 0) {
                        filteredRes = filteredRes.filter(el => el.price <= this.filtering.maxPrice)
                    } else {
                        filteredRes = this.allPosts.filter(el => el.price <= this.filtering.maxPrice)
                    }
                }
                if (this.filtering.minPrice > 0 && this.filtering.maxPrice !== null) {
                    if (filteredRes.length > 0) {
                        filteredRes = filteredRes.filter(el => el.price >= this.filtering.minPrice && el.price <= this.filtering.maxPrice)
                    } else {
                        filteredRes = this.allPosts.filter(el => el.price >= this.filtering.minPrice && el.price <= this.filtering.maxPrice)
                    }
                }
                if (this.filtering.rubric !== ''){
                    if(filteredRes.length > 0){
                        filteredRes = filteredRes.filter(el => el.rubric.includes(this.filtering.rubric))
                    }
                    else {
                        filteredRes = this.allPosts.filter(el => el.rubric.includes(this.filtering.rubric))
                    }
                }
                if (this.filtering.sortingBy !== ''){
                    if(filteredRes.length > 0){
                        if(this.filtering.sortingBy === 'Самые дешевые'){
                            filteredRes = filteredRes.sort(function (a, b) {
                                return a.price - b.price;
                            })
                        }
                        if(this.filtering.sortingBy === 'Самые дорогие'){
                            filteredRes = filteredRes.sort(function (a, b) {
                                return a.price - b.price;
                            }).reverse()
                        }

                    }
                    else {
                        if(this.filtering.sortingBy === 'Самые дешевые'){
                            filteredRes = this.allPosts.sort(function (a, b) {
                                return a.price - b.price;
                            })
                        }
                        if(this.filtering.sortingBy === 'Самые дорогие'){
                            filteredRes = this.allPosts.sort(function (a, b) {
                                return a.price - b.price;
                            }).reverse()
                        }
                    }
                }
                if (filteredRes.length === 0 && !this.firstTime) {
                    // тут нужно выводить, что нет постов, если длинна 0
                    console.log('Пусто');
                    this.showEmpty = true;
                }
                if (filteredRes.length === 0 && this.firstTime) {
                    // тут нужно выводить, что нет постов, если длинна 0
                    filteredRes = this.allPosts;
                    this.firstTime = false;
                }
                return filteredRes;
                // return this.allPosts.filter(item => item.price > this.filterArgument );
            },
            ...mapGetters({
                storePosts: 'getPosts'
            }),
            getComponent(){
                return this.currentComponent;
            }
        },
        methods: {
            searchByName(name) {
                this.filtering.name = name;
            },
            changeMinPrice(val) {
                this.filtering.minPrice = parseInt(val);
            },
            changeMaxPrice(val) {
                this.filtering.maxPrice = parseInt(val);
            },
            changeSortingBy(str) {
                this.filtering.sortingBy = str;
            },
            changeRubric(str) {
                this.filtering.rubric = str;
            },
            changeActiveComponent(){
                if(this.currentComponent === 'PostGrid'){
                    this.currentComponent = 'PostLine'
                }
                else {
                    this.currentComponent = 'PostGrid'
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .posts-container {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 15px;
        row-gap: 15px;
        &.block{
            display: block;
        }
    }
    .empty{
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
        font-size: 18px;
        font-weight: 700;
    }
</style>
