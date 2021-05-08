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
        v-model="$v.formData.age.$model"
        :class="{ 'invalid': $v.formData.age.$error }"
      />
      <small
        v-if="$v.formData.age.$error"
        class="error-message"
      >
        Введите свой возраст
      </small>

      <checkbox-custom
        v-model="$v.formData.agreeWithTheTerms.$model"
        :label="'Я согласен с условиями'"
      />
      <small
        v-if="$v.formData.agreeWithTheTerms.$error"
        class="error-message"
      >
        Вы не согласились с условиями
      </small>

      <p>Выберите вашу любимую категорию</p>
      <radios-custom
        v-model="radiosObj"
      />
      <small
        v-if="$v.formData.category.$error"
        class="error-message"
      >
        Выберите один из вариантов
      </small>

      <textarea-base
        v-model="$v.formData.description.$model"
        @focus="errorTextarea = false"
      />
      <small
        v-if="$v.formData.description.$error"
        class="error-message"
      >
        Введите описание
      </small>

      <p>Выберите один или более фруктов</p>
      <checkboxes-custom
        :value="checkboxesObj"
        @variantsChange="variantsChange"
      />
      <small
        v-if="$v.formData.fruits.$error"
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
    import RadiosCustom from "./simpleElements/RadiosCustom";
    import CheckboxesCustom from "@/components/simpleElements/CheckboxesCustom";
    import TextareaBase from "@/components/simpleElements/textareaBase";
    import InputNumber from "@/components/simpleElements/InputNumber";
    import { required, minLength, email, helpers, minValue, numeric, sameAs } from 'vuelidate/lib/validators';

    const isValidNumber = helpers.regex('isValidNumber', /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g)

    export default {
        name: "FormCustom",
        components: { TextareaBase, RadiosCustom, CheckboxCustom, InputCustom, CheckboxesCustom, InputNumber},
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
                radiosObj: [
                   {
                    title: 'Авто',
                    value: 'auto',
                    checked: false,
                    name: 'category'
                  },
                   {
                    title: 'Мебель',
                    value: 'furniture',
                    checked: true,
                    name: 'category'
                  },
                   {
                    title: 'Бижутерия',
                    value: 'jewelry',
                    checked: false,
                    name: 'category'
                  }
                ],
                formData: {
                    name: '',
                    email: '',
                    phoneNumber: '',
                    // perfectTel: '(099) 222-23-32',
                    age: '5',
                    radio: null,
                    category: null,
                    agreeWithTheTerms: false,
                    description: '',
                    fruits: []
                },
                submitStatus: null,
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
            },
            age: {
              required,
              minValue: minValue(14),
              numeric
            },
            agreeWithTheTerms: {
              required,
              agree: sameAs(() => true)
            },
            description: {
              required,
              minLength: minLength(10)
            },
            fruits: {
              required
            },
            category: {
              required
            }

          }

        },
        methods: {

          submit() {
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
            let array = [];
            // Object.entries(obj).forEach((elem) => {
            //   if(elem[1].checked) array.push(elem[1].name)
            // });
            for (let key in obj){
                let elem = obj[key];
                if(elem.checked) array.push(elem.name)
            }

            this.formData.fruits = array;
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
  p{
    margin: 10px 0;
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
