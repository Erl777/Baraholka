<template>
  <div>
    <h1>Добавить объявление</h1>

    <form class="form">

      <p class="title">Заголовок</p>
      <input v-model="formData.title" @click="titleError = false" type="text">
      <p v-if="titleError" class="error">У товара должен быть заголовок</p>

      <p class="title">Цена ( руб. )</p>
      <input @click="priceError = false" v-model="formData.price" type="text">
      <p v-if="priceError" class="error">Цена должна быть больше 0</p>

      <p class="title">Рубрика</p>
      <select @click="rubricError = false" v-model="formData.rubric">
        <option> Одежда </option>
        <option> Электроника </option>
        <option> Мебель </option>
        <option> Другое </option>
      </select>
      <p v-if="rubricError" class="error">Выберите рубрику</p>

      <p class="title">Описание</p>
      <textarea v-model="formData.description" @click="descriptionError = false" cols="30" rows="10"></textarea>
      <p v-if="descriptionError" class="error">Товару необходимо описание</p>

      <p class="title">Изображения:</p>
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
        <input v-model="formData.firstPhoneNumber"
               @click="phoneError = false"
               type="text"
               placeholder="071">
        <span @click="showSecondPhoneNumber = !showSecondPhoneNumber" class="showSecondPhoneNumber">
          Еще один номер
        </span>
        <div class="secondPhoneNumberContainer">
          <input v-model="formData.secondPhoneNumber"
                 v-if="showSecondPhoneNumber" type="text">
        </div>
        <p v-if="phoneError" class="error">Необходим ваш номер телефона</p>
      </div>

      <div class="buttons">
        <button type="button" @click.prevent="cancel" class="cancel">Отмена</button>
        <button type="submit" class="send" @click.prevent="sendRequest">Добавить</button>
      </div>

    </form>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
export default {
  name: "AddPost",
  data(){
    return{
      formData: {
        rubric: '',
        postId: 0,
        title: '',
        price: 0,
        description: '',
        author: '',
        created: "",
        views: "0",
        active: true,
        loadedImages: [],
        firstPhoneNumber: '',
        secondPhoneNumber: '',
        //deactivateDate: '' можно было бы добавлять дату деактивации
      },
      showSecondPhoneNumber: false,
      titleError: false,
      priceError: false,
      rubricError: false,
      descriptionError: false,
      imgError: false,
      phoneError: false,
      preloadedImages: []
    }
  },
  methods:{
    imagesAddHandler(e){
      // console.log(e.target.files);
      // this.formData.loadedImages = e.target.files;
      let files = e.target.files;
      this.preloadedImages = e.target.files;
      // console.log(JSON.stringify(this.formData.loadedImages));
      for(var i = 0; i < files.length; i++){
        //console.log(files[i].name);
        let file = {
          'lastMod'    : files[i].lastModified,
          'lastModDate': files[i].lastModifiedDate,
          'name'       : files[i].name,
          'size'       : files[i].size,
          'type'	   : files[i].type,
        };
        //add the file obj to your array
        this.formData.loadedImages.push(file);
      }
      console.log(this.formData.loadedImages);
      // console.log(JSON.stringify(this.formData.loadedImages));
    },
    validateForm(){
      if(this.formData.title.length === 0) this.titleError = true;
      else if(this.formData.price.length === 0 || parseInt(this.formData.price) === 0) this.priceError = true;
      else if(this.formData.rubric.length === 0) this.rubricError = true;
      else if(this.formData.description.length === 0) this.descriptionError = true;
      else if(this.formData.loadedImages.length === 0) this.imgError = true;
      else if(this.formData.firstPhoneNumber.length === 0) this.phoneError = true;
      else return true;
    },
    async sendRequest(){
      if(this.validateForm()){
        await this.$store.dispatch('getPosts');
        this.formData.postId = this.allPosts.length + 1;
        this.formData.created = Date.now();
        this.formData.author = this.currentUser.id;
        this.formData.loadedImages = JSON.stringify(this.formData.loadedImages);
        console.log('send');
        console.log(this.formData);
        await this.$store.dispatch('addPost', this.formData);
        await this.$store.dispatch('getPosts');
        await this.$router.push('/profile/posts');
      }
    },
    cancel(){
      if(confirm('Вы точно хотите отменить создание объявления? ')){
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
    })
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