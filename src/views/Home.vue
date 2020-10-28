<template>
  <div class="home">

    <PostsActions @changeSearchName="searchByName" />

    <div class="posts-container">

        <Loader v-if="loading" />

        <PostGrid v-else v-for="(post, index ) in posts"
                  :title="post.title"
                  :price="post.price"
                  :description="post.description"
                  :img="post.img"
                  :postId="post.postId"
                  :key="index"
        />

    </div>


  </div>
</template>

<script>
import Loader from "../components/Loader";
import PostGrid from "@/components/PostGrid";
import PostsActions from "../components/PostsActions";
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  components: {
    PostGrid,
      Loader,
      PostsActions
  },
    data(){
      return{
        allPosts: [],
        loading: true,
        filterArgument: '',
      }
    },
    async beforeMount(){
        this.allPosts = await this.$store.dispatch('getPosts');
        this.loading = false;
    },
    computed: {
      posts(){
          return this.allPosts;
          // return this.allPosts.filter(item => item.price > this.filterArgument );
      },
        ...mapGetters({
            storePosts: 'getPosts'
        })
    },
    methods: {
        searchByName(name){
            console.log(name);
        }
    }
}
</script>

<style scoped>
  .posts-container{
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 15px;
    row-gap: 15px;
  }
</style>
