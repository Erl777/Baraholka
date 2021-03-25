<template>
    <form @submit.prevent="submit" class="form">

      <input-custom
        title="Имя"
        v-model.trim="$v.formData.name.$model"
        :class="{ 'invalid': $v.formData.name.$error }"
      />
      <small
        v-if="$v.formData.name.$error"
        class="error-message"
      >
        Введите имя
      </small>

      <input-custom
        type="email"
        title="Почта"
        v-model.trim="$v.formData.email.$model"
        :class="{ 'invalid': $v.formData.email.$error }"
      />
      <small
        v-if="$v.formData.email.$error"
        class="error-message"
      >
        Введите почту корректно
      </small>

      <input-custom
        type="tel"
        title="Телефон"
        :placeholder="'(099) 222-23-32'"
        v-model="$v.formData.phoneNumber.$model"
        :class="{ 'invalid': $v.formData.phoneNumber.$error }"
      />
      <small
        v-if="$v.formData.phoneNumber.$error"
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
<!--      <input-number-->
<!--        title="Возраст"-->
<!--        v-model="formData.age"-->
<!--        @focus="errorAge = false"-->
<!--        :class="{'invalid': errorAge}"-->
<!--      />-->
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
        :value="checkboxesObj"
        @variantsChange="variantsChange"
        @input="errorCheckboxes = false"
      />
      <small
        v-if="errorCheckboxes"
        class="error-message"
      >
        Выберите хоть один из вариантов
      </small>

      <button class="save" type="submit">Сохранить</button>
      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

    </form>
</template>

<script>
    import InputCustom from "./simpleElements/InputCustom";
    import CheckboxCustom from "./simpleElements/CheckboxCustom";
    import RadioCustom from "./simpleElements/RadioCustom";
    import CheckboxesCustom from "@/components/simpleElements/CheckboxesCustom";
    import TextareaBase from "@/components/simpleElements/textareaBase";
    import InputNumber from "@/components/simpleElements/InputNumber";
    import { required, minLength, email, helpers } from 'vuelidate/lib/validators';

    const isValidNumber = helpers.regex('isValidNumber', /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g)

    export default {
        name: "FormCustom",
        components: {TextareaBase, RadioCustom, CheckboxCustom, InputCustom, CheckboxesCustom, InputNumber},
        data(){
            return{
                checkboxesObj: {
                  elem1:{
                    name: 'Апельсин',
                    value: 'Апельсин',
                    checked: false
                  },
                  elem2: {
                    name: 'Мандарин',
                    value: 'Мандарин',
                    checked: true
                  },
                  elem3: {
                    name: 'Банан',
                    value: 'Банан',
                    checked: false
                  }
                },
                formData: {
                    name: '',
                    email: '',
                    phoneNumber: '',
                    // perfectTel: '(099) 222-23-32',
                    age: '5',
                    radio: null,
                    checkbox: false,
                    description: '',
                    variants: {}
                },
                submitStatus: null,
                numberIsValid: true,
                errorAge: false,
                errorTextarea: false,
                errorRadio: false,
                errorCheckboxes: false,
                errorCheckbox: false,
                pattern: /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g
            }
        },
        validations: {
          formData: {
            name: {
              required,
              minLength: minLength(2)
            },
            email: {
              required,
              email
            },
            phoneNumber: {
              required,
              isValidNumber
            }
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
          submit() {
            console.log('submit!')
            this.$v.$touch()
            if (this.$v.$invalid) {
              this.submitStatus = 'ERROR'
            } else {
              // do your submit logic here
              this.submitStatus = 'PENDING'
              setTimeout(() => {
                this.submitStatus = 'OK'
              }, 500)
            }
          },
          variantsChange(obj){
            this.formData.variants = Object.assign({}, obj);
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
  .save{
    display: inline-block;
    width: 100px;
    background-color: cornflowerblue;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
    margin: 0 auto;
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
