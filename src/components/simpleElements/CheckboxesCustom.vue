<template>
  <ul>

    <li v-for="item in value" :key="item.name">

      <input
        :id="item.name"
        type="checkbox"
        v-model="checkedItemsNames"
        :value="item.value"
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
        data() {
            return {
               checkedItemsNames: []
            }
        },
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
            checkedItemsNames: {
                deep: true,
                immediate: true,

                handler(){
                  this.$emit('variantsChange', this.checkedItemsNames)
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
