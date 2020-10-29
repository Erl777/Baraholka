<template>
  <div>

<!--    Loader-->

    <nav class="profile-nav">
      <router-link to="/profile/posts">Мои объявления</router-link>
      <router-link to="/profile/add">Добавить объявление</router-link>
      <router-link to="/profile/archive">Архив</router-link>
      <router-link to="/profile/favourite">Избранное</router-link>
      <router-link to="/profile/post/1/edit">Edit</router-link>
      <router-link to="/profile/settings">Настройки</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>
  .profile-nav{
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
</style>