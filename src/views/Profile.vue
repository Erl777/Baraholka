<template>
  <div>

<!--    Loader-->

    <h1>Profile</h1>
    <nav class="profile-nav">
      <router-link to="/profile/add">Добавить объявление</router-link>
      <router-link to="/profile/archive">Archive</router-link>
      <router-link to="/profile/favourite">Favourite</router-link>
      <router-link to="/profile/posts">Posts</router-link>
      <router-link to="/profile/post/1/edit">Edit</router-link>
      <router-link to="/profile/settings">Settings</router-link>
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
  }
</style>