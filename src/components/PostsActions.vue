<template>
  <form class="posts-actions">

    <div class="filteringName">

      <input-base
        v-model="filtering.name"
        :name="'search'"
        :placeholder="'Поиск...'"
        :inputKey="'search'"
      />

      <button-base
        class="change-view-btn"
        @click="emitViewType('PostGrid')"
      >
        <svg-grid :active-component="activeComponent" />
      </button-base>

      <button-base
        class="change-view-btn"
        @click="emitViewType('PostLine')"
      >
        <svg-line :active-component="activeComponent" />
      </button-base>

    </div>

    <div class="filtering">

      <label class="rubric">
        Рубрика:
        <select-base
          :name="'rubric'"
          v-model="filtering.rubric"
          :options="{ electronic: 'Электроника', auto: 'Авто', furniture: 'Мебель'}"
          :select-key="'rubric'"

        />
      </label>

      <label class="sorting">
        Сортировка:
        <select-base
          :name="'sortingBy'"
          v-model="filtering.sortingBy"
          :options="{cheap: 'Самые дешевые', expensive: 'Самые дорогие'}"
          :select-key="'sortingBy'"

        />
      </label>

      <label class="price">
        Цена:
        <input-base
          class="minPrice"
          v-model="filtering.minPrice"
          :name="'minPrice'"
          :placeholder="'от'"
          :inputKey="'minPrice'"

        />

        <input-base
          class="maxPrice"
          v-model="filtering.maxPrice"
          :name="'maxPrice'"
          :placeholder="'до'"
          :inputKey="'maxPrice'"

        />
      </label>

      <button type="button" @click="emitFilters" class="btn-find">Найти</button>
      <button type="button" @click="$emit('clearFilters')" class="btn-find orange">Сброс</button>

    </div>

  </form>
</template>

<script>
import InputBase from "./simpleElements/inputBase";
import SvgGrid from "./svg/svgGrid";
import SvgLine from "./svg/svgLine";
import SelectBase from "./simpleElements/selectBase";
import ButtonBase from "./simpleElements/buttonBase";
export default {
  name: 'PostsActions',
    components: {ButtonBase, SelectBase, SvgLine, SvgGrid, InputBase},
    model: {
    prop: 'filtering',
    event: 'input',
  },
  data(){
    return{
        filtering: {
          name: '',
          minPrice: '',
          maxPrice: '',
          rubric: '',
          sortingBy: '',
        },
    }
  },
  props: {
    activeComponent: {
      type: String,
      default: 'PostGrid',
    },
  },
  methods: {
    emitFilters(){
        this.$emit('filtersChanged', this.filtering)
    },
    getPrice(data){
        let {val, key} = data;
        this.emitInput(this.getNumber(val), key);
    },
    /**
     * Получение ключа и данных из компонента
     *
     * @param {object} data
     */
    emitInputValue(data){
        console.log(data)
        this.emitInput(data.val, data.key);
    },
    /**
     * Эмитит типа компонента
     *
     * @param {'PostGrid' | 'PostLine'} type
     */
    emitViewType(type) {
      this.$emit('changeComponent', type);
    },

    /**
     * Эмитит значение поля и ключ объекта формы
     *
     * @param {string | number} value
     * @param {string} key
     */
    emitInput(value, key) {
      // альтернативная запись
      // const newFiltering = Object.assign({}, this.filtering, {[key]: value});

      this.$emit('input', { ...this.filtering, [key]: value });
    },

    /**
     * Проверка является ли строка числом
     *
     * @param {string} value
     * @return {boolean}
     */
    checkIsNumber(value) {
      // альтернативная проверка
      // return Number.isInteger(Number(value));
      return /^[0-9]/.test(value);
    },

    /**
     * Преобразование в число
     *
     * @param {string} value
     * @return {number}
     */
    getNumber(value) {
      return this.checkIsNumber(value) ? Number(value) : 0;
    },
  },
};
</script>

<style scoped lang="scss">
.posts-actions {
  width: 100%;
  min-height: 20px;
  padding: 10px;
}

.filteringName {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 40%;
    margin-right: auto;
  }
}

.filtering {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.change-view {
  width: 20px;
  height: 20px;

  &_active {
    background-color: rgba(100, 149, 237, .5);
  }
}

.change-view-btn {
  max-height: 20px;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }

  &:first-of-type {
    margin-left: 0;
  }
}
  .btn-find{
    background-color: green;
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 4px;
    box-shadow: 0 0 12px rgb(77 77 77 / 75%);
  }
  .orange{
    background-color: darkorange;
  }
</style>
