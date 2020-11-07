<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="formSubmit" class="form">
      <label>
        Email
        <input v-model="formData.email"
               @click="showEmailError = false"
               type="email"
               placeholder="Email">
        <span v-if="showEmailError" class="error-message">
          {{emailErrorMessage}}
        </span>
      </label>

      <label >
        Имя
        <input type="text"
               v-model="formData.name"
                placeholder="Ваше имя"
               @click="showNameError = false"
        >
        <span v-if="showNameError" class="error-message">
          Поле имя не должно быть пустым
        </span>
      </label>

      <label>
        Пароль
        <input v-model="formData.password"
               @click="showPasswordError = false"
               type="password"
               placeholder="Пароль">
        <span v-if="showPasswordError" class="error-message">
          {{passwordErrorMessage}}
        </span>
      </label>

      <button type="submit">Зарегестрироваться</button>
<!--      <router-link to="/login"> Вернуться </router-link>-->
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      showEmailError: false,
      showPasswordError: false,
      showNameError: false,
      emailErrorMessage: 'Не валидный email',
      passwordErrorMessage: 'Не валидный пароль',
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async formValidation(){
      let result = true;
      if(this.formData.email === ''){
        this.emailErrorMessage = "Заполните поле email";
        this.showEmailError = true;
        result = false
      }
      if(this.formData.password === ''){
        this.passwordErrorMessage = 'Заполните поле пароль';
        this.showPasswordError = true;
        result = false
      }
      if(this.formData.password.length < 4){
        this.passwordErrorMessage = 'Пароль должен быть больше 4-рех символов';
        this.showPasswordError = true;
        result = false
      }
      if(this.formData.name === ''){
        this.showNameError = true;
        result = false
      }
      if(this.formData.email !== ''){
        const res = await this.checkEmail(this.formData.email);
        if(res !== null){
          result = false;
          this.showEmailError = true;
          this.emailErrorMessage = `Почта ${this.formData.email} занята`
        }
      }
      return result;
    },
    async formSubmit(){


      if(this.formValidation()){

        await this.$store.dispatch('register', this.formData);
        await this.$router.push('/login');

      }
    },
    async checkEmail(id){
      return await this.$store.dispatch('getUserById', id);
    }
  }
}
</script>

<style scoped lang="scss">
  .form{
    min-width: 300px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-shadow: 0 0 12px rgba(77, 77, 77, 0.75);
    border-radius: 4px;
    border: 2px solid #e7e7e7;
  }
  label{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    input{
      margin-top: 10px;
    }
  }
  button{
    margin-top: 20px;
    background-color: #e7e7e7;
    height: 30px;
    padding: 0 20px;
    border-radius: 4px;
  }
  .error-message{
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
</style>