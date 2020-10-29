<template>
  <div class="post">

    <div class="post__img-container">
      <img class="post__img" :src="img" alt="">
    </div>

    <div class="info">

      <p class="post__title">
        <router-link :to="{name: 'PostPage', params: {id: postId}}">{{title}}</router-link>
      </p>
      <p class="post__price">
        Цена: {{ price | currency }}
      </p>
      <p class="post__description">
        {{description}}
      </p>
      <p class="post__created" title="Дата создания объявления">
        {{created | date}}
      </p>

    </div>



  </div>
</template>

<script>
export default {
  name: "PostGrid",
  props: ['title', 'price', 'description', 'img', 'postId', 'created'],
}
</script>

<style scoped lang="scss">
  @mixin postBlock{
    padding: 5px;
    border-bottom: 2px solid #e7e7e7;
  }
  .post{
    display: flex;
    box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    border-radius: 4px;
    margin-bottom: 15px;
    .info{
      position: relative;
      width: 70%;
      max-width: 70%;
      padding-bottom: 25px;
    }
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
      //transition: 1.5s linear;
      //&:hover{
      //  transform: scale(1.2);
      //  transition: 1.5s linear;
      //}
    }
    &__img-container{
      @include postBlock;
      width: 30%;
      max-width: 30%;
      align-self: flex-start;
      border-right: 2px solid #e7e7e7;
    }
    &__description{
      padding: 5px;
      text-align: left;
      max-height: 115px;
      overflow: hidden;
      @include postBlock;
    }
    &__created{
      position: absolute;
      right: 10px;
      bottom: 5px;
      &:hover{
        cursor: default
      }
    }
  }
</style>