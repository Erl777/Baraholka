<template>
    <textarea
      v-on="listeners"
      placeholder="прям тут"
    >

    </textarea>
</template>

<script>
export default {
  name: "textareaBase",
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
  }
}
</script>

<style scoped>
  textarea{
    width: 200px;
    height: 100px;
    max-width: 200px;
    resize: none;
    margin: 0 auto;
  }
</style>
