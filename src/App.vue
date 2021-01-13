<template>
  <div id="app">
    <Header />

    <router-view/>

  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
}

p{
  margin: 0;
}

a{
  color: #2c3e50;
  text-decoration: none;
}

button{
  outline: none;
  border: none;
  background-color: unset;
  &:hover{
    cursor: pointer;
  }
}

body{
  padding: 0;
  max-width: 80%;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Header from "@/components/Header";
  export default {
    name: 'App',
    components:{
      Header
    },
    computed: {
    }
  }
</script>
