import Vue from "vue";

const inputOnlyNumber = (component, defaultValue = '', minValue = 0) => {
  return Vue.component('inputNumber', {
    render(createElement) {
      return createElement(component, {
        props: {
          value: this.resultValue,
          type: 'number',
          title: 'Только цифры',
          minValue: minValue
        },
        on: {
          'input': this.minValueFilter
        }
      })
    },
    data(){
      return {
        minValue: minValue,
        resultValue: defaultValue
      }
    },
    methods: {
      minValueFilter(val){
        if(this.checkMinValue(val, minValue)){
          this.resultValue = this.replaceLiterals(val);
        }
        else {
          this.resultValue = minValue
        }
      },
      checkMinValue(val, minVal){
        return Number(val) >= minVal
      },
      replaceLiterals(val){
        return val.replace(/\D/g, '')
      }
    }
  })
}

export default inputOnlyNumber
