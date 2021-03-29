<template>
  <div>
    <input
      v-on="listeners"
      :id="id"
      type="radio"
      :name="name"
      :value="radio"
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
          radio: {
              type: [Boolean]
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
                    input: event => {
                      this.$emit('input', this.title)
                    },
                };
            },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
</style>
