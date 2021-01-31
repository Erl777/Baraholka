<template>
  <label >
    {{title}}
    <input :type="type" v-on="listeners">
  </label>
</template>

<script>
    export default {
        name: "InputCustom",
        props: {
            title: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
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

<style scoped>

</style>
