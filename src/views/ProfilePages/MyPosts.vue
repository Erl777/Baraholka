<template>
  <div>
    <h1>Мои объявления:</h1>

    <Loader v-if="authorPosts.length === 0" />

    <PostLine v-else v-for="(post, index ) in filteredPosts"
              :title="post.title"
              :price="post.price"
              :description="post.description"
              :img="post.img"
              :postId="post.postId"
              :created="post.created"
              :redacting="true"
              :views="post.views"
              :key="index"
    />
  </div>
</template>

<script>
  import PostLine from "../../components/PostLine";
  import { mapGetters, mapActions } from 'vuex';
  import Loader from "@/components/Loader";
export default {
  name: "MyPosts",
  components: {
    PostLine,
    Loader
  },
  computed: {
    ...mapGetters({
        authorPosts: 'getPosts',
        currentUser: 'getUser'
      }),
    filteredPosts(){
      if(!(this.authorPosts.length > 0)) this.getAllPosts();
      return this.authorPosts.filter(el => el.author.includes(this.currentUser.id) );
    }
  },
  methods: {
    ...mapActions({
      getAllPosts: 'getPosts'
    })
  }
}
</script>

<style scoped>

</style>