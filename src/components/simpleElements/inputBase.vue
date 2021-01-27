<template>
  <input
    type="password"
    v-bind="$props"
    v-on="listeners"
  >
</template>

<script>
export default {
  name: 'inputBase',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    className: {
      type: String,
      default: 'test-class-name',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        blur: event => this.$emit('blur', event.target.value),
        input: event => this.$emit('input', event.target.value),
      };
    },
  },
};
</script>

<style scoped>

</style>
