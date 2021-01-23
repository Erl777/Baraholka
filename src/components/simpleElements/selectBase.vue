<template>
  <select
    :name="name"
    :value="value"
    @input="emitData({val: $event.target.value, selectKey})"
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
                type: Array,
                default: []
            },
            selectKey: {
                type: String,
                default: ''
            }
        },
        methods: {
            emitData(data){
                let {val, selectKey: key} = data;
                this.$emit('getSelectValue', {val, key})
            }
        }
    }
</script>

<style scoped>

</style>
