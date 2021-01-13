<template>
  <div class="post">
    <p class="post__title">
      <router-link :to="{name: 'PostPage', params: {id: postId}}">{{title}}</router-link>
    </p>
    <p class="post__price">
      Цена: {{ price | currency }}
    </p>
    <div class="post__img-container">
      <img class="post__img" :src="img" alt="">
    </div>
    <p class="post__description">
      {{description}}
    </p>
    <p class="post__created">
      {{created | date}}
    </p>
  </div>
</template>

<script>
export default {
  name: "PostGrid",
  props: {
    'title': String ,
    'price': String,
    'description': String,
    'img': String,
    'postId': String,
    'created': String
  },
}
</script>

<style scoped lang="scss">
  @mixin postBlock{
    padding: 5px;
    border-bottom: 2px solid #e7e7e7;
  }
  .post{
    box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    border-radius: 4px;
    &__title{
      width: 100%;
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      @include postBlock
    }
    &__price{
      text-align: center;
      font-weight: bold;
      @include postBlock
    }
    &__img{
      max-width: 100%;
    }
    &__img-container{
      @include postBlock
    }
    &__description{
      @include postBlock;
      text-align: left;
      max-height: 115px;
      overflow: hidden;
    }
    &__created{
      padding: 5px;
      text-align: right;
    }
  }
</style>