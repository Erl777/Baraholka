<template>
  <div>
    <h1>Редактированние</h1>

    <Loader v-if="loading" />

    <form v-else class="form">

      <p class="title">Заголовок</p>
      <input :value="currentPost.title" @click="titleError = false" ref="title" type="text">
      <p v-if="titleError" class="error">У товара должен быть заголовок</p>

      <p class="title">Цена ( руб. )</p>
      <input @click="priceError = false" :value="currentPost.price" ref="price" type="text">
      <p v-if="priceError" class="error">Цена должна быть больше 0</p>

      <p class="title">Рубрика</p>
      <select @click="rubricError = false" :value="currentPost.rubric" ref="rubric">
        <option> Одежда </option>
        <option> Электроника </option>
        <option> Мебель </option>
        <option> Другое </option>
      </select>
      <p v-if="rubricError" class="error">Выберите рубрику</p>

      <p class="title">Описание</p>
      <textarea :value="currentPost.description" @click="descriptionError = false" cols="30" rows="10" placeholder="описание товара" ref="description"></textarea>
      <p v-if="descriptionError" class="error">Товару необходимо описание</p>

      <p class="title">Изображения:</p>
      <div v-if="!(userImagesPreload.length > 0)" class="img-container">
        <img v-for="(src, index) in currentPost.img " :src="src" :key="index" class="preload-img" alt="">
      </div>
      <div v-if="userImagesPreload.length > 0" class="img-container">
        <img
                v-for="(url, index ) in userImagesPreload"
                :src="url"
                :key="index"
                alt=""
                class="preload-img">
      </div>
      <input type="file" @change="imagesAddHandler" multiple>
      <p v-if="imgError && userImagesPreload.length === 0" class="error">Нужно добавить хотябы одно фото</p>

      <p class="title">Номер телефона:</p>
      <div class="phoneBlock">
        <input :value="currentPost.firstPhoneNumber"
               @click="phoneError = false"
               ref="firstPhoneNumber"
               type="text"
               placeholder="071">
        <span @click="showSecondPhoneNumber = !showSecondPhoneNumber" class="showSecondPhoneNumber">
          Еще один номер
        </span>
        <div class="secondPhoneNumberContainer">
          <input :value="currentPost.secondPhoneNumber"
                 v-if="showSecondPhoneNumber"
                 ref="secondPhoneNumber"
                 type="text">
        </div>
        <p v-if="phoneError" class="error">Необходим ваш номер телефона</p>
      </div>

      <div class="buttons">
        <button type="button" @click.prevent="cancel" class="cancel">Отмена</button>
        <button type="submit" class="send" @click.prevent="sendRequest">Обновить</button>
      </div>

    </form>

  </div>
</template>

<script>
  import { mapGetters} from "vuex";
  import Loader from "../../components/Loader";

export default {
  name: "PostEdit",
  components: {Loader},
  data(){
    return{
      formData: {},
      loading: true,
      showSecondPhoneNumber: false,
      titleError: false,
      priceError: false,
      rubricError: false,
      descriptionError: false,
      imgError: false,
      phoneError: false,
      preloadedImages: [],
      currentPost: null
    }
  },
  methods:{
    imagesAddHandler(e){
      let files = e.target.files;
      this.preloadedImages = e.target.files;
      // меняю тип со строки на массив, чтобы можно было добавить данные о изображениях
      this.formData.img = [];
      for(var i = 0; i < files.length; i++){
        let file = {
          'lastMod'    : files[i].lastModified,
          'lastModDate': files[i].lastModifiedDate,
          'name'       : files[i].name,
          'size'       : files[i].size,
          'type'	   : files[i].type,
        };

        this.formData.img.push(file);
      }
      console.log(this.formData.img);

    },
    validateForm(){
      if(this.$refs.title.value.length === 0) this.titleError = true;
      else if(this.$refs.price.value.length === 0 || parseInt(this.formData.price) === 0) this.priceError = true;
      else if(this.$refs.rubric.value.length === 0) this.rubricError = true;
      else if(this.$refs.description.value.length === 0) this.descriptionError = true;
      // else if(this.formData.img.length === 0) this.imgError = true;
      else if(this.$refs.firstPhoneNumber.value.length === 0) this.phoneError = true;
      else return true;

    },
    async sendRequest(){
      if(this.validateForm()){
        this.addNewData();
        console.log('send');
        console.log(this.formData);
        await this.$store.dispatch('editPost', this.formData);
        this.loading = true;
        await this.$store.dispatch('getPosts');
        this.loading = false;
      }
    },
    addNewData(){
      this.formData.postId = this.currentPost.postId;
      if(this.currentPost.title !== this.$refs.title.value) this.formData.title = this.$refs.title.value;
      if(this.currentPost.price !== this.$refs.price.value) this.formData.price = this.$refs.price.value;
      if(this.currentPost.rubric !== this.$refs.rubric.value) this.formData.rubric = this.$refs.rubric.value;
      if(this.currentPost.description !== this.$refs.description.value) this.formData.description = this.$refs.description.value;
      if(this.currentPost.firstPhoneNumber !== this.$refs.firstPhoneNumber.value) this.formData.firstPhoneNumber = this.$refs.firstPhoneNumber.value;
      if(this.$refs.secondPhoneNumber !== undefined) {
        if(this.currentPost.secondPhoneNumber !== this.$refs.secondPhoneNumber.value){
          this.formData.secondPhoneNumber = this.$refs.secondPhoneNumber.value;
        }
      }
      if(this.formData.img === undefined) {
        this.formData.img = null
      }
      else {
        this.formData.img = JSON.stringify(this.formData.img);
      }
    },
    cancel(){
      if(confirm('Вы точно хотите отменить редактированние объявления? ')){
        this.$router.push('/profile/posts')
      }
    }
  },
  computed: {
    userImagesPreload(){
      if(this.preloadedImages.length > 0 ){
        let arr = [];
        this.preloadedImages.forEach(el => arr.push(window.URL.createObjectURL(el)));
        return arr;
      }
      else {
        return  [];
      }
    },
    ...mapGetters({
      currentUser: 'getUser',
      allPosts: 'getPosts'
    }),
  },
  async beforeMount() {
    await this.$store.dispatch('getPosts');
    this.currentPost = this.allPosts.filter(el => el.postId === this.$route.params.id)[0];
    this.loading = false;
  }
}
</script>

<style scoped>
  .form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    border-radius: 4px;
    padding: 10px;
  }
  .title{
    text-align: left;
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 10px;
  }
  label{
    display: block;
  }
  textarea{
    resize: none;
  }
  input, select, textarea{
    margin-bottom: 10px;
  }
  .preload-img{
    width: 200px;
    height: 200px;
    margin: 5px;
    object-fit: contain;
  }
  .img-container{
    border: 2px solid #eeeeee;
    border-radius: 4px;
  }
  .error{
    color: red;
    margin-bottom: 10px;
  }
  .showSecondPhoneNumber{
    margin-top: 10px;
  }
  .showSecondPhoneNumber:hover{
    cursor: pointer;
  }
  .secondPhoneNumberContainer{
    display: flex;
  }
</style>