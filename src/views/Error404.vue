<template>
  <div>
    <h1>Error 404</h1>
    <p>Auto redirect after {{secondsLeft}} sec</p>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data(){
    return{
      secondsLeft: 10
    }
  },
  created() {
    setInterval(()=>{
      this.secondsLeft--;
      if(this.secondsLeft === 1){
        this.$router.push('/');
      }
    }, 1000)
  }
}
</script>

<style scoped>

</style>