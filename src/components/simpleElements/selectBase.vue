<template>
  <select
    :name="name"
    :value="value"
    @input="emitData"
  >
    <option
      v-for="item in options"
      :value="item"
    >
      {{item}}
    </option>

  </select>
</template>

<script>
    export default {
        name: "selectBase",
        props: {
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: []
            },
            selectKey: {
                type: String,
                default: ''
            }
        },
        methods: {
            emitData(event){

               this.$emit('input', event.target.value)

            }
        }
    }
</script>

<style scoped>

</style>
