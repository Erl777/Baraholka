<template>
  <div class="home">

<!--      <Loader>-->

<!--    Отдельным компонентом-->
    <div class="post-actions">

    </div>

      <PostGrid v-for="(post, index ) in posts"
                :title="post.title"
                :price="post.price"
                :description="post.description"
                :img="post.img"
                :key="index"
      />

  </div>
</template>

<script>
import PostGrid from "@/components/PostGrid";
export default {
  name: 'Home',
  components: {
    PostGrid
  },
    data(){
      return{
        allPosts: [],
          loading: true
      }
    },
    async beforeMount(){
      const posts = await this.$store.dispatch('getPosts');
      this.allPosts = posts.data;
    },
    computed: {
      posts(){
          return this.allPosts;
      }
    }
}
</script>

<style scoped>
  .home{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .post-actions{
    width: 100%;
    min-height: 20px;
  }
</style>
