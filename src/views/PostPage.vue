<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else class="singlePost">

      <div class="img-container">
<!--        <img class="img" :src="post.img[0]" alt="">-->
<!--          <div class="slides-container">-->
          <img class="img-small" v-for="(src, index) in post.img " :src="src" :key="index" alt="">
<!--          </div>-->

      </div>

      <div class="info">
          <p class="title">{{post.title}}</p>
          <p class="price">{{post.price | currency}}</p>
          <p class="description">
              {{post.description}}
          </p>
          <p class="author">
              {{post.author}}
          </p>
          <p class="date-create">
              {{post.created | date}}
          </p>
          <span class="post__views" title="Кол-во просмотров">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 488.85 488.85" style="enable-background:new 0 0 488.85 488.85;width: 20px; height: 20px" xml:space="preserve">
              <path d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2
                s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025
                c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3
                C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7
                c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"/>
            </svg>
            {{ post.views }}
          </span>
          <button v-if="!showNumber" @click="showNumber = !showNumber" type="button" class="show-phone-number">Показать номер</button>
          <a v-else class="phone-number" :href="'tel:' + post.firstPhoneNumber">
              {{post.firstPhoneNumber}}
          </a>
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
      showNumber: false
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
      flex-direction: column;
    /*justify-content: center;*/
    /*align-items: center;*/
    width: 30%;
    max-width: 30%;
  }
  /*.slides-container{*/
  /*    display: flex;*/
  /*    justify-content: flex-start;*/
  /*    flex-wrap: wrap;*/
  /*    img{*/
  /*        */
  /*    }*/
  /*}*/
  .img{
      max-width: 100%;
  }
  .title, .price, .description{
      text-align: left;
  }
  .post__views{
      /*position: absolute;*/
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
    .img-small{
        max-width: 25%;
        object-fit: cover;
        &:first-child{
            width: 100%;
            max-width: 100%;
        }
        &:hover{
            cursor: pointer;
        }
    }
</style>