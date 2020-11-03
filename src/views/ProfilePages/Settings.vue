<template>
  <div>
    <h1>Настройки пользователя</h1>

    <Loader v-if="loading" />

    <form @submit.prevent="submitHandler" v-else class="form">
      <p class="title">Ваше имя ( оно будет отображаться в объявлениях )</p>
      <input ref="name" :value="currentUser.name"  type="text">

      <p class="title">Email</p>
      <input ref="email" :value="currentUser.id"  type="email">

      <p class="title">Изменить пароль:</p>
      <label>
        Старый пароль
        <input v-model="oldPass" @click="passError = false" type="text">
      </label>
      <p class="error" v-if="passError">Пароль введен не верно</p>
      <label >
        Новый пароль
        <input v-model="newPass" type="text">
      </label>
      <button type="submit">Обновить данные</button>
    </form>


  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import Loader from "../../components/Loader";
export default {
  name: "Settings",
  components: {Loader},
  data(){
    return{
      loading: true,
      formData: {},
      oldPass: '',
      newPass: '',
      passError: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'getUser'
    })
  },
  methods: {

    async submitHandler(){
      if(this.validation()){

        if(!isEmpty(this.formData)){
          console.log('не пуст');
          console.log('sended');
          console.log(this.formData);
          // this.loading = true;
          // await this.$store.dispatch('getUserByToken', this.$store.state.token);
          // this.loading = false;
        }
        else {
          alert("Данные не изменены");
        }

      }


      function isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      }

    },

    validation(){
      if(this.currentUser.name !== this.$refs.name.value) this.formData.name = this.$refs.name.value;
      if(this.currentUser.id !== this.$refs.email.value) this.formData.email = this.$refs.email.value;
      if(this.oldPass.length > 0 && this.newPass.length > 0){
        if(this.oldPass !== this.currentUser.password){
          this.passError = true;
          return false;
        }
        else {
          this.formData.newPass = this.newPass;
        }
      }
      return true;
    }

  },
  async beforeMount() {
    await this.$store.dispatch('getUserByToken', this.$store.state.token);
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
  input{
    margin-bottom: 10px;
  }
  .error{
    color: red;
    margin-bottom: 10px;
  }
</style>