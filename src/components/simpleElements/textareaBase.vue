<template>
    <label>
      {{label}}
      <textarea
        v-on="listeners"
        placeholder="прям тут"
      >

      </textarea>
    </label>
</template>

<script>
export default {
  name: "textareaBase",
  props: {
    label: {
      type: String,
      default: 'Введите что-то в поле ниже'
    }
  },
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
  label{
    display: flex;
    flex-direction: column;
  }
  textarea{
    width: 200px;
    height: 100px;
    max-width: 200px;
    resize: none;
    margin: 0 auto;
  }
</style>
