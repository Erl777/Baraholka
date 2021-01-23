<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="value"
    :name="name"
    @input="emitData({val: $event.target.value, inputKey})"
  >
</template>

<script>
    export default {
        name: "inputBase",
        props: {
            value: {
                type: [Number, String],
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            inputKey: {
                type: String,
                default: ''
            }
        },
        methods: {
            emitData(data){
                let {val, inputKey: key} = data;
                this.$emit('getInputValue', {val, key})
            }
        }
    }
</script>

<style scoped>

</style>
