<template>
  <div class="nav">
    <router-link :to="{ name: 'Home'}">Main</router-link>
    <router-link v-if="!this.$store.state.token" :to="{name: 'Login'}">Login</router-link>
    <div v-else>
      <a href="#" v-if="!this.$route.path.indexOf('profile')" @click.prevent="logout">Выйти</a>
      <router-link v-else to="/profile">Личный кабинет</router-link>
    </div>

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