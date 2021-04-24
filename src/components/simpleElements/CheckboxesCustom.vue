<template>
  <ul>

    <li v-for="item in value" :key="item.name">

      <input
        :id="item.name"
        type="checkbox"
        :value="item.value"
        @click="item.checked = !item.checked"
        :checked="item.checked"
      >

      <label
        :for="item.name">
        {{item.name}}
      </label>

    </li>

  </ul>
</template>

<script>
    export default {
        name: "CheckboxesCustom",
        props: {
            value: {
                type: Object,
                default: () => {
                  return {
                    elem:
                      {
                        name: 'Увы, данных нет',
                        value: 'empty'
                      }
                    }
                }
            }
        },
        watch: {
          value: {
            deep: true,
            immediate: true,

            handler(){
              this.$emit('variantsChange', this.value)
            }
          }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
  li{
    list-style-type: none;
  }
</style>
