<template>
  <div>
    <input
      v-on="listeners"
      :id="id"
      type="radio"
      :name="name"
      :value="inputValue"
    >
    <label :for="id">{{title}}</label>
  </div>
</template>

<script>
    export default {
        name: "RadioCustom",
        props: {
          name: {
              type: String
          },
          inputValue: {
              type: [String, Number]
          },
          title: {
              type: String
          },
          id: {
              type: [String, Number]
          }
        },
        data(){
            return {

            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => this.$emit('input', event.target.value),
                };
            },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
</style>
