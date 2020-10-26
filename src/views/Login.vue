<template>
  <div>
    <h1>Login</h1>
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

      <button type="submit">Войти</button>
      <router-link to="/register">Еще не зарегестрированны?</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      showEmailError: false,
      showPasswordError: false,
      emailErrorMessage: 'Не валидный email',
      passwordErrorMessage: 'Не валидный пароль',
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    formValidation(){
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
        this.passwordErrorMessage = 'Пароль должен быть больше 4рех символов';
        this.showPasswordError = true;
        result = false
      }
      return result;
    },
    async formSubmit(){

      if(this.formValidation()){

        const userData = await this.$store.dispatch('login', this.formData);
        // console.log(userData)
        if(typeof(userData) === 'object'){

          if(userData.data.password === this.formData.password){
            this.setUser(userData.data);
            this.$router.push('/profile')
          }
          else {
            this.passwordErrorMessage = 'Не верный пароль';
            this.showPasswordError = true
          }

        }
        else {
          this.emailErrorMessage = userData;
          this.showEmailError = true
        }

      }
    },
    setUser(data){
      this.$store.commit('setUserToStore', data);
      this.$store.commit('setToken', data.token);
      localStorage.setItem('token', data.token);
      // localStorage.getItem('id')
    }
  }
}
</script>

<style scoped lang="scss">
  .form{
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
    margin-bottom: 10px;
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