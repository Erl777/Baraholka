<template>
  <ul>

    <li v-for="item in arr" :key="item">

      <input
        :id="item"
        type="checkbox"
        :value="item"
        v-model="choosenVariants"
      >

      <label
        :for="item">
        {{item}}
      </label>

    </li>

  </ul>
</template>

<script>
    export default {
        name: "CheckboxCustom",
        props: {
            arr: {
                type: Array
            }
        },
        data(){
            return{
              choosenVariants: []
            }
        },
        watch: {
          choosenVariants: {
            deep: true,

            handler(){
              this.$emit('input', this.choosenVariants)
            }
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
  li{
    list-style-type: none;
  }
</style>
