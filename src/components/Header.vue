<template>
  <div class="nav">
    <router-link :to="{ name: 'Home'}">Главная</router-link>
    <div v-if="token">
      <a href="#" v-if="this.$route.path.includes('profile')" @click.prevent="logout">Выйти</a>
      <router-link v-else to="/profile">Личный кабинет</router-link>
    </div>
    <router-link v-else :to="{name: 'Login'}">Войти</router-link>

  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.commit('clearToken');
      this.$store.commit('clearUserFromStore');
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  computed: {
    token(){
      return this.$store.state.token;
    },
  }
}
</script>

<style scoped lang="scss">
  .nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    max-width: 100%;
    background-color: #eeeeee;
    border-radius: 0 0 10px 10px;
    margin: 0 auto;
  }
</style>