<template>
  <label >
    {{title}}
    <input
      :type="type"
      v-on="listeners"
      :value="value"
    >
  </label>
</template>

<script>
    export default {
        name: "InputCustom",
        props: {
            value: {
              type: String,
              default: '18'
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
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    // input: event => this.$emit('input', event.target.value),
                    input: event => {
                        if(this.type === 'number'){
                            let minValue = 0;
                            let value = event.target.value;
                            value >= minValue ? this.$emit('input', event.target.value) : event.target.value = minValue;
                        }
                        else {
                            this.$emit('input', event.target.value)
                        }
                    } ,
                };
            },
        },
    }
</script>

<style scoped>

</style>
