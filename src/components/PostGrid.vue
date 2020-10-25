<template>
  <div class="post">
    <p class="post__title">
      Заголовок объявления
<!--      <router-link to="/page/id"/>-->
    </p>
    <p class="post__price">
      Цена: 1000
    </p>
    <div class="post__img-container">
      <img class="post__img" src="../assets/logo.png" alt="">
    </div>
    <p class="post__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </p>
  </div>
</template>

<script>
export default {
  name: "PostGrid"
}
</script>

<style scoped lang="scss">
  @mixin postBlock{
    padding: 5px;
    border-bottom: 2px solid #e7e7e7;
  }
  .post{
    width: 32.2%;
    box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    border-radius: 4px;
    margin-bottom: 20px;
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
      @include postBlock
    }
    &__description{
      padding: 5px;
      text-align: left;
      max-height: 115px;
      overflow: hidden;
    }
  }
</style>