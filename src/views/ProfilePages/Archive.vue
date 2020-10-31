<template>
  <div>
    <h1>Архив</h1>

    <Loader v-if="authorPosts.length === 0" />

    <p v-else-if="filteredPosts.length === 0">Объявнений нет</p>

    <PostLine v-else v-for="(post, index ) in filteredPosts"
              :title="post.title"
              :price="post.price"
              :description="post.description"
              :img="post.img"
              :postId="post.postId"
              :created="post.created"
              :redacting="true"
              :views="post.views"
              :delete-post="true"
              :activate="true"
              :key="index"
    />

  </div>
</template>

<script>
  import PostLine from "../../components/PostLine";
  import { mapGetters, mapActions } from 'vuex';
  import Loader from "@/components/Loader";
export default {
  name: "Archive",
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
      return this.authorPosts.filter(el => el.author.includes(this.currentUser.id) ).filter(el => el.active === false);
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