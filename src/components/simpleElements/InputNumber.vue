<template>
  <label >
    {{title}}
    <input
      type="number"
      v-on="listeners"
      :value="value"
      :min="minValue"
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
            minValue: {
              type: Number,
              default: 0
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    // input: event => this.$emit('input', event.target.value),
                    input: event => {
                        let minValue = 0;
                        if(this.checkMinValue(event.target.value, minValue)){
                          let value = this.replaceLiterals(event.target.value);
                          this.$emit('input', value)
                        }
                        else {
                          event.target.value = minValue
                        }
                        console.log(this.checkMinValue(event.target.value, minValue))


                        // this.checkMinValue(value, minValue) ? this.$emit('input', event.target.value) : event.target.value = minValue;
                        // this.$emit('input', event.target.value)
                    } ,
                };
            },
        },
      methods: {
          checkMinValue(val, minVal){
            console.log(val, typeof val)
            let number = Number(val)
            console.log(number, typeof number)
            return Number(val) >= minVal
          },
          replaceLiterals(val){
            return val.replace(/\D/g, '')
          }
      }
    }
</script>

<style scoped>

</style>
