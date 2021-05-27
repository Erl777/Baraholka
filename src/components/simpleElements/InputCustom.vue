<template>
  <label >
    {{title}}
    <input
      :type="type"
      v-on="listeners"
      :value="value"
      :placeholder="placeholder"
      :min="minValue"
    >
  </label>
</template>

<script>
    export default {
        name: "InputCustom",
        props: {
            value: {
              type: [String, Number],
              default: ''
            },
            title: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            pattern:{
                type: String,
                default: ''
            },
            placeholder: {
              type: String,
              default: ''
            },
            minValue: {
              type: Number,
              default: 0
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

</style>
