<template>
    <form @submit.prevent="validation" class="form">

      <input-custom
        title="Имя"
        v-model="formData.name"
        @focus="errorName = false"
        :class="{'invalid': errorName}"
      />
      <small
        v-if="errorName"
        class="error-message"
      >
        Введите имя
      </small>

      <input-custom
        type="email"
        title="Почта"
        v-model="formData.email"
        @focus="errorEmail = false"
        :class="{'invalid': errorEmail}"
      />
      <small
        v-if="errorEmail"
        class="error-message"
      >
        Введите почту
      </small>

      <input-custom
        type="tel"
        title="Телефон"
        v-model="formData.tel"
        :class="{'invalid': !numberIsValid || errorTel}"
        @change="validNumber"
        @focus="errorTel = false"
      />
      <small
        v-if="errorTel"
        class="error-message"
      >
        Введите телефон
      </small>

      <input-custom
        type="number"
        title="Возраст"
        v-model="formData.age"
        @focus="errorAge = false"
        :class="{'invalid': errorAge}"
      />
      <small
        v-if="errorAge"
        class="error-message"
      >
        Введите свой возраст
      </small>

      <checkbox-custom
        v-model="formData.checkbox"
        :label="'Я согласен с условиями'"
        @click="errorCheckbox = false"
      />
      <small
        v-if="errorCheckbox"
        class="error-message"
      >
        Вы не согласились с условиями
      </small>

      <radio-custom
        v-model="formData.radio"
        title="Радио1"
        name="radio"
        inputValue="Радио1"
        id="radio1"
        @click="errorRadio = false"
      />

      <radio-custom
        v-model="formData.radio"
        title="Радио2"
        name="radio"
        inputValue="Радио2"
        id="radio2"
        @click="errorRadio = false"
      />

      <radio-custom
        v-model="formData.radio"
        title="Радио3"
        name="radio"
        inputValue="Радио3"
        id="radio3"
        @click="errorRadio = false"
      />
      <small
        v-if="errorRadio"
        class="error-message"
      >
        Выберите один из вариантов
      </small>

      <p>Введите что-то в поле ниже</p>
      <textarea-base
        v-model="formData.description"
        @focus="errorTextarea = false"
      />
      <small
        v-if="errorTextarea"
        class="error-message"
      >
        Введите описание
      </small>

      <checkboxes-custom
        v-model="formData.variants"
        :arr="arr"
        @input="errorCheckboxes = false"
      />
      <small
        v-if="errorCheckboxes"
        class="error-message"
      >
        Выберите хоть один из вариантов
      </small>

      <button type="submit">Сохранить</button>

    </form>
</template>

<script>
    import InputCustom from "./simpleElements/InputCustom";
    import CheckboxCustom from "./simpleElements/CheckboxCustom";
    import RadioCustom from "./simpleElements/RadioCustom";
    import CheckboxesCustom from "@/components/simpleElements/CheckboxesCustom";
    import TextareaBase from "@/components/simpleElements/textareaBase";
    export default {
        name: "FormCustom",
        components: {TextareaBase, RadioCustom, CheckboxCustom, InputCustom, CheckboxesCustom},
        data(){
            return{
                arr: ['Апельсин', 'Мандарин', 'Банан'],
                formData: {
                    name: '',
                    email: '',
                    tel: '',
                    // perfectTel: '(099) 222-23-32',
                    age: '5',
                    radio: null,
                    checkbox: false,
                    description: '',
                    variants: []
                },
                numberIsValid: true,
                errorName: false,
                errorEmail: false,
                errorTel: false,
                errorAge: false,
                errorTextarea: false,
                errorRadio: false,
                errorCheckboxes: false,
                errorCheckbox: false,
                pattern: /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g
            }
        },
        methods: {
            validation(){
                let valid = true;
                if(this.formData.name.length === 0) {
                    valid = false;
                    this.errorName = true;
                }
                if(this.formData.email.length === 0) {
                    valid = false;
                    this.errorEmail = true;
                }
                if(this.formData.age.length === 0 && this.numberIsValid) {
                    valid = false;
                    this.errorAge = true;
                }
                if(this.formData.tel.length === 0) {
                    valid = false;
                    this.errorTel = true;
                }
                if (!this.formData.checkbox) this.errorCheckbox = true;
                if(this.formData.radio === null) this.errorRadio = true;
                if(this.formData.description.length === 0) this.errorTextarea = true;
                if(this.formData.variants.length === 0) this.errorCheckboxes = true;
                if(valid) alert('congratulations!!!');
                console.log('validation');
            },
            validNumber(){
                this.numberIsValid = this.pattern.test(this.formData.tel)
            }
        },
    }
</script>

<style lang="scss">
  .form{
    display: flex;
    flex-direction: column;
  }
  .invalid{
    input{
      border: 1px solid red;
    }
  }
  input{
    outline: none;
  }
  .error-message{
    color: red;
  }

</style>

<!--Запилите форму, в которой будут :-->
<!--Текстовый инпут, имейл, телефон с маской, -->
<!--числовой инпут (который разрешает вводить только числа, -->
<!--они должны быть 0 или больше, стрелками можно увеличивать -->
<!--и уменьшать значение, и кнопками), кастомные чекбоксы - -->
<!--булево и множественный выбор, кастомная радиокнопка, -->
<!--кастомная текстареа и при клике на кнопку сохранить валидируется это всё дело. -->
<!--Если форма валидна - показывать алерт, если нет - подсвечивать поля с ошибками-->
