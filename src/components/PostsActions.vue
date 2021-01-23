<template>
  <form class="posts-actions">

    <div class="filteringName">

      <input-base
        :value="filtering.search"
        :name="'search'"
        :placeholder="'Поиск...'"
        :inputKey="'search'"
        @getInputValue = "emitInputValue"
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
          :value="filtering.rubric"
          :options="['Выберите рубрику', 'Электроника', 'Авто']"
          :select-key="'rubric'"
          @getSelectValue = "emitInputValue"
        />
      </label>

      <label class="sorting">
        Сортировка:
        <select-base
          :name="'sortingBy'"
          :value="filtering.sortingBy"
          :options="['Самые дешевые', 'Самые дорогие']"
          :select-key="'sortingBy'"
          @getSelectValue = "emitInputValue"
        />
      </label>

      <label class="price">
        Цена:
        <input-base
          class="minPrice"
          :value="filtering.minPrice"
          :name="'minPrice'"
          :placeholder="'от'"
          :inputKey="'minPrice'"
          @getInputValue = "getPrice"
        />

        <input-base
          class="maxPrice"
          :value="filtering.maxPrice"
          :name="'maxPrice'"
          :placeholder="'до'"
          :inputKey="'maxPrice'"
          @getInputValue = "getPrice"
        />
      </label>

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
  props: {
    filtering: {
      type: Object,
      default: () => ({
        search: '',
        minPrice: 0,
        maxPrice: 0,
        rubric: '',
        sortingBy: '',
      }),
    },
    activeComponent: {
      type: String,
      default: '',
    },
  },
  methods: {
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
</style>
