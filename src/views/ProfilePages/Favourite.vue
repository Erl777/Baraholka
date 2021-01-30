<template>
  <div>
    <h1>Избранные</h1>
    <select-custom
      :select-list="arr"
      v-model="valueSelected"
    />
  </div>
</template>

<script>
import SelectCustom from "../../components/simpleElements/SelectCustom";
export default {
  name: "Favourite",
    components: {SelectCustom},
    data(){
      return{
          valueSelected: '4321',
          arr: [ 'Выберите значение' ,'Значение1', 'Значение2', 'Значение3', 'Значение4', 'Значение5']
      }
    },
}
</script>

<style scoped>

</style>
