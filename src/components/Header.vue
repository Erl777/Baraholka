<template>
  <div class="nav">
    <router-link :to="{ name: 'Home'}">Main</router-link>
    <router-link :to="{name: 'Login'}">Login</router-link>
  </div>
</template>

<script>
export default {
name: "Header"
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