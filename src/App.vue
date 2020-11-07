<template>
  <div id="app">
    <Header :key="headerKey" />

    <router-view/>

  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
}

p{
  margin: 0;
}

a{
  color: #2c3e50;
  text-decoration: none;
}

button{
  outline: none;
  border: none;
  background-color: unset;
  &:hover{
    cursor: pointer;
  }
}

body{
  padding: 0;
  max-width: 80%;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Header from "@/components/Header";
import {mapGetters} from 'vuex';
  export default {
    name: 'App',
    components:{
      Header
    },
    computed: {
      ...mapGetters({
        headerKey: 'getHeaderKey'
      })
    }
  }
</script>

<!-- фильтер для постов, задать несколько типов пропсов type: any , переделать toInt в .number, регистрация пользователя, избранное,

    переключение компонентов на главной,

    не реализованное ( дата деактивации поста )

    страница товара со счетчиком просмотров готова
    реализовал удаление объявления, страница редактирования !отправка!

    добавление названий изображений в img товара через api, замена изображений на массив, страница редактирования без отправки

    реализовал добавление товара

    добавил кнопки удаления и деактивации поста в компонент PostLine, реализовал деактивацию, фильтрацию активных постов в MyPosts,
    реализовал активации, добавил вывод постов во вкладку архив, обработка отсутствующих постов в MyPosts и Archive

    фикс отображения блоков на главной, начал наполнять AddPost, добавил возможность редактировать в мои посты и отображение кол-ва просмотров

    добавил отображение постов пользователя в личном кабинете, фильтер даты и вывод даты в карточке товара, создал компонент PostList

    принудительная перерисовка шапки

    лоадер, поправил dispatch и commit для токена, фикс разметки товаров, открытие страницы с товаром с главной, заготовка фильтрационного компонента
-->