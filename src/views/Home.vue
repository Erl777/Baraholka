<template>
  <div class="home">

<!--    Отдельным компонентом-->
    <div class="post-actions">

    </div>

    <PostGrid v-for="post in 6" />
  </div>
</template>

<script>
import PostGrid from "@/components/PostGrid";
export default {
  name: 'Home',
  components: {
    PostGrid
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
