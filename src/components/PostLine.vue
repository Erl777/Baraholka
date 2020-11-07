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

      <div class="buttons" v-if="deactivate || deletePost">
        <button v-if="activate" @click.prevent="activatePostHandler" type="button" class="activate">Активировать</button>
        <button v-if="deactivate" @click.prevent="deactivatePostHandler" type="button" class="deactivate">Деактивировать</button>
        <button v-if="deletePost" @click.prevent="deletePostHandler" type="button" class="delete">Удалить</button>
      </div>

      <router-link :to="{name: 'PostEdit', params: {id: postId}}"
                   class="post__redacting"
                   v-if="redacting" title="Редактировать">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 469.336 469.336" style="enable-background:new 0 0 469.336 469.336;width: 20px; height: 20px" xml:space="preserve">
          <path d="M456.836,76.168l-64-64.054c-16.125-16.139-44.177-16.17-60.365,0.031L45.763,301.682
            c-1.271,1.282-2.188,2.857-2.688,4.587L0.409,455.73c-1.063,3.722-0.021,7.736,2.719,10.478c2.031,2.033,4.75,3.128,7.542,3.128
            c0.979,0,1.969-0.136,2.927-0.407l149.333-42.703c1.729-0.5,3.302-1.418,4.583-2.69l289.323-286.983
            c8.063-8.069,12.5-18.787,12.5-30.192S464.899,84.237,456.836,76.168z M285.989,89.737l39.264,39.264L120.257,333.998
            l-14.712-29.434c-1.813-3.615-5.5-5.896-9.542-5.896H78.921L285.989,89.737z M26.201,443.137L40.095,394.5l34.742,34.742
            L26.201,443.137z M149.336,407.96l-51.035,14.579l-51.503-51.503l14.579-51.035h28.031l18.385,36.771
            c1.031,2.063,2.708,3.74,4.771,4.771l36.771,18.385V407.96z M170.67,390.417v-17.082c0-4.042-2.281-7.729-5.896-9.542
            l-29.434-14.712l204.996-204.996l39.264,39.264L170.67,390.417z M441.784,121.72l-47.033,46.613l-93.747-93.747l46.582-47.001
            c8.063-8.063,22.104-8.063,30.167,0l64,64c4.031,4.031,6.25,9.385,6.25,15.083S445.784,117.72,441.784,121.72z"/>
        </svg>
      </router-link>

      <span class="post__views" title="Кол-во просмотров">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 488.85 488.85" style="enable-background:new 0 0 488.85 488.85;width: 20px; height: 20px" xml:space="preserve">
          <path d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2
            s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025
            c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3
            C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7
            c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"/>
        </svg>
        {{ views }}
      </span>

    </div>



  </div>
</template>

<script>
export default {
  name: "PostGrid",
  props: {
    title: String,
    price: String,
    description: String,
    img: String,
    postId: String,
    created: String,
    redacting: {
      type: Boolean,
      default: false
    },
    views: [String, Number],
    deactivate: {
      type: Boolean,
      default: false
    },
    activate: {
      type: Boolean,
      default: false
    },
    deletePost: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    async deletePostHandler(){
      if(confirm(`Вы действительно хотите удалить ${this.title}? Это действие нельзя будет отменить!`)){
        console.log(`Удаляю пост ${this.title}`)
        await this.$store.dispatch('deletePost', this.postId);
        // loading
        await this.$store.dispatch('getPosts');
      }
    },
    async deactivatePostHandler(){
      if(confirm(`Вы действительно хотите деактивировать ${this.title}? Объявление будет скрыто от других пользователей и перемещенно в арихив`)){
        console.log(this.postId);
        await this.$store.dispatch('deactivatePost', this.postId);
        this.reloadPosts();
      }
    },
    async activatePostHandler(){
      if(confirm(`Вы действительно хотите активировать ${this.title}? Объявление будет скрыто от других пользователей и перемещенно в арихив`)){
        console.log(this.postId);
        await this.$store.dispatch('activatePost', this.postId);
        this.reloadPosts();
      }
    },
    async reloadPosts(){
      await this.$store.dispatch('getPosts');
    }
  }
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
      display: flex;
      flex-direction: column;
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
    &__redacting{
      position: absolute;
      right: 3px;
      top: 3px;
      &:hover{
        cursor: pointer;
      }
    }
    &__views{
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 15px;
      left: 7px;
      bottom: 3px;
      &:hover{
        cursor: default;
      }
      svg{
        margin-right: 5px;
      }
    }
  }
  .buttons{
    margin-top: auto;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    button{
      /*background-color: #eeeeee;*/
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
      padding: 5px 10px;
      margin-right: 10px;
      border-radius: 4px;
      box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    }
    .delete{
      background-color: darkred;
    }
    .deactivate{
      background-color: darkorange;
    }
    .activate{
      background-color: green;
    }
  }
</style>