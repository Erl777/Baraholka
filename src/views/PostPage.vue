<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else class="singlePost">

      <div class="img-container">
        <img class="img" :src="post.img" alt="">
      </div>

      <div class="info">
          <p class="title">{{post.title}}</p>
          <p class="price">{{post.price | currency}}</p>
          <p class="description">
              {{post.description}}
          </p>
      </div>

    </div>

  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  name: "PostPage",
  data(){
    return{
      singlePost: null,
      loading: true,
    }
  },
  components:{
    Loader
  },
  async beforeMount() {
      this.singlePost = await this.$store.dispatch('getPost', this.$route.params.id);
      this.loading = false
  },
  computed: {
      post(){
          return this.singlePost;
      },
  }
}
</script>

<style scoped lang="scss">
  .singlePost{
    display: flex;
  }
  .info{
      width: 70%;
      max-width: 70%;
  }
  .img-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    max-width: 30%;
  }
  .img{
      max-width: 100%;
  }
    .title, .price, .description{
        text-align: left;
    }
</style>