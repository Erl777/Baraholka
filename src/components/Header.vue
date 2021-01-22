<template>
  <nav class="nav">
    <router-link to="/">Главная</router-link>
    <template v-if="token">
      <a href="#"
         v-if="this.$route.path.includes('profile')"
         @click.prevent="logout"
      >
        Выйти
      </a>
      <router-link v-else to="/profile">Личный кабинет</router-link>
    </template>

    <router-link v-else :to="{name: 'Login'}">Войти</router-link>
  </nav>
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
    max-width: 100%;
    margin: 0 auto;
    padding: 10px 20px;

    background-color: #eeeeee;
    border-radius: 0 0 10px 10px;
  }
</style>
