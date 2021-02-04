<template>
  <div>
    <label>
      {{label}}
      <input v-on="listeners" type="checkbox">
    </label>
  </div>
</template>

<script>
    export default {
        name: "CheckboxCustom",
        props: {
            value: {
                default: false,
            },
            label: {
                type: String
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => this.$emit('input', event.target.checked),
                };
            },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/customElementsStyles";
</style>
