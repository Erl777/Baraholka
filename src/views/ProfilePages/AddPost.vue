<template>
  <div>
    <h1>Добавить объявление</h1>

    <form class="form">

      <p class="title">Заголовок</p>
      <input type="text">

      <p class="title">Цена</p>
      <input type="text">

      <p class="title">Рубрика</p>
      <select>
        <option> Одежда </option>
        <option> Электроника </option>
        <option> Мебель </option>
      </select>

      <p class="title">Описание</p>
      <textarea cols="30" rows="10"></textarea>

    </form>

  </div>
</template>

<script>
export default {
  name: "AddPost",
  data(){
    return{
      formData: {

      }
    }
  },

}
</script>

<style scoped>
  .form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .title{
    text-align: left;
    color: #2c3e50;
    font-size: 16px;
  }
  label{
    display: block;
  }
  textarea{
    resize: none;
  }
</style>