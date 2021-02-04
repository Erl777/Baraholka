<template>
    <form @submit.prevent="validation" class="form">

      <input-custom
        title="Имя"
        v-model="formData.name"
      />
      <small class="error-message">Введите имя</small>

      <input-custom
        type="email"
        title="Почта"
        v-model="formData.email"
      />
      <small class="error-message">Введите почту</small>

      <input-custom
        type="tel"
        title="Телефон"
        v-model="formData.tel"
        :class="{'invalid': !validNumber }"
      />
      <small class="error-message">Введите телефон</small>

      <input-custom
        type="number"
        title="Возраст"
        v-model="formData.age"
      />
      <small class="error-message">Введите свой возраст</small>

      <checkbox-custom v-model="formData.checkbox" :label="'Я согласен с условиями'"/>

      <radio-custom
        v-model="formData.radio"
        title="Радио1"
        name="radio"
        inputValue="Радио1"
        id="radio1"
      />

      <radio-custom
        v-model="formData.radio"
        title="Радио2"
        name="radio"
        inputValue="Радио2"
        id="radio2"
      />

      <radio-custom
        v-model="formData.radio"
        title="Радио3"
        name="radio"
        inputValue="Радио3"
        id="radio3"
      />

      <button type="submit">Сохранить</button>

    </form>
</template>

<script>
    import InputCustom from "./simpleElements/InputCustom";
    import CheckboxCustom from "./simpleElements/CheckboxCustom";
    import RadioCustom from "./simpleElements/RadioCustom";
    export default {
        name: "FormCustom",
        components: {RadioCustom, CheckboxCustom, InputCustom},
        data(){
            return{
                formData: {
                    name: '',
                    email: '',
                    tel: '(099) 222-23-32',
                    age: '',
                    radio: null,
                    checkbox: false
                },
                pattern: /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g
            }
        },
        methods: {
            validation(){
                console.log('validation');
            }
        },
        computed: {
            validNumber(){
                return this.pattern.test(this.formData.tel)
            }
        }
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

</style>

<!--Запилите форму, в которой будут :-->
<!--Текстовый инпут, имейл, телефон с маской, -->
<!--числовой инпут (который разрешает вводить только числа, -->
<!--они должны быть 0 или больше, стрелками можно увеличивать -->
<!--и уменьшать значение, и кнопками), кастомные чекбоксы - -->
<!--булево и множественный выбор, кастомная радиокнопка, -->
<!--кастомная текстареа и при клике на кнопку сохранить валидируется это всё дело. -->
<!--Если форма валидна - показывать алерт, если нет - подсвечивать поля с ошибками-->
