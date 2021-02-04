<template>
  <ul>
    <li>
      <input id="c1" type="checkbox">
      <label for="c1">Checkbox</label>
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

            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
</style>
