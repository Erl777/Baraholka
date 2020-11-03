<template>
  <div>
    <h1>Настройки пользователя</h1>

    <Loader v-if="loading" />

    <form @submit.prevent="submitHandler" v-else class="form">
      <p class="title">Ваше имя ( оно будет отображаться в объявлениях )</p>
      <input :value="currentUser.name" @change=" formData.name = $event.target.value "  type="text">

      <p class="title">Email</p>
      <input :value="currentUser.id" @change=" formData.email = $event.target.value "  type="email">

      <p class="title">Изменить пароль:</p>
      <label>
        Старый пароль
        <input v-model="oldPass" type="text">
      </label>
      <label >
        Новый пароль
        <input v-model="formData.newPass" type="text">
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
      formData: {
        name: '',
        email: '',
        newPass: ''
      },
      oldPass: '',
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'getUser'
    })
  },
  methods: {
    submitHandler(){

        console.log(this.formData);

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